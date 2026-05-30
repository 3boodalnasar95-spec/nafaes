export const generateInvoiceNumber = (): string => {
  // Generate a unique invoice number using timestamp and random component
  const timestamp = Date.now().toString(36).slice(-4);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV-${timestamp}-${random}`;
};