import {EInvoiceSchema} from "../src/e-invoice-schema";
import addXmlData from "../src/xml-parser";
import exampleInvoice from "./test-objects/example-invoice.json";
import { eInvoiceToXml } from "../src/api";
import fs from "fs";

describe("Validate exampleInvoice", () => {
  it("should validate exampleInvoice", () => {
    EInvoiceSchema.validate(exampleInvoice);
    var invoice = EInvoiceSchema.clean(exampleInvoice);
    invoice = addXmlData("EInvoiceSchema", invoice);

    const xml = eInvoiceToXml(invoice).xml;
    
    // store under tests/text-objects/example-invoice.xml
    const path = "./tests/test-objects/example-invoice.xml";
    fs.writeFileSync(path, xml);
  });
});
