"use client";
import { useState } from "react";
import { InvoiceData } from "@/types/types";
import { generateInvoiceNumber } from "./utils/generateInvoiceNumber";
import InvoiceForm from "./InvoiceForm";
import InvoicePreview from "./InvoicePreview";

export default function InvoiceBuilder() {
  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: "",
    billTo: {
      name: "",
      email: "",
      address: "",
    },
    items: [],
    taxRate: 18,
    notes: "",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InvoiceForm invoice={invoice} setInvoice={setInvoice} />
      <InvoicePreview invoice={invoice} />
    </div>
  );
}
