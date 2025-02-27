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

const PaymentTerms = new SimpleSchema({
  note: {
    type: String,
    optional: true,
  },
});

const FinancialInstitutionBranch = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
});

const PayeeFinancialAccount = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
  account_holder: {
    type: String,
    optional: true,
  },
  financial_institution_branch: {
    type: FinancialInstitutionBranch,
    optional: true,
  },
});

const PaymentMeans = new SimpleSchema({
  payment_means_code: {
    type: String,
    allowedValues: PAYMENT_MEANS_CODE,
    defaultValue: "1",
  },
  payee_financial_account: {
    type: PayeeFinancialAccount,
    optional: true,
  },
});

const PartyLegalEntity = new SimpleSchema({
  registration_name: {
    type: String,
    defaultValue: "",
  },
  company_id: {
    type: String,
    optional: true,
  },
});

const TaxScheme = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
});

export const PartyTaxScheme = new SimpleSchema({
  company_id: {
    type: String,
    optional: true,
  },
  tax_scheme: {
    type: TaxScheme,
    defaultValue: TaxScheme.clean({}),
  },
});

const PartyIdentification = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
});

const Country = new SimpleSchema({
  identification_code: {
    type: String,
    allowedValues: COUNTRY_CODES,
    defaultValue: "DE",
  },
  name: {
    type: String,
    optional: true,
  },
});

const PostalAddress = new SimpleSchema({
  street_name: {
    type: String,
    optional: true,
  },
  building_number: {
    type: String,
    optional: true,
  },
  city_name: {
    type: String,
    optional: true,
  },
  postal_zone: {
    type: String,
    optional: true,
  },
  region: {
    type: String,
    optional: true,
  },
  country: {
    type: Country,
    optional: true,
  },
});

const Contact = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  telephone: {
    type: String,
    optional: true,
  },
  telefax: {
    type: String,
    optional: true,
  },
  electronic_mail: {
    type: String,
    optional: true,
  },
  note: {
    type: String,
    optional: true,
  },
});

const PartyName = new SimpleSchema({
  name: {
    type: String,
    defaultValue: "",
  },
});

const Party = new SimpleSchema({
  endpoint_id: {
    type: String,
    defaultValue: "",
  },
  party_identification: {
    type: PartyIdentification,
    optional: true,
  },
  party_name: {
    type: PartyName,
    optional: true,
  },
  postal_address: {
    type: PostalAddress,
    optional: true,
  },
  party_tax_scheme: {
    type: Array,
    optional: true,
  },
  "party_tax_scheme.$": {
    type: PartyTaxScheme,
  },
  party_legal_entity: {
    type: PartyLegalEntity,
    optional: true,
  },
  contact: {
    type: Contact,
    optional: true,
  },
});

const AccountingSupplierParty = new SimpleSchema({
  party: {
    type: Party,
    optional: true,
  },
});

const AccountingCustomerParty = new SimpleSchema({
  supplier_assigned_account_id: {
    type: String,
    optional: true,
  },
  party: {
    type: Party,
    optional: true,
  },
});

const LegalMonetaryTotal = new SimpleSchema({
  line_extension_amount: {
    type: Number,
    defaultValue: 0,
  },
  tax_exclusive_amount: {
    type: Number,
    defaultValue: 0,
  },
  tax_inclusive_amount: {
    type: Number,
    defaultValue: 0,
  },
  prepaid_amount: {
    type: Number,
    defaultValue: 0,
  },
  payable_amount: {
    type: Number,
    defaultValue: 0,
  },
  currency_id: {
    type: String,
    defaultValue: "EUR",
    allowedValues: INVOICE_CURRENCY_CODES,
  },
});

const TaxCategory = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
  percent: {
    type: Number,
    defaultValue: 0,
  },
  tax_scheme: {
    type: TaxScheme,
    defaultValue: TaxScheme.clean({}),
  },
});

export const TaxSubtotal = new SimpleSchema({
  taxable_amount: {
    type: Number,
    defaultValue: 0,
  },
  tax_amount: {
    type: Number,
    defaultValue: 0,
  },
  tax_category: {
    type: TaxCategory,
    defaultValue: TaxCategory.clean({}),
  },
});

const TaxTotal = new SimpleSchema({
  tax_amount: {
    type: Number,
    defaultValue: 0,
  },
  tax_subtotal: {
    type: Array,
    optional: true,
  },
  "tax_subtotal.$": {
    type: TaxSubtotal,
  },
});

export const AdditionalItemProperty = new SimpleSchema({
  name: {
    type: String,
    defaultValue: "",
  },
  value: {
    type: String,
    defaultValue: "",
  },
});

const Item = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  classified_tax_total: {
    type: TaxCategory,
    optional: true,
  },
  additional_item_property: {
    type: Array,
    optional: true,
  },
  "additional_item_property.$": {
    type: AdditionalItemProperty,
  },
});

const Price = new SimpleSchema({
  price_amount: {
    type: Number,
    defaultValue: 0,
  },
});

const SubInvoiceLine = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
  invoice_line_quantity: {
    type: Number,
    defaultValue: 1,
  },
  line_extension_amount: {
    type: Number,
    defaultValue: 0,
  },
  item: {
    type: Item,
    defaultValue: Item.clean({}),
  },
  price: {
    type: Price,
    defaultValue: Price.clean({}),
  },
  currency_id: {
    type: String,
    defaultValue: "EUR",
    allowedValues: INVOICE_CURRENCY_CODES,
  },
});

export const InvoiceLine = new SimpleSchema({
  sub_invoice_line: {
    type: Array,
    optional: true,
  },
  "sub_invoice_line.$": {
    type: SubInvoiceLine,
  },
}).extend(SubInvoiceLine);

const OrderReference = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
});

// Created for the XRechnung 3.0.2 standard
// see: https://xeinkauf.de/xrechnung
// This Version mimics the UBL compliant Oasis Invoice 2
export const EInvoiceSchema = new SimpleSchema({
  // Invoice element
  ID: {
    type: String,
    defaultValue: "",
  },
  issue_date: {
    type: SimpleSchema.oneOf(Date, String),
    defaultValue: new Date(),
  },
  due_date: {
    type: SimpleSchema.oneOf(Date, String),
    optional: true,
  },
  invoice_type_code: {
    type: String,
    allowedValues: INVOICE_TYPE_CODES,
    defaultValue: "380",
  },
  invoice_currency_code: {
    type: String,
    allowedValues: INVOICE_CURRENCY_CODES,
    defaultValue: "",
  },
  buyer_reference: {
    type: String,
    optional: true,
  },
  note: {
    type: String,
    optional: true,
  },

  order_reference: {
    type: OrderReference,
    defaultValue: OrderReference.clean({}),
  },
  accounting_supplier_party: {
    type: AccountingSupplierParty,
    defaultValue: AccountingSupplierParty.clean({}),
  },
  accounting_customer_party: {
    type: AccountingCustomerParty,
    defaultValue: AccountingCustomerParty.clean({}),
  },
  payment_means: {
    type: PaymentMeans,
    defaultValue: PaymentMeans.clean({}),
  },
  payment_terms: {
    type: PaymentTerms,
    defaultValue: PaymentTerms.clean({}),
  },
  tax_total: {
    type: TaxTotal,
    defaultValue: TaxTotal.clean({}),
  },
  legal_monetary_total: {
    type: LegalMonetaryTotal,
    defaultValue: LegalMonetaryTotal.clean({}),
  },
  invoice_line: {
    type: Array,
    defaultValue: [],
  },
  "invoice_line.$": {
    type: InvoiceLine,
  },
});