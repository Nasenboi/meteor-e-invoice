import jsPDF from "jspdf";

const fonts = {
    title: {name: "Times", style: "Bold", size: 18},
    subtitle: {name: "Times", style: "Italic", size: 14},
    normal: {name: "Times", style: undefined, size: 12},    
    small: {name: "Times", style: undefined, size: 8}
};

const line_heights = {
    big: 20,
    normal: 10,
    small: 5
};

const paddings = {
    top: 20,
    left: 20
};

export function createPdf(invoiceData, path) {
  const doc = new jsPDF();

  // Set up the writer positions
  const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  var writerY = paddings.top;
  var writerX = paddings.left;

  // Add title
  doc.setFontSize(fonts.title.size);
  doc.setFont(fonts.title.name, fonts.title.style);
  doc.text("E-Invoice", (pageWidth-doc.getTextWidth("E-Invoice"))/2, writerY);
  writerY += line_heights.big;

  // Add invoice details
  doc.setFontSize(fonts.small.size);
  doc.setFont(fonts.small.name, fonts.small.style);
  
  doc.text(`Invoice ID: ${invoiceData.ID}`, writerX, writerY);
  writerY += line_heights.small;
  doc.text(`Issue Date: ${invoiceData.issue_date}`, writerX, writerY);
  writerY += line_heights.small;
  if (invoiceData.due_date) {
    doc.text(`Due Date: ${invoiceData.due_date}`, writerX, writerY);
    writerY += line_heights.small;
  }
  doc.text(`Invoice Type Code: ${invoiceData.invoice_type_code}`, writerX, writerY);
  writerY += line_heights.small;
  doc.text(`Currency: ${invoiceData.document_currency_code}`, writerX, writerY);
  writerY += line_heights.small;
  if (invoiceData.buyer_reference) {
    doc.text(`Buyer Reference: ${invoiceData.buyer_reference}`, writerX, writerY);
    writerY += line_heights.small;
  }
  if (invoiceData.note) {
    doc.text(`Note: ${invoiceData.note}`, writerX, writerY);
    writerY += line_heights.small;
  }

  writerY += line_heights.normal;
  var writerYBuff = writerY;

  // Add supplier details
  doc.setFontSize(fonts.normal.size);
  doc.setFont(fonts.normal.name, fonts.normal.style);
  const supplier = invoiceData.accounting_supplier_party?.party;
  if (supplier) {
    doc.text("Supplier:", writerX, writerY);
    writerY += line_heights.normal;
    doc.text(`  Name: ${supplier.party_name?.name || ""}`, writerX, writerY);
    writerY += line_heights.normal;
    doc.text(`  ID: ${supplier.endpoint_id || ""}`, writerX, writerY);
    writerY += line_heights.normal;
    if (supplier.postal_address) {
      doc.text(`  Address: ${supplier.postal_address.street_name || ""}, ${supplier.postal_address.city_name || ""}`, writerX, writerY);
      writerY += line_heights.normal;
    }
  }
  writerY = writerYBuff;
  writerX = pageWidth / 2;

  // Add customer details
  const customer = invoiceData.accounting_customer_party?.party;
  if (customer) {
    doc.text("Customer:", writerX, writerY);
    writerY += line_heights.normal;
    doc.text(`  Name: ${customer.party_name?.name || ""}`, writerX, writerY);
    writerY += line_heights.normal;
    doc.text(`  ID: ${customer.endpoint_id || ""}`, writerX, writerY);
    writerY += line_heights.normal;
    if (customer.postal_address) {
      doc.text(`  Address: ${customer.postal_address.street_name || ""}, ${customer.postal_address.city_name || ""}`, writerX, writerY);
      writerY += line_heights.normal;
    }
  }

  writerY += line_heights.normal;
  writerX = paddings.left;
  // Add invoice lines

  doc.text("Invoice Lines:", writerX, writerY);
  writerY += line_heights.normal;
  invoiceData.invoice_line.forEach((line, index) => {
    doc.text(`  Line ${index + 1}:`, writerX, writerY + index * 10);
    writerY += line_heights.normal;
    doc.text(`    Description: ${line.item?.description || ""}`, writerX, writerY + index * 10);
    writerY += line_heights.normal;
    doc.text(`    Quantity: ${line.invoice_line_quantity}`, writerX, writerY + index * 10);
    writerY += line_heights.normal;
    doc.text(`    Price: ${line.price?.price_amount || 0}`, writerX, writerY + index * 10);
    writerY += line_heights.normal;
    doc.text(`    Total: ${line.line_extension_amount}`, writerX, writerY + index * 10);
    writerY += line_heights.normal;
  });

  // Add XMP metadata
  const xmpMetadata = `
    <rdf:Description rdf:about="" xmlns:zf="urn:ferd:pdfa:invoice:rc#">
      <zf:DocumentType>INVOICE</zf:DocumentType>
      <zf:DocumentFileName>ZUGFeRD-invoice.xml</zf:DocumentFileName>
      <zf:Version>1.0</zf:Version>
      <zf:ConformanceLevel>BASIC</zf:ConformanceLevel>
    </rdf:Description>`;

  doc.addMetadata(xmpMetadata);
  
  // Save the PDF
  doc.save(path);
}
