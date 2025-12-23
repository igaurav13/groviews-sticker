"use client";

import { useCanvasStore } from "@/app/store/canvasStore";
import { useState } from "react";
import { InvoiceData } from "@/types/types";
import { sampleInvoice } from "./sampleInvoice";
import InvoicePreview from "@/components/invoice/InvoicePreview";

export default function SummaryPage() {
  const { elements, backgroundColor } = useCanvasStore(
    (s) => s.present
  );

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<"S" | "M" | "L">("M");
  const [error, setError] = useState("");
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);


  const handleAddToCart = () => {
    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    setError("");

    const order = {
      elements,
      backgroundColor,
      quantity,
      size,
    };

    localStorage.setItem("sticker-cart", JSON.stringify(order));
    alert("Design added to cart");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Design Summary
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Review your sticker design before adding to cart
          </p>
        </div>

        {/* DESIGN INFO */}
        <div
          className="rounded-lg p-5 border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          <h2 className="font-medium mb-3 text-white">
            Design Details
          </h2>
          <p className="text-sm text-gray-300">
            Elements added: {elements.length}
          </p>
          <p className="text-sm text-gray-300">
            Background color: {backgroundColor}
          </p>
        </div>

        {/* SIZE */}
        <div
          className="rounded-lg p-5 border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          <h2 className="font-medium mb-3 text-white">
            Sticker Size
          </h2>
          <div className="flex gap-3">
            {(["S", "M", "L"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-5 py-2 rounded border text-sm transition ${
                  size === s
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-transparent text-gray-300 border-(--border) hover:bg-(--hover)"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* QUANTITY */}
        <div
          className="rounded-lg p-5 border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border)",
          }}
        >
          <h2 className="font-medium mb-3 text-white">
            Quantity
          </h2>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-32 px-3 py-2 rounded bg-transparent border text-sm text-white outline-none"
            style={{ borderColor: "var(--border)" }}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {/* ACTION */}
        <button
          onClick={handleAddToCart}
          className="px-8 py-3 rounded font-medium transition"
          style={{
            background: "var(--primary)",
            color: "#fff",
          }}
        >
          Add to Cart
        </button>

        {/* -----------------------------
   INVOICE TESTING (NON-BREAKING)
------------------------------ */}
<div className="mt-16 border-t pt-10 border-[var(--border)]">
  <h2 className="text-xl font-semibold text-white mb-2">
    Invoice Testing (Demo)
  </h2>
  <p className="text-sm text-gray-400 mb-4">
    This section is for testing invoice generation & PDF export.
  </p>

  <button
    onClick={() => setInvoice(sampleInvoice)}
    className="px-6 py-2 rounded mb-6"
    style={{ background: "var(--primary)", color: "#fff" }}
  >
    Load Sample Invoice
  </button>

  {invoice && (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Preview */}
      <InvoicePreview invoice={invoice} />

      {/* Debug / Reviewer View */}
      <div
        className="rounded-lg p-4 border text-xs overflow-auto max-h-[420px]"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--border)",
        }}
      >
        <pre>{JSON.stringify(invoice, null, 2)}</pre>
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
}
