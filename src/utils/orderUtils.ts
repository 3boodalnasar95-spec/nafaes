// Generate unique order number
export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `NAF-${year}${month}${day}-${hours}${minutes}-${random}`;
}

// Generate invoice number
export function generateInvoiceNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `INV-${year}${month}-${random}`;
}

// Get current date formatted for Kuwait
export function getFormattedDate(): string {
  return new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format price for display
export function formatPrice(price: number): string {
  return `${price.toFixed(3)} د.ك`;
}