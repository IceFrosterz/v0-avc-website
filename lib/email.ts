import nodemailer from "nodemailer"
import { getOrderConfirmationEmail } from "./email-templates/order-confirmation"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
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

    // Generate the email HTML
    const { html, text } = getOrderConfirmationEmail({
      orderId,
      customerName,
      orderItems,
      orderTotal,
      isFreeOrder,
    })

    // Send the email
    const info = await transporter.sendMail({
      from: `"Alliance Volleyball Club" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Order Confirmation #${orderId}`,
      text,
      html,
    })

    console.log(`Email sent: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

// Function to send a test email
export async function sendTestEmail(to: string) {
  try {
    console.log(`Sending test email to ${to}`)

    // Send the email
    const info = await transporter.sendMail({
      from: `"Alliance Volleyball Club" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Test Email from Alliance Volleyball Club",
      text: "This is a test email from Alliance Volleyball Club.",
      html: "<p>This is a test email from Alliance Volleyball Club.</p>",
    })

    console.log(`Test email sent: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending test email:", error)
    throw error
  }
}
