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

PaymentTerms.helpers({
  addXmlData() {
    return {
      note: {ID: "", xml_name: "cbc:Note", value: this.note},
    };
  },
});

const FinancialInstitutionBranch = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
});

FinancialInstitutionBranch.helpers({
  addXmlData() {
    return {
      id: {ID: "", xml_name: "cbc:ID", value: this.id},
    };
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

PayeeFinancialAccount.helpers({
  addXmlData() {
    return {
      id: {ID: "", xml_name: "cbc:ID", value: this.id},
      account_holder: this.account_holder ? {ID: "", xml_name: "cbc:Name", value: this.account_holder} : null,
      financial_institution_branch: this.financial_institution_branch
        ? {ID: "", xml_name: "cac:FinancialInstitutionBranch", value: this.financial_institution_branch.addXmlData()}
        : null,
    };
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

PaymentMeans.helpers({
  addXmlData() {
    return {
      payment_means_code: {ID: "", xml_name: "cbc:PaymentMeansCode", value: this.payment_means_code},
      payee_financial_account: this.payee_financial_account
        ? {ID: "", xml_name: "cac:PayeeFinancialAccount", value: this.payee_financial_account.addXmlData()}
        : null,
    };
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

PartyLegalEntity.helpers({
  addXmlData() {
    return {
      registration_name: {ID: "", xml_name: "cbc:RegistrationName", value: this.registration_name},
      company_id: this.company_id ? {ID: "BT-30", xml_name: "cbc:CompanyID", value: this.company_id} : null,
    };
  },
});

const TaxScheme = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
});

TaxScheme.helpers({
  addXmlData() {
    return {
      id: {ID: "", xml_name: "cbc:ID", value: this.id},
    };
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

PartyTaxScheme.helpers({
  addXmlData() {
    return {
      company_id: this.company_id ? {ID: "", xml_name: "cbc:CompanyID", value: this.company_id} : null,
      tax_scheme: {ID: "", xml_name: "cac:TaxScheme", value: this.tax_scheme.addXmlData()},
    };
  },
});

const PartyIdentification = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
});

PartyIdentification.helpers({
  addXmlData() {
    return {
      id: {ID: "", xml_name: "cbc:ID", value: this.id},
    };
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

Country.helpers({
  addXmlData() {
    return {
      identification_code: {ID: "", xml_name: "cbc:IdentificationCode", value: this.identification_code},
      name: this.name ? {ID: "", xml_name: "cbc:Name", value: this.name} : null,
    };
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

PostalAddress.helpers({
  addXmlData() {
    return {
      street_name: this.street_name ? {ID: "", xml_name: "cbc:StreetName", value: this.street_name} : null,
      building_number: this.building_number ? {ID: "", xml_name: "cbc:BuildingNumber", value: this.building_number} : null,
      city_name: this.city_name ? {ID: "", xml_name: "cbc:CityName", value: this.city_name} : null,
      postal_zone: this.postal_zone ? {ID: "", xml_name: "cbc:PostalZone", value: this.postal_zone} : null,
      region: this.region ? {ID: "", xml_name: "cbc:Region", value: this.region} : null,
      country: this.country ? {ID: "", xml_name: "cac:Country", value: this.country.addXmlData()} : null,
    };
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

Contact.helpers({
  addXmlData() {
    return {
      name: this.name ? {ID: "", xml_name: "cbc:Name", value: this.name} : null,
      telephone: this.telephone ? {ID: "", xml_name: "cbc:Telephone", value: this.telephone} : null,
      telefax: this.telefax ? {ID: "", xml_name: "cbc:Telefax", value: this.telefax} : null,
      electronic_mail: this.electronic_mail ? {ID: "", xml_name: "cbc:ElectronicMail", value: this.electronic_mail} : null,
      note: this.note ? {ID: "", xml_name: "cbc:Note", value: this.note} : null,
    };
  },
});

const PartyName = new SimpleSchema({
  name: {
    type: String,
    defaultValue: "",
  },
});

PartyName.helpers({
  addXmlData() {
    return {
      name: {ID: "", xml_name: "cbc:Name", value: this.name},
    };
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
    defaultValue: [],
  },
  "party_tax_scheme.$": {
    type: createEInvoiceField(PartyTaxScheme),
    optional: true,
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

Party.helpers({
  addXmlData() {
    return {
      endpoint_id: {ID: "", xml_name: "cbc:EndpointID", value: this.endpoint_id},
      party_identification: this.party_identification
        ? {ID: "", xml_name: "cac:PartyIdentification", value: this.party_identification.addXmlData()}
        : null,
      party_name: this.party_name ? {ID: "", xml_name: "cac:PartyName", value: this.party_name.addXmlData()} : null,
      postal_address: this.postal_address ? {ID: "", xml_name: "cac:PostalAddress", value: this.postal_address.addXmlData()} : null,
      party_tax_scheme: this.party_tax_scheme.map((item) => {
        return {ID: "BT-31", xml_name: "cac:PartyTaxScheme", value: item.addXmlData()};
      }),
      party_legal_entity: this.party_legal_entity ? {ID: "", xml_name: "cac:PartyLegalEntity", value: this.party_legal_entity.addXmlData()} : null,
      contact: this.contact ? {ID: "", xml_name: "cac:Contact", value: this.contact.addXmlData()} : null,
    };
  },
});

const AccountingSupplierParty = new SimpleSchema({
  party: {
    type: Party,
    optional: true,
  },
});

AccountingCustomerParty.helpers({
  addXmlData() {
    return {
      party: this.party ? {ID: "", xml_name: "cac:Party", value: this.party.addXmlData()} : null,
    };
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

AccountingCustomerParty.helpers({
  addXmlData() {
    return {
      supplier_assigned_account_id: this.supplier_assigned_account_id
        ? {ID: "", xml_name: "cbc:SupplierAssignedAccountID", value: this.supplier_assigned_account_id}
        : null,
      party: this.party ? {ID: "", xml_name: "cac:Party", value: this.party.addXmlData()} : null,
    };
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
});

LegalMonetaryTotal.helpers({
  addXmlData() {
    return {
      line_extension_amount: {ID: "", xml_name: "cbc:LineExtensionAmount", value: this.line_extension_amount},
      tax_exclusive_amount: {ID: "", xml_name: "cbc:TaxExclusiveAmount", value: this.tax_exclusive_amount},
      tax_inclusive_amount: {ID: "", xml_name: "cbc:TaxInclusiveAmount", value: this.tax_inclusive_amount},
      prepaid_amount: {ID: "", xml_name: "cbc:PrepaidAmount", value: this.prepaid_amount},
      payable_amount: {ID: "", xml_name: "cbc:PayableAmount", value: this.payable_amount},
    };
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

TaxCategory.helpers({
  addXmlData() {
    return {
      id: {ID: "", xml_name: "cbc:ID", value: this.id},
      percent: {ID: "", xml_name: "cbc:Percent", value: this.percent},
      tax_scheme: {ID: "", xml_name: "cac:TaxScheme", value: this.tax_scheme.addXmlData()},
    };
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

TaxSubtotal.helpers({
  addXmlData() {
    return {
      taxable_amount: {ID: "", xml_name: "cbc:TaxableAmount", value: this.taxable_amount},
      tax_amount: {ID: "", xml_name: "cbc:TaxAmount", value: this.tax_amount},
      tax_category: {ID: "", xml_name: "cac:TaxCategory", value: this.tax_category.addXmlData()},
    };
  },
});

const TaxTotal = new SimpleSchema({
  tax_amount: {
    type: Number,
    defaultValue: 0,
  },
  tax_subtotal: {
    type: Array,
    defaultValue: [],
  },
  "tax_subtotal.$": {
    type: TaxSubtotal,
    optional: true,
  },
});

TaxTotal.helpers({
  addXmlData() {
    return {
      tax_amount: {ID: "", xml_name: "cbc:TaxAmount", value: this.tax_amount},
      tax_subtotal: this.tax_subtotal.map((item) => {
        return {ID: "", xml_name: "cac:TaxSubtotal", value: item.addXmlData()};
      }),
    };
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

AdditionalItemProperty.helpers({
  addXmlData() {
    return {
      name: {ID: "", xml_name: "cbc:Name", value: this.name},
      value: {ID: "", xml_name: "cbc:Value", value: this.value},
    };
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
    optional: true,
  },
});

Item.helpers({
  addXmlData() {
    return {
      name: this.name ? {ID: "BT-153", xml_name: "cbc:Name", value: this.name} : null,
      description: this.description ? {ID: "", xml_name: "cbc:Description", value: this.description} : null,
      classified_tax_total: this.classified_tax_total
        ? {ID: "BT-151", xml_name: "cac:ClassifiedTaxCategory", value: this.classified_tax_total.addXmlData()}
        : null,
      additional_item_property: this.additional_item_property.map((item) => {
        return {ID: "", xml_name: "cac:AdditionalItemProperty", value: item.addXmlData()};
      }),
    };
  },
});

const Price = new SimpleSchema({
  price_amount: {
    type: Number,
    defaultValue: 0,
  },
});

Price.helpers({
  addXmlData() {
    return {
      price_amount: {ID: "BT-146", xml_name: "cbc:PriceAmount", value: this.price_amount},
    };
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
});

SubInvoiceLine.helpers({
  addXmlData() {
    return {
      id: {ID: "BT-126", xml_name: "cbc:ID", value: this.id},
      invoice_line_quantity: {ID: "BT-129", xml_name: "cbc:InvoicedQuantity", value: this.invoice_line_quantity},
      line_extension_amount: {ID: "", xml_name: "cbc:LineExtensionAmount", value: this.line_extension_amount},
      item: {ID: "BG-31", xml_name: "cac:Item", value: this.item.addXmlData()},
      price: {ID: "BG-29", xml_name: "cac:Price", value: this.price.addXmlData()},
    };
  },
});

export const InvoiceLine = new SimpleSchema({
  sub_invoice_line: {
    type: Array,
    defaultValue: [],
  },
  "sub_invoice_line.$": {
    type: SubInvoiceLine,
    optional: true,
  },
}).extend(SubInvoiceLine);

InvoiceLine.helpers({
  addXmlData() {
    // Create a clean version of `this` by omitting the `sub_invoice_line` field
    const invoiceLineData = {...this};
    delete invoiceLineData.sub_invoice_line; // Remove the `sub_invoice_line` field

    // Create a temporary SubInvoiceLine object using the cleaned-up data
    const subInvoiceLineData = new SubInvoiceLine(invoiceLineData);

    // Get the XML data from the SubInvoiceLine object
    const invoice_line_data = subInvoiceLineData.addXmlData();
    return {
      ...invoice_line_data,
      sub_invoice_line: this.sub_invoice_line.map((item) => {
        return {ID: "", xml_name: "cac:SubInvoiceLine", value: item.addXmlData()};
      }),
    };
  },
});

const OrderReference = new SimpleSchema({
  id: {
    type: String,
    defaultValue: "",
  },
});

OrderReference.helpers({
  addXmlData() {
    return {
      id: {ID: "", xml_name: "cbc:ID", value: this.id},
    };
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
    type: String,
    defaultValue: "",
  },
  issue_date: {
    type: Date,
    defaultValue: new Date(),
  },
  due_date: {
    type: Date,
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

  // sub-elements
  // invoice_period: {
  //   type: createEInvoiceField(InvoicePeriod),
  //   defaultValue: {ID: "", xml_name: "cac:InvoicePeriod", value: InvoicePeriod.clean({})},
  // },
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
    optional: true,
  },
});

EInvoiceSchema.helpers({
  addXmlData() {
    return {
      ID: {ID: "BT-1", xml_name: "cbc:ID", value: this.ID},
      issue_date: {ID: "BT-2", xml_name: "cbc:IssueDate", value: this.issue_date},
      due_date: this.due_date ? {ID: "BT-6", xml_name: "cbc:DueDate", value: this.due_date} : null,
      invoice_type_code: {ID: "BT-3", xml_name: "cbc:InvoiceTypeCode", value: this.invoice_type_code},
      invoice_currency_code: {ID: "BT-5", xml_name: "cbc:DocumentCurrencyCode", value: this.invoice_currency_code},
      buyer_reference: this.buyer_reference ? {ID: "", xml_name: "cbc:BuyerReference", value: this.buyer_reference} : null,
      note: this.note ? {ID: "", xml_name: "cbc:Note", value: this.note} : null,
      order_reference: {ID: "", xml_name: "cac:OrderReference", value: this.order_reference.addXmlData()},
      accounting_supplier_party: {ID: "", xml_name: "cac:AccountingSupplierParty", value: this.accounting_supplier_party.addXmlData()},
      accounting_customer_party: {ID: "", xml_name: "cac:AccountingCustomerParty", value: this.accounting_customer_party.addXmlData()},
      payment_means: {ID: "", xml_name: "cac:PaymentMeans", value: this.payment_means.addXmlData()},
      payment_terms: {ID: "", xml_name: "cac:PaymentTerms", value: this.payment_terms.addXmlData()},
      tax_total: {ID: "", xml_name: "cac:TaxTotal", value: this.tax_total.addXmlData()},
      legal_monetary_total: {ID: "BG-23", xml_name: "cac:LegalMonetaryTotal", value: this.legal_monetary_total.addXmlData()},
      invoice_line: this.invoice_line.map((item) => {
        return {ID: "BG-25", xml_name: "cac:InvoiceLine", value: item.addXmlData()};
      }),
    };
  }
});