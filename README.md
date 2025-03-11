# meteor-e-invoice
create e-invoices for your meteor application

## Background
There are still only a few notable wrappers for e-invoices designed for js applications. This package is designed to create e-invoices for your meteor application. It is based on the [X-Rechnung](https://xeinkauf.de/xrechnung/) standart. Another goal is the implementation of the advanced [ZUGFeRD](https://www.ferd-net.de/) standart to include the pdf representation of the invoice.

I am neither a js veteran nor a tax adivsor, so this package will have some errors and formality issues! Maybe some open source collaboration will help to improve this package.

Here is a link to the specification I have used to create this package:
[XRechnung v3.0.2](https://xeinkauf.de/app/uploads/2024/07/302-XRechnung-2024-06-20.pdf)

## Usage
If you want to use the package you can do it like this:
### Installation
Install the package via npm:
**Not implemented yet!**
```bash
npm install meteor-e-invoice
```

### Import
Import the package in your meteor application:
```javascript
import { EInvoice } from 'meteor/e-invoice';
```

### Create an invoice object
```javascript
// similar to this
var invoice = EInvoiceSchema.clean({});
```

### Convert it to an XML string
```javascript
// run the conversion
// if there are errors they will be shown as result.error
const result = eInvoiceToXml(invoice);

const xmlString = result.xml;
```

# Credits

## Code Snippets
|name|origin|
|---|---|
|src/api embedXMLInPDF |https://github.com/BenediktCleff/zugferd-generator|

## Example E-Invoices
|name|origin|
|---|---|
|[example-invoice.json](https://github.com/Nasenboi/meteor-e-invoice/blob/main/tests/test-objects/example-invoice.json)|[OpenXRechnungToolbox](https://github.com/jcthiele/OpenXRechnungToolbox/blob/master/exampleInvoices/XRechnung_v3.0.2/01.01a-INVOICE_ubl.xml)|