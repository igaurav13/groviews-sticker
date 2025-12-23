import { InvoiceItem } from "@/types/types";

export function calculateSubtotal(items: InvoiceItem[]) {
  return items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
}

export function calculateTax(subtotal: number, taxRate: number) {
  return (subtotal * taxRate) / 100;
}

export function calculateTotal(subtotal: number, tax: number) {
  return subtotal + tax;
}
