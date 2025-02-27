import SimpleSchema from "simpl-schema";
import {
  INVOICE_TYPE_CODES,
  INVOICE_CURRENCY_CODES,
  VALUE_ADDED_TAX_POINT_DATE_CODES,
  VAT_CATEGORY_CODE,
  COUNTRY_CODES,
  PAYMENT_MEANS_CODE,
} from "./x-rechnung-code-lists";

/* Additional Base Types for the XRechnung 3.0.2 standard
 * see: https://xeinkauf.de/xrechnung
 * This Version mimics the UBL compliant Oasis Invoice 2
 */

// The base attribute to map one field of a js object to an XML element with a given name
const eInvoiceAttribute = new SimpleSchema({
  value: {
    type: String,
    defaultValue: "",
    optional: true,
  },
  name: {
    type: String,
    defaultValue: "",
    optional: true,
  },
});

// The base field to map one field of a js object to an XML element with a given name
const createEInvoiceField = (valueType, allowedValues = null, arrayType = null) => {
  const fieldSchema = {
    ID: {
      type: String,
      defaultValue: "",
    },
    xml_name: {
      type: String,
      defaultValue: "",
    },
    value: {
      optional: true,
    },
    attributes: {
      type: Array,
      defaultValue: [],
      optional: true,
    },
    "attributes.$": {
      type: eInvoiceAttribute,
    },
  };
  if (valueType === Array && arrayType) {
    fieldSchema.value.type = Array;
    fieldSchema["value.$"] = {type: arrayType};
  } else {
    fieldSchema.value.type = valueType;
  }
  if (allowedValues && Array.isArray(allowedValues) && allowedValues.length > 0) {
    fieldSchema.value.allowedValues = allowedValues;
  }
  return new SimpleSchema(fieldSchema);
};

/* XRechnung Child Elements
 *
 */

const PaymentTerms = new SimpleSchema({
  note: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Note", value: ""},
    optional: true,
  },
});

const FinancialInstitutionBranch = new SimpleSchema({
  id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:ID", value: ""},
  },
});

const PayeeFinancialAccount = new SimpleSchema({
  id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:ID", value: ""},
  },
  account_holder: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Name", value: ""},
    optional: true,
  },
  financial_institution_branch: {
    type: createEInvoiceField(FinancialInstitutionBranch),
    defaultValue: {ID: "", xml_name: "cac:FinancialInstitutionBranch", value: FinancialInstitutionBranch.clean({})},
    optional: true,
  },
});

const PaymentMeans = new SimpleSchema({
  payment_means_code: {
    type: createEInvoiceField(String, (allowedValues = PAYMENT_MEANS_CODE)),
    defaultValue: {ID: "", xml_name: "cbc:PaymentMeansCode", value: ""},
  },
  payee_financial_account: {
    type: createEInvoiceField(PayeeFinancialAccount),
    defaultValue: {ID: "", xml_name: "cac:PayeeFinancialAccount", value: PayeeFinancialAccount.clean({})},
    optional: true,
  },
});

const PartyLegalEntity = new SimpleSchema({
  registration_name: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:RegistrationName", value: ""},
  },
  company_id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "BT-30", xml_name: "cbc:CompanyID", value: ""},
    optional: true,
  },
});

const TaxScheme = new SimpleSchema({
  id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:ID", value: ""},
  },
});

export const PartyTaxScheme = new SimpleSchema({
  company_id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "BT-31", xml_name: "cbc:CompanyID", value: ""},
    optional: true,
  },
  tax_scheme: {
    type: createEInvoiceField(TaxScheme),
    defaultValue: {ID: "", xml_name: "cac:TaxScheme", value: TaxScheme.clean({})},
  },
});

const PartyIdentification = new SimpleSchema({
  id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:ID", value: ""},
  },
});

const Country = new SimpleSchema({
  identification_code: {
    type: createEInvoiceField(String, (allowedValues = COUNTRY_CODES)),
    defaultValue: {ID: "", xml_name: "cbc:IdentificationCode", value: "DE"},
  },
  name: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Name", value: ""},
    optional: true,
  },
});

const PostalAddress = new SimpleSchema({
  street_name: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:StreetName", value: ""},
    optional: true,
  },
  building_number: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:BuildingNumber", value: ""},
    optional: true,
  },
  city_name: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:CityName", value: ""},
    optional: true,
  },
  postal_zone: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:PostalZone", value: ""},
    optional: true,
  },
  region: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Region", value: ""},
    optional: true,
  },
  country: {
    type: createEInvoiceField(Country),
    defaultValue: {ID: "", xml_name: "cac:Country", value: Country.clean({})},
    optional: true,
  },
});

