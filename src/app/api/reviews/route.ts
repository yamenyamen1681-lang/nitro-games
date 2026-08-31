import { NextResponse } from "next/server";
import { db } from "@/db";
import { ensureDbReady } from "@/db/schema";
import { reviews } from "@/db/schema";
import { INITIAL_REVIEWS } from "@/lib/data";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    await ensureDbReady();
    let dbReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt));

    if (!dbReviews || dbReviews.length === 0) {
      try {
        for (const rev of INITIAL_REVIEWS) {
          await db.insert(reviews).values({
            author: rev.author,
            city: rev.city,
            rating: rev.rating,
            comment: rev.comment,
            verifiedPurchase: rev.verifiedPurchase,
            itemBought: rev.itemBought,
          });
        }
        dbReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
      } catch (e) {
        console.warn("Reviews seed warning:", e);
      }
    }

    const formatted = (dbReviews && dbReviews.length > 0)
      ? dbReviews.map((r) => ({
          id: r.id,
          author: r.author,
          city: r.city,
          rating: r.rating,
          comment: r.comment,
          verifiedPurchase: r.verifiedPurchase,
          itemBought: r.itemBought || "منتج معتمد من نيترو",
          date: "مؤخراً",
        }))
      : INITIAL_REVIEWS;

    return NextResponse.json({ success: true, reviews: formatted });
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json({ success: true, reviews: INITIAL_REVIEWS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, city, rating, comment, itemBought } = body;

    if (!author || !city || !comment) {
      return NextResponse.json(
        { success: false, message: "يرجى تعبئة الاسم والمدينة والتقييم" },
        { status: 400 }
      );
    }

    const [newReview] = await db
      .insert(reviews)
      .values({
        author: author.trim(),
        city: city.trim(),
        rating: Number(rating) || 5,
        comment: comment.trim(),
        verifiedPurchase: true,
        itemBought: itemBought || "مشتري موثق",
      })
      .returning();

    return NextResponse.json({
      success: true,
      review: newReview,
      message: "شكراً لتقييمك! تم نشر رأيك في مجتمع NITRO GAMES.",
    });
  } catch (error) {
    console.error("Reviews POST error:", error);
    return NextResponse.json(
      { success: false, message: "تعذر حفظ التقييم حالياً" },
      { status: 500 }
    );
  }
}
