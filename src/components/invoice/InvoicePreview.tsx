"use client";

import { InvoiceData } from "../../types/types";
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "./utils/calculations";

type Props = {
  invoice: InvoiceData;
};

export default function InvoicePreview({ invoice }: Props) {
  const subtotal = calculateSubtotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const total = calculateTotal(subtotal, tax);

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">Invoice</h2>
          <p className="text-sm text-gray-400">
            #{invoice.invoiceNumber}
          </p>
        </div>

        <div className="text-sm text-gray-400 text-right">
          <p>Date: {invoice.invoiceDate}</p>
          {invoice.dueDate && <p>Due: {invoice.dueDate}</p>}
        </div>
      </div>

      {/* Bill To */}
      <div className="border-t border-[var(--border)] pt-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">
          Bill To
        </h3>
        <p>{invoice.billTo.name || "—"}</p>
        <p className="text-sm text-gray-400">
          {invoice.billTo.email || "—"}
        </p>
        <p className="text-sm text-gray-400 whitespace-pre-line">
          {invoice.billTo.address || "—"}
        </p>
      </div>

      {/* Items Table */}
      <div className="border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-12 text-sm text-gray-400 mb-2">
          <span className="col-span-6">Description</span>
          <span className="col-span-2 text-right">Qty</span>
          <span className="col-span-2 text-right">Price</span>
          <span className="col-span-2 text-right">Total</span>
        </div>

        {invoice.items.length === 0 && (
          <p className="text-sm text-gray-500 italic">
            No items added
          </p>
        )}

        {invoice.items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 text-sm py-2 border-t border-[var(--border)]"
          >
            <span className="col-span-6">
              {item.description || "—"}
            </span>
            <span className="col-span-2 text-right">
              {item.quantity}
            </span>
            <span className="col-span-2 text-right">
              ₹{item.unitPrice.toFixed(2)}
            </span>
            <span className="col-span-2 text-right">
              ₹{(item.quantity * item.unitPrice).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-[var(--border)] pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax ({invoice.taxRate}%)</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="border-t border-[var(--border)] pt-4">
          <h3 className="text-sm font-medium text-gray-300 mb-1">
            Notes
          </h3>
          <p className="text-sm text-gray-400 whitespace-pre-line">
            {invoice.notes}
          </p>
        </div>
      )}
    </div>
  );
}
