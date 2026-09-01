import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

// 1. جلب جميع المنتجات
export async function GET() {
  try {
    const allProducts = await db.select().from(products);
    return NextResponse.json(allProducts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// 2. إضافة منتج جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, description, image } = body;

    await db.insert(products).values({
      name,
      price,
      description,
      image,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

// 3. تعديل منتج موجود
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, price, description, image } = body;

    await db.update(products)
      .set({ name, price, description, image })
      .where(eq(products.id, id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// 4. حذف منتج
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await db.delete(products).where(eq(products.id, Number(id)));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
