import { cookies } from "next/headers";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const language = searchParams.get("language") ?? "uz";

        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        const headers = { Accept: "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const url = new URL(`${process.env.BASE_URL}/api/Product`);
        url.searchParams.set("language", language);

        const res = await fetch(url.toString(), {
            method: "GET",
            headers,
            next: { revalidate: 600, tags: ["products"] },
        });

        if (!res.ok) {
            return Response.json(
                { error: true, message: `Backend error: ${res.status}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return Response.json(data, { status: 200 });
    } catch (err) {
        console.error("Admin fetch error:", err);
        return Response.json({ error: true, message: err.message }, { status: 500 });
    }
}