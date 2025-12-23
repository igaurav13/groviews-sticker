"use client";

import { Dispatch, SetStateAction } from "react";
import { InvoiceData, InvoiceItem } from "@/types/types";
import { v4 as uuid } from "uuid";

type Props = {
  invoice: InvoiceData;
  setInvoice: Dispatch<SetStateAction<InvoiceData>>;
};

export default function InvoiceForm({ invoice, setInvoice }: Props) {
  /* -----------------------------
     Bill To Helpers
  ------------------------------*/
  const updateBillTo = (field: string, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      billTo: {
        ...prev.billTo,
        [field]: value,
      },
    }));
  };

  /* -----------------------------
     Item Helpers
  ------------------------------*/
  const updateItem = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: uuid(),
          description: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    }));
  };

  const removeItem = (id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  /* -----------------------------
     Render
  ------------------------------*/
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 space-y-6">
      <h2 className="text-lg font-semibold">Invoice Details</h2>

      {/* Bill To Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-300">Bill To</h3>

        <input
          placeholder="Client Name"
          className="w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border)]"
          value={invoice.billTo.name}
          onChange={(e) => updateBillTo("name", e.target.value)}
        />

        <input
          placeholder="Client Email"
          className="w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border)]"
          value={invoice.billTo.email}
          onChange={(e) => updateBillTo("email", e.target.value)}
        />

        <textarea
          placeholder="Billing Address"
          rows={3}
          className="w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border)]"
          value={invoice.billTo.address}
          onChange={(e) => updateBillTo("address", e.target.value)}
        />
      </div>

      {/* Items Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-300">Items</h3>

        {invoice.items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 items-center"
          >
            <input
              className="col-span-6 px-3 py-2 rounded-md bg-transparent border border-[var(--border)]"
              placeholder="Item description"
              value={item.description}
              onChange={(e) =>
                updateItem(item.id, "description", e.target.value)
              }
            />

            <input
              type="number"
              min={1}
              className="col-span-2 px-3 py-2 rounded-md bg-transparent border border-[var(--border)]"
              value={item.quantity}
              onChange={(e) =>
                updateItem(item.id, "quantity", Number(e.target.value))
              }
            />

            <input
              type="number"
              min={0}
              className="col-span-3 px-3 py-2 rounded-md bg-transparent border border-[var(--border)]"
              value={item.unitPrice}
              onChange={(e) =>
                updateItem(item.id, "unitPrice", Number(e.target.value))
              }
            />

            <button
              onClick={() => removeItem(item.id)}
              className="col-span-1 text-red-400 hover:text-red-500"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addItem}
          className="text-sm text-[var(--primary)] hover:underline"
        >
          + Add Item
        </button>
      </div>

      {/* Tax & Notes */}
      <div className="space-y-3">
        <input
          type="number"
          className="w-32 px-3 py-2 rounded-md bg-transparent border border-[var(--border)]"
          placeholder="Tax %"
          value={invoice.taxRate}
          onChange={(e) =>
            setInvoice((prev) => ({
              ...prev,
              taxRate: Number(e.target.value),
            }))
          }
        />

        <textarea
          placeholder="Notes / Terms & Conditions"
          rows={3}
          className="w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border)]"
          value={invoice.notes}
          onChange={(e) =>
            setInvoice((prev) => ({
              ...prev,
              notes: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
}
