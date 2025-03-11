import {EInvoiceSchema, InvoiceLine, TaxSubtotal, PartyTaxScheme, AdditionalItemProperty} from "./e-invoice-schema";
import xmlbuilder from "xmlbuilder";

export const EINVOICE_CUSTUMIZATION_ID =
  "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0#conformant#urn:xeinkauf.de:kosit:extension:xrechnung_3.0";
export const EINVOICE_PROFILE_ID = "urn:fdc:peppol.eu:2017:poacc:billing:01:1.0";

// function to convert eInvoice object to XML
export function eInvoiceToXml(eInvoice) {
  try {
    const xml = xmlbuilder
      .create("ubl:Invoice", {
        version: "1.0",
        encoding: "UTF-8",
      })
      .att("xmlns:ubl", "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2")
      .att("xmlns:cac", "urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2")
      .att("xmlns:cbc", "urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2")
      .att("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xml.ele("cbc:CustomizationID", EINVOICE_CUSTUMIZATION_ID);
    xml.ele("cbc:ProfileID", EINVOICE_PROFILE_ID);

    const createElement = (parent, object) => {
      for (const key of Object.keys(object)) {
        const field = object[key];
        if (!field) {
          continue;
        }
        const value = field.value;
        const xml_name = field.xml_name;
        let element;

        if (value && value !== "") {
          if (typeof value === "string") {
            element = parent.ele(xml_name, value);
          } else if (typeof value === "number") {
            element = parent.ele(xml_name, Math.round(value * 100) / 100); // Round to 2 decimal places
          } else if (value instanceof Date) {
            element = parent.ele(xml_name, value.toISOString().slice(0, 10)); // ISO date without time
          } else if (Array.isArray(value) && value?.length > 0) {
            value.forEach((item) => {
              let arrayElement = parent.ele(xml_name);
              if (typeof item === "object") {
                createElement(arrayElement, item);
              } else if (item && item !== "") {
                arrayElement.ele(xml_name, item);
              }
              if (!arrayElement.children?.length) {
                arrayElement.remove();
              }
            });
          } else if (typeof value === "object") {
            element = parent.ele(xml_name);
            createElement(element, value);

            // Remove the objectParent if no children were added
            if (!element.children?.length) {
              element.remove();
              element = null;
            }
          }

          if (field.attributes?.length > 0 && element) {
            field.attributes.forEach((attr) => {
              if (attr.value && attr.value !== "") {
                element.att(attr.name, attr.value);
              }
            });
          }
        }
      }
    };

    createElement(xml, eInvoice);

    const xmlString = xml.end({pretty: true});

    // Return results based on validation outcome
    return {success: true, xml: xmlString};
  } catch (error) {
    return {success: false, error: error, xml: null};
  }
}
