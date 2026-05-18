import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY not configured. Add it to your environment variables.' },
      { status: 503 }
    );
  }

  const { title, tech, category } = await req.json();

  if (!title) {
    return NextResponse.json({ error: 'Project title is required.' }, { status: 400 });
  }

  const prompt = `You are a professional portfolio writer. Write a concise, compelling project description for a developer's portfolio website.

Project: ${title}
Category: ${category || 'Web Development'}
Tech Stack: ${Array.isArray(tech) ? tech.join(', ') : tech || 'Not specified'}

Requirements:
- 2-3 sentences maximum
- Mention what the project does and the key problem it solves
- Sound professional but approachable
- Do NOT use bullet points or markdown formatting
- Return only the description text, nothing else`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
        }),
      }
    );

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) throw new Error('No content generated from Gemini.');

    return NextResponse.json({ description: text });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
