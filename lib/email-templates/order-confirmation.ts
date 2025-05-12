export function generateOrderConfirmationEmail(order: any) {
  const orderDate = new Date(order.date).toLocaleDateString()
  const orderItems = order.items || []

  // Calculate subtotal
  const subtotal = orderItems.reduce((sum: number, item: any) => sum + (Number.parseFloat(item.price) || 0), 0)

  // Calculate GST (10% in Australia)
  const gst = subtotal / 11 // GST is 1/11 of the total price (as it's included)

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header img {
          max-width: 150px;
          height: auto;
        }
        .order-info {
          margin-bottom: 30px;
        }
        .pickup-info {
          background-color: #f9f9f9;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 5px;
        }
        .billing-info {
          margin-bottom: 20px;
        }
        .order-summary {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .order-summary th {
          background-color: #f2f2f2;
          text-align: left;
          padding: 10px;
        }
        .order-summary td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .totals {
          margin-top: 20px;
        }
        .totals table {
          width: 100%;
          border-collapse: collapse;
        }
        .totals td {
          padding: 5px;
        }
        .totals .total-row {
          font-weight: bold;
          border-top: 2px solid #ddd;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 12px;
          color: #777;
        }
        .gold-text {
          color: #D4AF37;
        }
        .black-bg {
          background-color: #000;
          color: #fff;
          padding: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="gold-text">Alliance Volleyball Club</h1>
          <h2>Order No. ${order.id}</h2>
          <p>${orderDate}</p>
          <p>Thank you for your purchase!</p>
        </div>
        
        <div class="order-info">
          <h3>Order Total: $${order.total.toFixed(2)}</h3>
          <p>Payment Method: ${order.paymentId === "FREE" ? "Free Order" : "Credit Card"}</p>
        </div>
        
        <div class="pickup-info">
          <h3>Pickup Location</h3>
          <p>AVC - Nunawading Christian College<br>
          161 Central Rd<br>
          Nunawading VIC 3131<br>
          Australia</p>
          
          <h3>Pickup Instructions</h3>
          <p>Pick up at your respective training times from your coach. For any questions, reach out to alliance.vc7@gmail.com.</p>
        </div>
        
        <div class="billing-info">
          <h3>Billing Information</h3>
          <p>${order.paymentId === "FREE" ? "Free Order" : "Credit Card"}<br>
          ${order.customer.name}<br>
          ${order.customer.email}<br>
          ${order.customer.phone}</p>
        </div>
        
        <h3>Order Summary</h3>
        <table class="order-summary">
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems
              .map(
                (item: any) => `
              <tr>
                <td>
                  ${item.productName}<br>
                  Size: ${item.size || "N/A"}<br>
                  ${item.colorway ? `Colorway: ${item.colorway}<br>` : ""}
                  ${item.jerseyName ? `Jersey Name: ${item.jerseyName}<br>` : ""}
                  ${item.jerseyNumber ? `Jersey Number: ${item.jerseyNumber}<br>` : ""}
                  ${item.team ? `Team: ${item.team}` : ""}
                </td>
                <td>1</td>
                <td>$${Number.parseFloat(item.price).toFixed(2)}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="totals">
          <table>
            <tr>
              <td>Subtotal</td>
              <td align="right">$${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>In-store pick-up</td>
              <td align="right">$0.00</td>
            </tr>
            <tr>
              <td>Taxes included in item price (GST)</td>
              <td align="right">$${gst.toFixed(2)}</td>
            </tr>
            <tr class="total-row">
              <td>Total</td>
              <td align="right">$${order.total.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div class="footer">
          <p>All items inclusive of GST where applicable</p>
          <p>© ${new Date().getFullYear()} Alliance Volleyball Club. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
