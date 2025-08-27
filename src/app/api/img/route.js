export async function GET(req) {
    const url = new URL(req.url);
    const src = url.searchParams.get('src');
    if (!src) return new Response('Missing src', { status: 400 });

    // Заблокируй явные http вне своего бэка, если нужно
    // if (!src.startsWith('http://45.138.158.239:4142')) return new Response('Forbidden', { status: 403 });

    const r = await fetch(src, { cache: 'no-store' }); // или 'force-cache'
    if (!r.ok) return new Response('Failed to fetch', { status: 502 });

    const headers = new Headers(r.headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return new Response(r.body, { status: 200, headers });
};