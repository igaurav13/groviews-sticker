import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { InvoiceData } from "@/types/types";
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "../utils/calculations";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 4,
  },
  section: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 6,
  },
  colDesc: { width: "40%" },
  colQty: { width: "15%", textAlign: "right" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "25%", textAlign: "right" },
  totals: {
    marginTop: 12,
    alignItems: "flex-end",
  },
});

type Props = {
  invoice: InvoiceData;
};

export default function InvoicePDF({ invoice }: Props) {
  const subtotal = calculateSubtotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const total = calculateTotal(subtotal, tax);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
          <Text>Invoice #: {invoice.invoiceNumber}</Text>
          <Text>Date: {invoice.invoiceDate}</Text>
          {invoice.dueDate && <Text>Due: {invoice.dueDate}</Text>}
        </View>

        {/* Bill To */}
        <View style={styles.section}>
          <Text>Bill To:</Text>
          <Text>{invoice.billTo.name}</Text>
          <Text>{invoice.billTo.email}</Text>
          <Text>{invoice.billTo.address}</Text>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Price</Text>
            <Text style={styles.colTotal}>Total</Text>
          </View>

          {invoice.items.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>
                ₹{item.unitPrice.toFixed(2)}
              </Text>
              <Text style={styles.colTotal}>
                ₹{(item.quantity * item.unitPrice).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <Text>Subtotal: ₹{subtotal.toFixed(2)}</Text>
          <Text>Tax ({invoice.taxRate}%): ₹{tax.toFixed(2)}</Text>
          <Text>Total: ₹{total.toFixed(2)}</Text>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.section}>
            <Text>Notes:</Text>
            <Text>{invoice.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
