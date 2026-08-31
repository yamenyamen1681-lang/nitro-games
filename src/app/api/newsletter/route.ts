import { NextResponse } from "next/server";
import { db } from "@/db";
import { ensureDbReady } from "@/db/schema";
import { newsletter } from "@/db/schema";

export async function POST(request: Request) {
  try {
    await ensureDbReady();
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "يرجى إدخال بريد إلكتروني صحيح" },
        { status: 400 }
      );
    }

    const discountCode = "NITRO10";

    try {
      await db.insert(newsletter).values({
        email: email.trim().toLowerCase(),
        discountCode,
      }).onConflictDoNothing();
    } catch (e) {
      console.warn("Newsletter DB insert warning:", e);
    }

    return NextResponse.json({
      success: true,
      code: discountCode,
      discountPercent: 10,
      message: "تم اشتراكك بنجاح! استخدم كود الخصم NITRO10 للحصول على خصم 10% فوراً.",
    });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({
      success: true,
      code: "NITRO10",
      discountPercent: 10,
      message: "أهلاً بك في مجتمع NITRO GAMES! كود الخصم هو NITRO10",
    });
  }
}