const Contact = new SimpleSchema({
  name: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Name", value: ""},
    optional: true,
  },
  telephone: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Telephone", value: ""},
    optional: true,
  },
  telefax: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Telefax", value: ""},
    optional: true,
  },
  electronic_mail: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:ElectronicMail", value: ""},
    optional: true,
  },
  note: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Note", value: ""},
    optional: true,
  },
});

const PartyName = new SimpleSchema({
  name: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Name", value: ""},
  },
});

const Party = new SimpleSchema({
  endpoint_id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:EndpointID", value: ""},
  },
  party_identification: {
    type: createEInvoiceField(PartyIdentification),
    defaultValue: {ID: "", xml_name: "cac:PartyIdentification", value: PartyIdentification.clean({})},
    optional: true,
  },
  party_name: {
    type: createEInvoiceField(PartyName),
    defaultValue: {ID: "", xml_name: "cac:PartyName", value: PartyName.clean({})},
    optional: true,
  },
  postal_address: {
    type: createEInvoiceField(PostalAddress),
    defaultValue: {ID: "", xml_name: "cac:PostalAddress", value: PostalAddress.clean({})},
    optional: true,
  },
  party_tax_scheme: {
    type: createEInvoiceField(Array, null, PartyTaxScheme),
    defaultValue: {ID: "", xml_name: "cac:PartyTaxScheme", value: []},
  },
  party_legal_entity: {
    type: createEInvoiceField(PartyLegalEntity),
    defaultValue: {ID: "", xml_name: "cac:PartyLegalEntity", value: PartyLegalEntity.clean({})},
    optional: true,
  },
  contact: {
    type: createEInvoiceField(Contact),
    defaultValue: {ID: "", xml_name: "cac:Contact", value: Contact.clean({})},
    optional: true,
  },
});

const AccountingSupplierParty = new SimpleSchema({
  party: {
    type: createEInvoiceField(Party),
    defaultValue: {ID: "", xml_name: "cac:Party", value: Party.clean({})},
    optional: true,
  },
});

const AccountingCustomerParty = new SimpleSchema({
  supplier_assigned_account_id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:SupplierAssignedAccountID", value: ""},
    optional: true,
  },
  party: {
    type: createEInvoiceField(Party),
    defaultValue: {ID: "", xml_name: "cac:Party", value: Party.clean({})},
    optional: true,
  },
});

const LegalMonetaryTotal = new SimpleSchema({
  line_extension_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:LineExtensionAmount", value: 0},
  },
  tax_exclusive_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:TaxExclusiveAmount", value: 0},
  },
  tax_inclusive_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:TaxInclusiveAmount", value: 0},
  },
  prepaid_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:PrepaidAmount", value: 0},
  },
  payable_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:PayableAmount", value: 0},
  },
});

const TaxCategory = new SimpleSchema({
  id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:ID", value: ""},
  },
  percent: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:Percent", value: 0},
  },
  tax_scheme: {
    type: createEInvoiceField(TaxScheme),
    defaultValue: {ID: "", xml_name: "cac:TaxScheme", value: TaxScheme.clean({})},
  },
});

export const TaxSubtotal = new SimpleSchema({
  taxable_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:TaxableAmount", value: 0},
  },
  tax_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:TaxAmount", value: 0},
  },
  tax_category: {
    type: createEInvoiceField(TaxCategory),
    defaultValue: {ID: "", xml_name: "cac:TaxCategory", value: TaxCategory.clean({})},
  },
});

const TaxTotal = new SimpleSchema({
  tax_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:TaxAmount", value: 0},
  },
  tax_subtotal: {
    type: createEInvoiceField(Array, null, TaxSubtotal),
    defaultValue: {ID: "", xml_name: "cac:TaxSubtotal", value: []},
  },
});

export const AdditionalItemProperty = new SimpleSchema({
  name: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Name", value: ""},
  },
  value: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Value", value: ""},
  },
});

const Item = new SimpleSchema({
  name: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "BT-153", xml_name: "cbc:Name", value: ""},
    optional: true,
  },
  description: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Description", value: ""},
    optional: true,
  },
  classified_tax_total: {
    type: createEInvoiceField(TaxCategory),
    defaultValue: {ID: "BT-151", xml_name: "cac:ClassifiedTaxCategory", value: TaxCategory.clean({})},
    optional: true,
  },
  additional_item_property: {
    type: createEInvoiceField(Array, null, AdditionalItemProperty),
    defaultValue: {ID: "", xml_name: "cac:AdditionalItemProperty", value: []},
    optional: true,
  },
});

const Price = new SimpleSchema({
  price_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "BT-146", xml_name: "cbc:PriceAmount", value: ""},
  },
});

