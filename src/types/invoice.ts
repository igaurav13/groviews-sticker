export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  image?: string;
};

export type InvoiceData = {
  invoiceNumber: string;

  // ✅ ADD THESE (they do not affect existing code)
  date: string;
  dueDate: string;

  billTo: {
    name: string;
    email: string;
    address: string;
  };

  items: InvoiceItem[];
  taxRate: number;
  notes: string;
  template: "classic" | "modern";
};
