"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // جلب المنتجات لعرضها وإدارتها
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error("فشل في جلب المنتجات");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // إضافة أو تعديل منتج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const method = editingId ? "PUT" : "POST";
    const bodyData = editingId
      ? { id: editingId, name, price: parseFloat(price), description, image }
      : { name, price: parseFloat(price), description, image };

    try {
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        setMessage(editingId ? "تم تعديل المنتج بنجاح! ✏️" : "تم إضافة المنتج بنجاح! 🎉");
        setName("");
        setPrice("");
        setDescription("");
        setImage("");
        setEditingId(null);
        fetchProducts();
      } else {
        setMessage("حدث خطأ، يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      setMessage("فشل الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  // تعبئة البيانات للتعديل
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description || "");
    setImage(product.image || "");
  };

  // حذف منتج
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMessage("تم حذف المنتج بنجاح 🗑️");
        fetchProducts();
      } else {
        setMessage("فشل في حذف المنتج.");
      }
    } catch (err) {
      setMessage("حدث خطأ أثناء الحذف.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px", fontFamily: "sans-serif" }} dir="rtl">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>لوحة تحكم Nitro Games</h1>
      
      {/* نموذج الإضافة أو التعديل */}
      <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
        <h2>{editingId ? "تعديل منتج" : "إضافة منتج جديد"}</h2>
        <div>
          <label>اسم المنتج:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
        </div>
        <div>
          <label>السعر:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
        </div>
        <div>
          <label>الوصف:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
        </div>
        <div>
          <label>رابط الصورة (Image URL):</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={loading} style={{ padding: "10px 20px", background: editingId ? "#f59e0b" : "#0070f3", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" }}>
            {loading ? "جاري الحفظ..." : editingId ? "تحديث المنتج" : "إضافة المنتج"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setName(""); setPrice(""); setDescription(""); setImage(""); }} style={{ padding: "10px 20px", background: "#6b7280", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" }}>
              إلغاء التعديل
            </button>
          )}
        </div>
      </form>

      {message && <p style={{ fontWeight: "bold", textAlign: "center", color: "#10b981" }}>{message}</p>}

      {/* قائمة المنتجات الحالية */}
      <h2>قائمة المنتجات الحالية</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", background: "#fff" }}>
            <div>
              <strong style={{ fontSize: "16px" }}>{p.name}</strong> - <span style={{ color: "#059669" }}>{p.price} $</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleEdit(p)} style={{ padding: "6px 12px", background: "#3b82f6", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" }}>تعديل</button>
              <button onClick={() => handleDelete(p.id)} style={{ padding: "6px 12px", background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" }}>حذف</button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p style={{ color: "#6b7280" }}>لا توجد منتجات مضافة حتى الآن.</p>}
      </div>
    </div>
  );
}
