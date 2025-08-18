import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token")?.value;

        const res = await fetch(`${process.env.BASE_URL}/api/Admin/getAdmins`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
            next: {
                revalidate: 600,
                tags: ["admins"],
            },
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