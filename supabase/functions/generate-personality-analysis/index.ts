import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { personalityType, answers } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert IT career counselor and personality analyst. Generate warm, encouraging, and highly personalized personality analyses for IT professionals based on their quiz results. Your analysis should be insightful, actionable, and motivating.`;

    const userPrompt = `Based on this IT personality quiz result, generate a comprehensive, personalized analysis:

Personality Type: ${personalityType}
Quiz Responses: ${JSON.stringify(answers)}

Please provide a detailed analysis with the following sections:

1. **Introduction (2-3 paragraphs)**: 
   - A warm, engaging opening that resonates with this personality type
   - Explain what makes this personality unique in the IT world
   - Highlight their natural approach to technology and problem-solving

2. **Core Strengths (5-6 bullet points)**:
   - List specific technical and soft skills they excel at
   - Be concrete and actionable
   - Include both technical abilities and interpersonal strengths

3. **Ideal Career Paths (3-4 options)**:
   - Suggest specific job roles that align perfectly with their personality
   - Explain why each role would be a great fit
   - Include both traditional and emerging career options

4. **Learning & Growth Recommendations**:
   - Suggest 3-4 specific technologies, frameworks, or skills to learn
   - Recommend learning resources (courses, books, communities)
   - Provide actionable next steps for career development

5. **Team Dynamics**:
   - Explain how they work best in teams
   - Suggest complementary personality types for collaboration
   - Highlight their unique value proposition in team settings

6. **Motivational Closing**:
   - End with an inspiring, personalized message
   - Remind them of their potential impact in the tech industry

Format your response as JSON with these keys: introduction, strengths (array), careerPaths (array of objects with 'title' and 'description'), learningRecommendations (array of objects with 'category' and 'items'), teamDynamics, closing.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Try to parse JSON response
    let analysis;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      analysis = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // Fallback: return the raw content
      analysis = { rawContent: content };
    }

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in generate-personality-analysis:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});