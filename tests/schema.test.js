import {EInvoiceSchema} from "../src/e-invoice-schema";
import {eInvoiceToXml, einvoiceToZugferd} from "../src/api";
import fs from "fs";

// Invoices
import exampleInvoice01 from "./test-objects/example-invoice-01.json";

const test_invoices = [
  {
    id: "01",
    data: exampleInvoice01,
    xml_path: "./tests/test-objects/xml/example-invoice-01.xml",
    pdf_path: "./tests/test-objects/pdf/example-invoice-01.pdf",
    valid: true,
  },
];

// Helper functions
function validateEInvoice(invoice) {
  try {
    EInvoiceSchema.validate(invoice.data);
    if (!invoice.valid) {
      console.error(`Invoice ${invoice.id} was expected to be invalid but passed validation.`);
    }
  } catch (error) {
    if (invoice.valid) {
      throw new Error(`Invoice ${invoice.id} was expected to be valid but failed validation: ${error.message}`);
    } else {
      console.log(`Invoice ${invoice.id} failed validation as expected: ${error.message}`);
    }
  }
}

function createEInvoiceXml(invoice) {
  if (!invoice.valid) {
    return;
  }

  var invoiceData = EInvoiceSchema.clean(invoice.data);
  const xml = eInvoiceToXml(invoiceData).xml;
  fs.writeFileSync(invoice.xml_path, xml);
}

async function createEInvoicePdf(invoice) {
  if (!invoice.valid) {
    return;
  }

  var invoiceData = EInvoiceSchema.clean(invoice.data);
  const pdfBuffer = await einvoiceToZugferd(invoiceData);
  fs.writeFileSync(invoice.pdf_path, pdfBuffer);
}

// Tests
describe("xml eInvoice", () => {
  it("validate eInvoices", () => {
    test_invoices.forEach(validateEInvoice);
  });

  it("create eInvoice xml", () => {
    test_invoices.forEach(createEInvoiceXml);
  });
});

describe("ZUGFeRD", () => {
  it("create pdf", async () => {
    await Promise.all(test_invoices.map(createEInvoicePdf));
  });
});
