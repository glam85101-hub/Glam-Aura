import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { image_b64, note } = await req.json();
    if (!image_b64) {
      return new Response(JSON.stringify({ error: 'Image required' }), { status: 400 });
    }

    const system = `You are a fashion stylist. Analyze the outfit in the input image.
- Rate from 0-100.
- Return JSON only with keys: verdict (short text only), summary, strengths[], fixes[], colorPalette[{name,hex}], score (number only), suggestedPieces[].
- Palette must be limited to tasteful shades in white/green/blue families.`;


    const userNote = note ? `Context: ${note}` : '';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          {
            role: 'user',
            content: [
              { type: 'text', text: userNote },
              {
                type: 'image_url',
                image_url: { url: `data:image/jpeg;base64,${image_b64}` }, // ✅ FIXED
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      return new Response(JSON.stringify({ error: t }), { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const analysis = JSON.parse(content || '{}');

    return new Response(JSON.stringify({ analysis }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Server error' }), { status: 500 });
  }
}
