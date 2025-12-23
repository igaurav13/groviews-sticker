import { InvoiceData } from "@/types/types";

export const sampleInvoice: InvoiceData = {
  invoiceNumber: "INV-TEST-001",
  date: "2025-01-01",
  dueDate: "2025-01-10",

  billTo: {
    name: "John Doe",
    email: "john@example.com",
    address: "123 Business Street, NY",
  },

  items: [
    {
      id: "1",
      description: "UI Design",
      quantity: 2,
      unitPrice: 1500,
    },
    {
      id: "2",
      description: "Frontend Development",
      quantity: 5,
      unitPrice: 2000,
    },
  ],

  taxRate: 18,
  notes: "Thank you for your business",
  template: "classic",
};
