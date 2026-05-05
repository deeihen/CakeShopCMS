import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, address, notes, paymentMethod, items, total } = body

    const orderRows = items.map((item: any) => {
      const price = item.selectedSize?.price ?? item.product.price
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f0e0e0;">${item.product.name}${item.selectedSize ? ` (${item.selectedSize.size})` : ''}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0e0e0;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0e0e0;text-align:right;">₱${(price * item.quantity).toLocaleString()}</td>
        </tr>
      `
    }).join('')

    // Email to SHOP OWNER
    await transporter.sendMail({
      from: `"CakeShop Orders" <${process.env.GMAIL_USER}>`,
      to: process.env.SHOP_EMAIL,
      replyTo: email,
      subject: `🎂 New Order from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff8f0;padding:32px;border-radius:16px;">
          <h1 style="color:#5C3D2E;font-size:28px;margin-bottom:4px;">🎂 New Cake Order!</h1>
          <p style="color:#F4A7B9;margin-bottom:24px;">You have a new order to confirm.</p>

          <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;">
            <h2 style="color:#5C3D2E;font-size:16px;margin-bottom:12px;">Customer Details</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;color:#444;">
              <tr><td style="padding:4px 0;color:#999;width:140px;">Name</td><td><strong>${name}</strong></td></tr>
              <tr><td style="padding:4px 0;color:#999;">Email</td><td>${email}</td></tr>
              <tr><td style="padding:4px 0;color:#999;">Phone</td><td>${phone}</td></tr>
              <tr><td style="padding:4px 0;color:#999;">Address</td><td>${address || 'For pickup'}</td></tr>
              <tr><td style="padding:4px 0;color:#999;">Payment</td><td>${paymentMethod.toUpperCase()}</td></tr>
            </table>
          </div>

          <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;">
            <h2 style="color:#5C3D2E;font-size:16px;margin-bottom:12px;">Order Items</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <thead>
                <tr style="background:#FFF0F5;">
                  <th style="padding:8px 12px;text-align:left;color:#5C3D2E;">Item</th>
                  <th style="padding:8px 12px;text-align:center;color:#5C3D2E;">Qty</th>
                  <th style="padding:8px 12px;text-align:right;color:#5C3D2E;">Price</th>
                </tr>
              </thead>
              <tbody>${orderRows}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding:12px;text-align:right;font-weight:bold;color:#5C3D2E;">TOTAL</td>
                  <td style="padding:12px;text-align:right;font-weight:bold;color:#F4A7B9;font-size:18px;">₱${total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          ${notes ? `
          <div style="background:#FFF0F5;border-radius:12px;padding:16px;margin-bottom:20px;">
            <p style="color:#5C3D2E;font-weight:bold;margin:0 0 4px;">📝 Special Notes</p>
            <p style="color:#666;margin:0;font-size:14px;">${notes}</p>
          </div>` : ''}

          <p style="color:#999;font-size:12px;text-align:center;">
            Reply to this email to contact the customer directly at ${email}
          </p>
        </div>
      `,
    })

    // Confirmation email to CUSTOMER
    await transporter.sendMail({
      from: `"CakeShop" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `🎂 We received your order, ${name}!`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff8f0;padding:32px;border-radius:16px;">
          <h1 style="color:#5C3D2E;font-size:28px;margin-bottom:4px;">Thank you, ${name}! 🎉</h1>
          <p style="color:#F4A7B9;margin-bottom:24px;">We've received your order and will confirm it shortly.</p>

          <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;">
            <h2 style="color:#5C3D2E;font-size:16px;margin-bottom:12px;">Your Order Summary</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <thead>
                <tr style="background:#FFF0F5;">
                  <th style="padding:8px 12px;text-align:left;color:#5C3D2E;">Item</th>
                  <th style="padding:8px 12px;text-align:center;color:#5C3D2E;">Qty</th>
                  <th style="padding:8px 12px;text-align:right;color:#5C3D2E;">Price</th>
                </tr>
              </thead>
              <tbody>${orderRows}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding:12px;text-align:right;font-weight:bold;color:#5C3D2E;">TOTAL</td>
                  <td style="padding:12px;text-align:right;font-weight:bold;color:#F4A7B9;font-size:18px;">₱${total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style="background:white;border-radius:12px;padding:20px;margin-bottom:20px;">
            <h2 style="color:#5C3D2E;font-size:16px;margin-bottom:8px;">What happens next?</h2>
            <p style="color:#666;font-size:14px;margin:4px 0;">1. We'll review your order and contact you within a few hours.</p>
            <p style="color:#666;font-size:14px;margin:4px 0;">2. We'll send you payment instructions.</p>
            <p style="color:#666;font-size:14px;margin:4px 0;">3. Once confirmed, your cake gets baked fresh! 🎂</p>
          </div>

          <p style="color:#999;font-size:12px;text-align:center;">
            Questions? Reply to this email or contact us directly.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}