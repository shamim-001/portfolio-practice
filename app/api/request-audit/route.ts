import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { websiteUrl } = body

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 500 })
    }

    const data = await resend.emails.send({
      from: "SEO Audit Request <onboarding@resend.dev>",
      to: ["theshamimahsan@gmail.com"],
      subject: "New SEO Audit Request",
      text: `
        New SEO audit request received!
        
        Website URL: ${websiteUrl}
        
        Please review and prepare the audit report.
      `,
    })

    if (data.error) {
      throw new Error(data.error.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}

