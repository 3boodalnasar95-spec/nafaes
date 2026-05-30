import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePdf = async (element: HTMLElement, invoiceNumber: string): Promise<void> => {
  try {
    // Use html2canvas to capture the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/png");

    // Create PDF with proper dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add image to PDF
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add new pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(`invoice-${invoiceNumber}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};