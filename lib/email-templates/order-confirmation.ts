export function getOrderConfirmationEmail({
  orderId,
  customerName,
  orderItems,
  orderTotal,
  isFreeOrder = false,
  customerEmail,
}) {
  // Format items for display
  const itemsHtml = orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">
          <strong>${item.productName}</strong><br>
          ${item.colorway ? `Color: ${item.colorway}<br>` : ""}
          ${item.size ? `Size: ${item.size}<br>` : ""}
          ${item.jerseyName ? `Name: ${item.jerseyName}<br>` : ""}
          ${item.jerseyNumber ? `Number: ${item.jerseyNumber}<br>` : ""}
          ${item.team ? `Team: ${item.team}` : ""}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">
          ${item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
        </td>
      </tr>
    `,
    )
    .join("")

  // Create the HTML email
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
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
            background-color: #000;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .logo {
            max-width: 150px;
            margin-bottom: 10px;
          }
          .content {
            padding: 20px;
            background-color: #fff;
          }
          .footer {
            background-color: #f9f9f9;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th {
            background-color: #f3f4f6;
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
          }
          .total-row {
            font-weight: bold;
            background-color: #f9fafb;
          }
          .free-order-notice {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            padding: 10px;
            margin: 20px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Alliance Volleyball Club</h1>
            <p>Order Confirmation</p>
          </div>
          <div class="content">
            <p>Hello ${customerName},</p>
            <p>Thank you for your order! We've received your order and it's being processed.</p>
            
            ${
              isFreeOrder
                ? `
            <div class="free-order-notice">
              <p><strong>This is a free order.</strong> No payment was required.</p>
              <p>Your test jersey will be available for pickup at your team's training session.</p>
            </div>
            `
                : ""
            }
            
            <h2>Order Details</h2>
            <p><strong>Order Number:</strong> ${orderId}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            
            <h3>Items</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th style="text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr class="total-row">
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Total</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">
                    ${isFreeOrder ? "FREE" : `$${orderTotal.toFixed(2)}`}
                  </td>
                </tr>
              </tbody>
            </table>
            
            <h3>Delivery Information</h3>
            <p>Your order will be available for pickup at your team's training session. Please contact your team manager if you have any questions.</p>
            
            <p>If you have any questions about your order, please contact us at <a href="mailto:info@alliancevolleyball.club">info@alliancevolleyball.club</a>.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Alliance Volleyball Club. All rights reserved.</p>
            <p>This email was sent to ${customerEmail}</p>
          </div>
        </div>
      </body>
    </html>
  `

  // Create the plain text version
  const text = `
    Alliance Volleyball Club - Order Confirmation
    
    Hello ${customerName},
    
    Thank you for your order! We've received your order and it's being processed.
    
    ${isFreeOrder ? "This is a free order. No payment was required.\nYour test jersey will be available for pickup at your team's training session.\n" : ""}
    
    Order Details
    Order Number: ${orderId}
    Order Date: ${new Date().toLocaleDateString()}
    
    Items:
    ${orderItems
      .map(
        (item) => `
    - ${item.productName}
      ${item.colorway ? `Color: ${item.colorway}` : ""}
      ${item.size ? `Size: ${item.size}` : ""}
      ${item.jerseyName ? `Name: ${item.jerseyName}` : ""}
      ${item.jerseyNumber ? `Number: ${item.jerseyNumber}` : ""}
      ${item.team ? `Team: ${item.team}` : ""}
      Price: ${item.price === 0 ? "FREE" : `$${item.price.toFixed(2)}`}
    `,
      )
      .join("\n")}
    
    Total: ${isFreeOrder ? "FREE" : `$${orderTotal.toFixed(2)}`}
    
    Delivery Information:
    Your order will be available for pickup at your team's training session. Please contact your team manager if you have any questions.
    
    If you have any questions about your order, please contact us at info@alliancevolleyball.club.
    
    © ${new Date().getFullYear()} Alliance Volleyball Club. All rights reserved.
    This email was sent to ${customerEmail}
  `

  return { html, text }
}
