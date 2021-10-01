const allTicketReportTemplate = (props) => {
  const { tickets } = props;

  let row = '';
  tickets.forEach((element) => {
    row += `
    <tr>
      <td>${element._id}</td>
      <td>${element.name}</td>
      <td>${element.subject}</td>
      <td>${element.status}</td>
    </tr>
    `;
  });
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
       <h3 class="justify-center">All Depatment details report</h3>
          <div class="invoice-box">
            <p><strong>Total Number of tickets in the system :</strong> ${tickets.length}</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <th>REF NO</th>
                <th>NAME</th>
                <th>SUBJECT</th>
                <th>STATUS</th>
              </tr>
              ${row}
            </table>
             <br />
          </div>
       </body>
    </html>
    `;
};

module.exports = { allTicketReportTemplate };
