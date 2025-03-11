/*
 * Add informations to the default js object
 * to parse it to xml
 */

export default function addXmlData(key, value) {
  const handlers = {
    PaymentTerms: () => ({
      note: {ID: "", xml_name: "cbc:Note", value: value.note},
    }),
    FinancialInstitutionBranch: () => ({
      id: {ID: "", xml_name: "cbc:ID", value: value.id},
    }),
    PayeeFinancialAccount: () => ({
      id: {ID: "", xml_name: "cbc:ID", value: value.id},
      account_holder: value.account_holder ? {ID: "", xml_name: "cbc:Name", value: value.account_holder} : null,
      financial_institution_branch: value.financial_institution_branch
        ? {ID: "", xml_name: "cac:FinancialInstitutionBranch", value: addXmlData("FinancialInstitutionBranch", value.financial_institution_branch)}
        : null,
    }),
    PaymentMeans: () => ({
      payment_means_code: {ID: "", xml_name: "cbc:PaymentMeansCode", value: value.payment_means_code},
      payee_financial_account: value.payee_financial_account
        ? {ID: "", xml_name: "cac:PayeeFinancialAccount", value: addXmlData("PayeeFinancialAccount", value.payee_financial_account)}
        : null,
    }),
    PartyLegalEntity: () => ({
      registration_name: {ID: "", xml_name: "cbc:RegistrationName", value: value.registration_name},
      company_id: value.company_id ? {ID: "BT-30", xml_name: "cbc:CompanyID", value: value.company_id} : null,
      company_legal_form: value.company_legal_form ? {ID: "", xml_name: "cbc:CompanyLegalForm", value: value.company_legal_form} : null,
    }),
    TaxScheme: () => ({
      id: {ID: "", xml_name: "cbc:ID", value: value.id},
    }),
    PartyTaxScheme: () => ({
      company_id: value.company_id ? {ID: "", xml_name: "cbc:CompanyID", value: value.company_id} : null,
      tax_scheme: {ID: "", xml_name: "cac:TaxScheme", value: addXmlData("TaxScheme", value.tax_scheme)},
    }),
    PartyIdentification: () => ({
      id: {ID: "", xml_name: "cbc:ID", value: value.id},
    }),
    Country: () => ({
      identification_code: {ID: "", xml_name: "cbc:IdentificationCode", value: value.identification_code},
      name: value.name ? {ID: "", xml_name: "cbc:Name", value: value.name} : null,
    }),
    PostalAddress: () => ({
      street_name: value.street_name ? {ID: "", xml_name: "cbc:StreetName", value: value.street_name} : null,
      building_number: value.building_number ? {ID: "", xml_name: "cbc:BuildingNumber", value: value.building_number} : null,
      city_name: value.city_name ? {ID: "", xml_name: "cbc:CityName", value: value.city_name} : null,
      postal_zone: value.postal_zone ? {ID: "", xml_name: "cbc:PostalZone", value: value.postal_zone} : null,
      region: value.region ? {ID: "", xml_name: "cbc:Region", value: value.region} : null,
      country: value.country ? {ID: "", xml_name: "cac:Country", value: addXmlData("Country", value.country)} : null,
    }),
    Contact: () => ({
      name: value.name ? {ID: "", xml_name: "cbc:Name", value: value.name} : null,
      telephone: value.telephone ? {ID: "", xml_name: "cbc:Telephone", value: value.telephone} : null,
      telefax: value.telefax ? {ID: "", xml_name: "cbc:Telefax", value: value.telefax} : null,
      electronic_mail: value.electronic_mail ? {ID: "", xml_name: "cbc:ElectronicMail", value: value.electronic_mail} : null,
      note: value.note ? {ID: "", xml_name: "cbc:Note", value: value.note} : null,
    }),
    PartyName: () => ({
      name: {ID: "", xml_name: "cbc:Name", value: value.name},
    }),
    Party: () => ({
      endpoint_id: {ID: "", xml_name: "cbc:EndpointID", value: value.endpoint_id, attributes: [{name: "schemeID", value: "EM"}]},
      party_identification: value.party_identification
        ? {ID: "", xml_name: "cac:PartyIdentification", value: addXmlData("PartyIdentification", value.party_identification)}
        : null,
      party_name: value.party_name ? {ID: "", xml_name: "cac:PartyName", value: addXmlData("PartyName", value.party_name)} : null,
      postal_address: value.postal_address ? {ID: "", xml_name: "cac:PostalAddress", value: addXmlData("PostalAddress", value.postal_address)} : null,
      party_tax_scheme:
        value.party_tax_scheme && value.party_tax_scheme.length > 0
          ? {ID: "BT-31", xml_name: "cac:PartyTaxScheme", value: value.party_tax_scheme.map((item) => addXmlData("PartyTaxScheme", item))}
          : null,
      party_legal_entity: value.party_legal_entity
        ? {ID: "", xml_name: "cac:PartyLegalEntity", value: addXmlData("PartyLegalEntity", value.party_legal_entity)}
        : null,
      contact: value.contact ? {ID: "", xml_name: "cac:Contact", value: addXmlData("Contact", value.contact)} : null,
    }),
    AccountingCustomerParty: () => ({
      party: value.party ? {ID: "", xml_name: "cac:Party", value: addXmlData("Party", value.party)} : null,
    }),
    AccountingSupplierParty: () => ({
      party: value.party ? {ID: "", xml_name: "cac:Party", value: addXmlData("Party", value.party)} : null,
    }),
    LegalMonetaryTotal: () => ({
      line_extension_amount: {
        ID: "",
        xml_name: "cbc:LineExtensionAmount",
        value: value.line_extension_amount,
        attributes: [{name: "currencyID", value: value.currency_id}],
      },
      tax_exclusive_amount: {
        ID: "",
        xml_name: "cbc:TaxExclusiveAmount",
        value: value.tax_exclusive_amount,
        attributes: [{name: "currencyID", value: value.currency_id}],
      },
      tax_inclusive_amount: {
        ID: "",
        xml_name: "cbc:TaxInclusiveAmount",
        value: value.tax_inclusive_amount,
        attributes: [{name: "currencyID", value: value.currency_id}],
      },
      prepaid_amount: {ID: "", xml_name: "cbc:PrepaidAmount", value: value.prepaid_amount},
      payable_amount: {
        ID: "",
        xml_name: "cbc:PayableAmount",
        value: value.payable_amount,
        attributes: [{name: "currencyID", value: value.currency_id}],
      },
    }),
    TaxCategory: () => ({
      id: {ID: "", xml_name: "cbc:ID", value: value.id},
      percent: {ID: "", xml_name: "cbc:Percent", value: value.percent},
      tax_scheme: {ID: "", xml_name: "cac:TaxScheme", value: addXmlData("TaxScheme", value.tax_scheme)},
    }),
    TaxSubtotal: () => ({
      taxable_amount: {
        ID: "",
        xml_name: "cbc:TaxableAmount",
        value: value.taxable_amount,
        attributes: [{name: "currencyID", value: value.currency_id}],
      },
      tax_amount: {ID: "", xml_name: "cbc:TaxAmount", value: value.tax_amount, attributes: [{name: "currencyID", value: value.currency_id}]},
      tax_category: {ID: "", xml_name: "cac:TaxCategory", value: addXmlData("TaxCategory", value.tax_category)},
      percent: value.percent ? {ID: "", xml_name: "cbc:Percent", value: value.percent} : null,
    }),
    TaxTotal: () => ({
      tax_amount: {ID: "", xml_name: "cbc:TaxAmount", value: value.tax_amount, attributes: [{name: "currencyID", value: value.currency_id}]},
      tax_subtotal:
        value.tax_subtotal && value.tax_subtotal.length > 0
          ? {ID: "", xml_name: "cac:TaxSubtotal", value: value.tax_subtotal.map((item) => addXmlData("TaxSubtotal", item))}
          : null,
    }),
    AdditionalItemProperty: () => ({
      name: {ID: "", xml_name: "cbc:Name", value: value.name},
      value: {ID: "", xml_name: "cbc:Value", value: value.value},
    }),
    SellersItemIdentification: () => ({
      id: {ID: "", xml_name: "cbc:ID", value: value.id},
    }),
    CommodityClassification: () => ({
      item_classification_code: {
        ID: "",
        xml_name: "cbc:ItemClassificationCode",
        value: value.item_classification_code,
        attributes: [{name: "listID", value: value.list_id}],
      },
    }),
    Item: () => ({
      description: value.description ? {ID: "", xml_name: "cbc:Description", value: value.description} : null,
      name: value.name ? {ID: "BT-153", xml_name: "cbc:Name", value: value.name} : null,
      additional_item_property:
        value.additional_item_property && value.additional_item_property.length > 0
          ? {
              ID: "",
              xml_name: "cac:AdditionalItemProperty",
              value: value.additional_item_property.map((item) => addXmlData("AdditionalItemProperty", item)),
            }
          : null,
      sellers_item_identification: value.sellers_item_identification
        ? {ID: "", xml_name: "cac:SellersItemIdentification", value: addXmlData("SellersItemIdentification", value.sellers_item_identification)}
        : null,
      commodity_classification: value.commodity_classification
        ? {ID: "", xml_name: "cac:CommodityClassification", value: addXmlData("CommodityClassification", value.commodity_classification)}
        : null,
      classified_tax_category: value.classified_tax_category
        ? {ID: "BT-151", xml_name: "cac:ClassifiedTaxCategory", value: addXmlData("TaxCategory", value.classified_tax_category)}
        : null,
    }),
    Price: () => ({
      price_amount: {
        ID: "BT-146",
        xml_name: "cbc:PriceAmount",
        value: value.price_amount,
        attributes: [{name: "currencyID", value: value.currency_id}],
      },
    }),
    InvoicePeriod: () => ({
      start_date: {ID: "", xml_name: "cbc:StartDate", value: value.start_date},
      end_date: {ID: "", xml_name: "cbc:EndDate", value: value.end_date},
    }),
    OrderLineReference: () => ({
      line_id: {ID: "", xml_name: "cbc:LineID", value: value.line_id},
    }),
    SubInvoiceLine: () => ({
      id: {ID: "BT-126", xml_name: "cbc:ID", value: value.id},
      note: value.note ? {ID: "", xml_name: "cbc:Note", value: value.note} : null,
      invoice_line_quantity: {
        ID: "BT-129",
        xml_name: "cbc:InvoicedQuantity",
        value: value.invoice_line_quantity,
        attributes: [{name: "unitCode", value: value.unit_code}],
      },
      line_extension_amount: {
        ID: "",
        xml_name: "cbc:LineExtensionAmount",
        value: value.line_extension_amount,
        attributes: [{name: "currencyID", value: value.currency_id}],
      },
      invoice_period: value.invoice_period ? {ID: "", xml_name: "cac:InvoicePeriod", value: addXmlData("InvoicePeriod", value.invoice_period)} : null,
      order_line_reference: value.order_line_reference
        ? {ID: "", xml_name: "cac:OrderLineReference", value: addXmlData("OrderLineReference", value.order_line_reference)}
        : null,
      item: value.item ? {ID: "BG-31", xml_name: "cac:Item", value: addXmlData("Item", value.item)} : null,
      price: value.price ? {ID: "BG-29", xml_name: "cac:Price", value: addXmlData("Price", value.price)} : null,
    }),
    InvoiceLine: () => ({
      ...addXmlData("SubInvoiceLine", value),
      sub_invoice_line:
        value.sub_invoice_line && value.sub_invoice_line.length > 0
          ? {ID: "", xml_name: "cac:SubInvoiceLine", value: value.sub_invoice_line.map((item) => addXmlData("SubInvoiceLine", item))}
          : null,
    }),
    OrderReference: () => ({
      id: {ID: "", xml_name: "cbc:ID", value: value.id},
    }),
    EInvoiceSchema: () => ({
      ID: {ID: "BT-1", xml_name: "cbc:ID", value: value.ID},
      issue_date: {ID: "BT-2", xml_name: "cbc:IssueDate", value: value.issue_date},
      due_date: value.due_date ? {ID: "BT-6", xml_name: "cbc:DueDate", value: value.due_date} : null,
      invoice_type_code: {ID: "BT-3", xml_name: "cbc:InvoiceTypeCode", value: value.invoice_type_code},
      note: value.note ? {ID: "", xml_name: "cbc:Note", value: value.note} : null,
      document_currency_code: {ID: "BT-5", xml_name: "cbc:DocumentCurrencyCode", value: value.document_currency_code},
      buyer_reference: value.buyer_reference ? {ID: "", xml_name: "cbc:BuyerReference", value: value.buyer_reference} : null,
      order_reference: value.order_reference
        ? {ID: "", xml_name: "cac:OrderReference", value: addXmlData("OrderReference", value.order_reference)}
        : null,
      accounting_supplier_party: {
        ID: "",
        xml_name: "cac:AccountingSupplierParty",
        value: addXmlData("AccountingSupplierParty", value.accounting_supplier_party),
      },
      accounting_customer_party: {
        ID: "",
        xml_name: "cac:AccountingCustomerParty",
        value: addXmlData("AccountingCustomerParty", value.accounting_customer_party),
      },
      payment_means: {ID: "", xml_name: "cac:PaymentMeans", value: addXmlData("PaymentMeans", value.payment_means)},
      payment_terms: {ID: "", xml_name: "cac:PaymentTerms", value: addXmlData("PaymentTerms", value.payment_terms)},
      tax_total: {ID: "", xml_name: "cac:TaxTotal", value: addXmlData("TaxTotal", value.tax_total)},
      legal_monetary_total: {ID: "BG-23", xml_name: "cac:LegalMonetaryTotal", value: addXmlData("LegalMonetaryTotal", value.legal_monetary_total)},
      invoice_line: {ID: "BG-25", xml_name: "cac:InvoiceLine", value: value.invoice_line.map((item) => addXmlData("InvoiceLine", item))},
    }),
  };

  if (handlers[key]) {
    return handlers[key]();
  }

  // raise error
  throw new Error(`No handler for ${key}`);
}
