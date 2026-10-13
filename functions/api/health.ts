export async function onRequestGet(context: any) {
  const env = context.env || {};
  const hasGeminiKey = Boolean(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY);

  return new Response(
    JSON.stringify({
      status: 'ok',
      hasGeminiKey,
      model: 'gemini-3.8-flash',
      service: 'Soleman Cirebon Cloudflare Pages Edge Engine',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