const SubInvoiceLine = new SimpleSchema({
  id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "BT-126", xml_name: "cbc:ID", value: ""},
  },
  invoice_line_quantity: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "BT-129", xml_name: "cbc:InvoicedQuantity", value: 1},
  },
  line_extension_amount: {
    type: createEInvoiceField(Number),
    defaultValue: {ID: "", xml_name: "cbc:LineExtensionAmount", value: 0},
  },
  item: {
    type: createEInvoiceField(Item),
    defaultValue: {ID: "BG-31", xml_name: "cac:Item", value: Item.clean({})},
  },
  price: {
    type: createEInvoiceField(Price),
    defaultValue: {ID: "BG-29", xml_name: "cac:Price", value: Price.clean({})},
  },
});

export const InvoiceLine = new SimpleSchema({
  sub_invoice_line: {
    type: createEInvoiceField((valueType = Array), (allowedValues = null), (arrayType = SubInvoiceLine)),
    defaultValue: {ID: "", xml_name: "cac:SubInvoiceLine", value: []},
  },
}).extend(SubInvoiceLine);

const OrderReference = new SimpleSchema({
  id: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:ID", value: ""},
  },
});

// const InvoicePeriod = new SimpleSchema({
//   start_date: {
//     type: createEInvoiceField(Date),
//     defaultValue: {ID: "", xml_name: "cbc:StartDate", value: new Date()},
//     optional: true,
//   },
//   end_date: {
//     type: createEInvoiceField(Date),
//     defaultValue: {ID: "", xml_name: "cbc:EndDate", value: new Date()},
//     optional: true,
//   },
// });

// Created for the XRechnung 3.0.2 standard
// see: https://xeinkauf.de/xrechnung
// This Version mimics the UBL compliant Oasis Invoice 2
export const EInvoiceSchema = new SimpleSchema({
  // Invoice element
  ID: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "BT-1", xml_name: "cbc:ID", value: ""},
  },
  issue_date: {
    type: createEInvoiceField(Date),
    defaultValue: {ID: "BT-2", xml_name: "cbc:IssueDate", value: new Date()},
  },
  due_date: {
    type: createEInvoiceField(Date),
    defaultValue: {ID: "BT-6", xml_name: "cbc:DueDate", value: new Date()},
    optional: true,
  },
  invoice_type_code: {
    type: createEInvoiceField(String, (allowedValues = INVOICE_TYPE_CODES)),
    defaultValue: {ID: "BT-3", xml_name: "cbc:InvoiceTypeCode", value: "380"},
  },
  invoice_currency_code: {
    type: createEInvoiceField(String, (allowedValues = INVOICE_CURRENCY_CODES)),
    defaultValue: {ID: "BT-5", xml_name: "cbc:DocumentCurrencyCode", value: ""},
  },
  buyer_reference: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:BuyerReference", value: ""},
    optional: true,
  },
  note: {
    type: createEInvoiceField(String),
    defaultValue: {ID: "", xml_name: "cbc:Note", value: ""},
    optional: true,
  },

  // sub-elements
  // invoice_period: {
  //   type: createEInvoiceField(InvoicePeriod),
  //   defaultValue: {ID: "", xml_name: "cac:InvoicePeriod", value: InvoicePeriod.clean({})},
  // },
  order_reference: {
    type: createEInvoiceField(OrderReference),
    defaultValue: {ID: "", xml_name: "cac:OrderReference", value: OrderReference.clean({})},
  },
  accounting_supplier_party: {
    type: createEInvoiceField(AccountingSupplierParty),
    defaultValue: {ID: "", xml_name: "cac:AccountingSupplierParty", value: AccountingSupplierParty.clean({})},
  },
  accounting_customer_party: {
    type: createEInvoiceField(AccountingCustomerParty),
    defaultValue: {ID: "", xml_name: "cac:AccountingCustomerParty", value: AccountingCustomerParty.clean({})},
  },
  payment_means: {
    type: createEInvoiceField(PaymentMeans),
    defaultValue: {ID: "", xml_name: "cac:PaymentMeans", value: PaymentMeans.clean({})},
  },
  payment_terms: {
    type: createEInvoiceField(PaymentTerms),
    defaultValue: {ID: "", xml_name: "cac:PaymentTerms", value: PaymentTerms.clean({})},
  },
  tax_total: {
    type: createEInvoiceField(TaxTotal),
    defaultValue: {ID: "", xml_name: "cac:TaxTotal", value: TaxTotal.clean({})},
  },
  legal_monetary_total: {
    type: createEInvoiceField(LegalMonetaryTotal),
    defaultValue: {ID: "BG-23", xml_name: "cac:LegalMonetaryTotal", value: LegalMonetaryTotal.clean({})},
  },
  invoice_line: {
    type: createEInvoiceField((valueType = Array), (allowedValues = null), (arrayType = InvoiceLine)),
    defaultValue: {ID: "BG-25", xml_name: "cac:InvoiceLine", value: []},
  },
});
