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
    console.log("xml data", JSON.stringify(addXmlData("EInvoiceSchema", invoice), null, 2));
    const xml = eInvoiceToXml(invoice).xml;
    //console.log("xml", xml);
    // store under tests/text-objects/example-invoice.xml
    const path = "./tests/test-objects/example-invoice.xml";
    fs.writeFileSync(path, xml);
  });
});
