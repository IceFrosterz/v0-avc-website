import nodemailer from "nodemailer"
import { generateOrderConfirmationEmail } from "./email-templates/order-confirmation"

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number.parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Function to send a test email
export async function sendTestEmail(to: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Alliance Volleyball Club" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Test Email from Alliance Volleyball Club",
      text: "This is a test email from Alliance Volleyball Club.",
      html: "<b>This is a test email from Alliance Volleyball Club.</b>",
    })

    console.log("Test email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending test email:", error)
    return { success: false, error }
  }
}

// Function to send order confirmation email
export async function sendOrderConfirmationEmail(order: any) {
  try {
    if (!order || !order.customer || !order.customer.email) {
      throw new Error("Invalid order data or missing customer email")
    }

    const htmlContent = generateOrderConfirmationEmail(order)

    const info = await transporter.sendMail({
      from: `"Alliance Volleyball Club" <${process.env.EMAIL_USER}>`,
      to: order.customer.email,
      subject: `Order Confirmation #${order.id}`,
      text: `Thank you for your order #${order.id} with Alliance Volleyball Club. Your order has been confirmed and will be available for pickup at your team's training.`,
      html: htmlContent,
    })

    console.log("Order confirmation email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending order confirmation email:", error)
    return { success: false, error }
  }
}
