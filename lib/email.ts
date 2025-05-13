import { generateOrderConfirmationEmail } from "./email-templates/order-confirmation"

// Check if we're in a preview environment
const isPreviewEnvironment = process.env.NODE_ENV === "development" || typeof window !== "undefined"

// Mock email service for preview environment
const mockSendEmail = async (options: any) => {
  console.log("MOCK EMAIL SERVICE - Email would be sent with the following options:")
  console.log("From:", options.from)
  console.log("To:", options.to)
  console.log("Subject:", options.subject)
  console.log("Text:", options.text)
  console.log("HTML:", options.html)
  return { messageId: "mock-message-id-" + Date.now() }
}

// Real email service for production
const createRealEmailService = () => {
  try {
    // Only import nodemailer in production environment
    const nodemailer = require("nodemailer")

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    return {
      sendMail: async (options: any) => {
        return await transporter.sendMail(options)
      },
    }
  } catch (error) {
    console.error("Error creating email transporter:", error)
    // Fallback to mock if real service fails
    return { sendMail: mockSendEmail }
  }
}

// Choose the appropriate email service
const emailService = isPreviewEnvironment ? { sendMail: mockSendEmail } : createRealEmailService()

// Function to send a test email
export async function sendTestEmail(to: string) {
  try {
    console.log("Attempting to send test email to:", to)
    console.log("Email configuration:", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      user: process.env.EMAIL_USER,
      // Don't log the actual password
      password: process.env.EMAIL_PASSWORD ? "********" : undefined,
    })

    const info = await emailService.sendMail({
      from: `"Alliance Volleyball Club" <${process.env.EMAIL_USER || "noreply@alliancevolleyball.com"}>`,
      to,
      subject: "Test Email from Alliance Volleyball Club",
      text: "This is a test email from Alliance Volleyball Club.",
      html: "<b>This is a test email from Alliance Volleyball Club.</b>",
    })

    console.log("Test email sent:", info.messageId)
    console.log("Full email info:", info)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending test email:", error)
    return { success: false, error }
  }
}

// Ensure the email service doesn't filter out any orders based on price or type

// Function to send order confirmation email
export async function sendOrderConfirmationEmail(order: any) {
  try {
    if (!order || !order.customer || !order.customer.email) {
      throw new Error("Invalid order data or missing customer email")
    }

    // Generate email content regardless of order type
    const htmlContent = generateOrderConfirmationEmail(order)

    const info = await emailService.sendMail({
      from: `"Alliance Volleyball Club" <${process.env.EMAIL_USER || "noreply@alliancevolleyball.com"}>`,
      to: order.customer.email,
      subject: `Order Confirmation #${order.id}`,
      text: `Thank you for your order #${order.id} with Alliance Volleyball Club. Your order has been confirmed and will be available for pickup at your team's training.`,
      html: htmlContent,
    })

    console.log("Order confirmation email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending order confirmation email:", error)
    return { success: false, error: error.message }
  }
}
