import axios from "axios";
import FormData from "form-data";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const inForm = await req.formData();

    const Price = inForm.get("Price");
    const ColorAll = inForm.getAll("Color");
    const SizeAll = inForm.getAll("Size");
    const Category = inForm.get("Category");
    const Industry = inForm.get("Industry");
    const Gender = inForm.get("Gender");
    const Discount = inForm.get("Discount");
    const NewPrice = inForm.get("NewPrice");
    const TranslationsJson = inForm.get("TranslationsJson");

    const toNum = (v) => {
      if (v === null || v === undefined || v === "") return undefined;
      const n = Number(String(v).replace(/\s/g, ""));
      return Number.isFinite(n) ? n : undefined;
    };
    const normList = (arr) => {
      const vals = (arr ?? []).filter(Boolean).map(String);
      if (vals.length > 1) return JSON.stringify(vals);
      if (vals.length === 1) return vals[0];
      return "";
    };

    const outForm = new FormData();

    const q = new URLSearchParams();
    const priceNum = toNum(Price);
    if (priceNum === undefined) return badReq("Price is required/invalid");
    q.set("Price", String(priceNum));

    const colorVal = normList(ColorAll);
    if (!colorVal) return badReq("Color is required");
    q.set("Color", colorVal);

    const sizeVal = normList(SizeAll);
    if (!sizeVal) return badReq("Size is required");
    q.set("Size", sizeVal);

    if (!Category) return badReq("Category is required");
    q.set("Category", String(Category));

    if (Industry) q.set("Industry", String(Industry));
    q.set("Gender", String(Gender || "none"));

    const discountBool = String(Discount).toLowerCase() === "true";
    q.set("Discount", String(discountBool));
    const newPriceNum = toNum(NewPrice);
    if (discountBool && newPriceNum === undefined) return badReq("NewPrice is required when Discount=true");
    q.set("NewPrice", String(discountBool ? (newPriceNum ?? 0) : 0));

    if (!TranslationsJson) return badReq("TranslationsJson is required");
    q.set("TranslationsJson", String(TranslationsJson));

    outForm.append("Price", String(priceNum));
    outForm.append("Color", colorVal);
    outForm.append("Size", sizeVal);
    outForm.append("Category", String(Category));
    if (Industry) outForm.append("Industry", String(Industry));
    outForm.append("Gender", String(Gender || "men"));
    outForm.append("Discount", String(discountBool));
    outForm.append("NewPrice", String(discountBool ? (newPriceNum ?? 0) : 0));
    outForm.append("TranslationsJson", String(TranslationsJson));

    const files = inForm.getAll("ImageLinks") || [];
    for (const f of files) {
      if (!f) continue;
      const buf = Buffer.from(await f.arrayBuffer());
      outForm.append("ImageLinks", buf, {
        filename: f.name || "file",
        contentType: f.type || "application/octet-stream",
      });
    }

    const hdrAuth = req.headers.get("authorization");
    const cookieToken = cookies().get("token")?.value;
    const Authorization = hdrAuth || (cookieToken ? `Bearer ${cookieToken}` : undefined);

    const url = `${process.env.BASE_URL}/api/Product`;
    const upstream = await axios.post(url, outForm, {
      headers: {
        ...(Authorization ? { Authorization } : {}),
        ...outForm.getHeaders(),
        Accept: "*/*",
      },
      maxBodyLength: Infinity,
      validateStatus: () => true,
    });

    if (upstream.status >= 400) {
      return new Response(JSON.stringify({ upstreamStatus: upstream.status, upstreamBody: upstream.data }), {
        status: upstream.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    revalidateTag("products");

    return new Response(JSON.stringify(upstream.data ?? { ok: true }), {
      status: upstream.status || 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    const status = err?.response?.status || 500;
    const body = err?.response?.data || err?.message || "Unknown error";
    return new Response(JSON.stringify({ error: true, message: body }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function badReq(message) {
  return new Response(JSON.stringify({ error: true, message }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
};