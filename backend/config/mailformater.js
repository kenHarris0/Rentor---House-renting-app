

 const signupmail=` <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Welcome to Rentor</title>
    </head>
    <body style="margin:0;padding:0;font-family:Arial, sans-serif;background:#f5f7fb;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td align="center" style="padding:30px;">
            <table width="600" style="background:#ffffff;border-radius:10px;overflow:hidden;">
              <!-- Header -->
              <tr>
                <td style="background:#4f8cff;color:#ffffff;padding:20px;text-align:center;font-size:22px;font-weight:bold;">
                  Welcome to Rentor 🎉
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td style="padding:30px;text-align:left;color:#333333;font-size:16px;line-height:24px;">
                  <p style="margin:0 0 15px;">Hi <strong>{{username}}</strong>,</p>
                  <p style="margin:0 0 15px;">
                    Thank you for signing up with <b>Rentor</b>. We're excited to have you on board!
                  </p>
                  <p style="margin:0 0 15px;">
                    Here are your account details:
                  </p>
                  <ul style="margin:0 0 15px;padding-left:20px;">
                    <li><b>Name:</b>{{username}}</li>
                    <li><b>Email:</b>{{useremail}}</li>
                  </ul>
                  <p style="margin:0;">We hope you enjoy using Rentor 🚀</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding:20px;text-align:center;font-size:12px;color:#777777;">
                  © 2025 Rentor. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `

  module.exports=signupmail