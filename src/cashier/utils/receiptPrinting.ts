import { CartItem, Discount } from "../types/pos.types";

interface PrintReceiptProps {
  cart: CartItem[];
  subtotal: number;
  discount: Discount | null;
  total: number;
  customerCash: string;
  change: number;
}

const calculateDiscount = (discount: Discount | null, subtotal: number) => {
  if (!discount) return 0;
  return discount.type === "percentage"
    ? subtotal * (discount.value / 100)
    : discount.value;
};

export const printReceipt = ({
  cart,
  subtotal,
  discount,
  total,
  customerCash,
  change,
}: PrintReceiptProps) => {
  const receiptContent = `
    فاتورة المبيعات
    ${new Date().toLocaleString("ar-SA")}
    ------------------------
    ${cart
      .map(
        (item) => `
      ${item.arabicName}
      ${
        item.priceType === "weight"
          ? `${item.weight} ${item.unit} x ${item.price} = ${(
              item.price * (item.weight || 0)
            ).toFixed(2)}`
          : `${item.quantity} x ${item.price} = ${(
              item.price * item.quantity
            ).toFixed(2)}`
      } دج
    `
      )
      .join("\n")}
    ------------------------
    المجموع: ${subtotal} دج
    الخصم: ${calculateDiscount(discount, subtotal)} دج
    الإجمالي: ${total} دج
    المدفوع: ${customerCash} دج
    الباقي: ${change} دج
  `;

  const printWindow = window.open("", "", "width=600,height=600");
  printWindow?.document.write(`
    <html dir="rtl">
      <head><title>إيصال</title></head>
      <body style="font-family: 'Cairo', sans-serif; white-space: pre-wrap;">
        ${receiptContent}
      </body>
    </html>
  `);
  printWindow?.print();
  printWindow?.close();
};
