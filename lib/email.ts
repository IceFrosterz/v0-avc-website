import nodemailer from "nodemailer"

// Create a transporter using SMTP
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Function to send an order confirmation email
export async function sendOrderConfirmationEmail({
  orderId,
  customerEmail,
  customerName,
  orderItems,
  orderTotal,
  isFreeOrder = false,
}) {
  try {
    console.log(`Preparing to send order confirmation email to ${customerEmail}`)

    // Generate the email content
    const itemsText = orderItems
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
      .join("\n")

    const emailText = `
Alliance Volleyball Club - Order Confirmation

Hello ${customerName},

Thank you for your order! We've received your order and it's being processed.

${isFreeOrder ? "This is a free order. No payment was required.\nYour test jersey will be available for pickup at your team's training session.\n" : ""}

Order Details:
Order Number: ${orderId}
Order Date: ${new Date().toLocaleDateString()}

Items:
${itemsText}

Total: ${isFreeOrder ? "FREE" : `$${orderTotal.toFixed(2)}`}

Delivery Information:
Your order will be available for pickup at your team's training session. Please contact your team manager if you have any questions.

If you have any questions about your order, please contact us at info@alliancevolleyball.club.

© ${new Date().getFullYear()} Alliance Volleyball Club. All rights reserved.
    `

    // Send the email
    const info = await transporter.sendMail({
      from: `"Alliance Volleyball Club" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Order Confirmation #${orderId}`,
      text: emailText,
    })

    console.log(`Email sent: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
