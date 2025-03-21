import {EInvoiceSchema} from "../src/e-invoice-schema";
import exampleInvoice from "./test-objects/example-invoice.json";
import { eInvoiceToXml, einvoiceToZugferd } from "../src/api";
import fs from "fs";

describe("Validate exampleInvoice", () => {
  it("should validate exampleInvoice", () => {
    EInvoiceSchema.validate(exampleInvoice);
    var invoice = EInvoiceSchema.clean(exampleInvoice);

    const xml = eInvoiceToXml(invoice).xml;

    // store under tests/text-objects/example-invoice.xml
    const path = "./tests/test-objects/example-invoice.xml";
    fs.writeFileSync(path, xml);
  });
});

describe("Zugferd", () => {
  it("should create pdf", async () => {
    EInvoiceSchema.validate(exampleInvoice);
    var invoice = EInvoiceSchema.clean(exampleInvoice);

    const pdfBuffer = await einvoiceToZugferd(invoice);
    const path = "./tests/test-objects/example-invoice.pdf";
    fs.writeFileSync(path, pdfBuffer);
  });
});