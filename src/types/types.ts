export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  image?: string;
};

export type InvoiceData = {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  billTo: {
    name: string;
    email: string;
    address: string;
  };

  items: InvoiceItem[];

  taxRate: number;
  notes: string;
};
