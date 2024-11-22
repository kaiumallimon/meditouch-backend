const nodemailer = require('nodemailer');

// load the environment variables
const serverEmail = process.env.EMAIL;
const serverEmailPassword = process.env.EMAIL_PASSWORD;

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: serverEmail, // Your email address
        pass: serverEmailPassword // Your email password
    },
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * Function to send an email with an HTML body.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML body of the email.
 * @returns {Promise} Resolves if email is sent successfully, rejects otherwise.
 */
const sendMail = async (to, subject, html) => {
    const mailOptions = {
        from: `MediTouch <${serverEmail}>`, // Display name and sender email
        to: to,
        subject: subject,
        html: html // Use the `html` field for the HTML body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return { success: true, info: info.response };
    } catch (error) {
        console.error('Error occurred while sending email:', error.message);
        throw error;
    }
};

async function sendPassword(name, email, password){
    const data = {
        name: name,
        email: email
    }
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
          rel="stylesheet"
        />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login Information</title>
        <style>
          body {
            font-family: "Poppins", sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            max-height: 100%;
          }
          .container {
            background-color: #ffffff;
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #5c05ae;
            color: white;
            text-align: center;
            padding: 20px 0;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
            line-height: 1.6;
            color: #333;
          }
          .content h1 {
            font-size: 24px;
            margin-bottom: 20px;
          }
          .content p {
            font-size: 16px;
          }
          .credentials {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            padding: 10px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .credentials p {
            margin: 0;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999;
          }

          .support-email {
            color: rgb(0, 110, 255);
            font-weight: bold;
          }

          .team {
            color: #5c05ae;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>MediTouch</h2>
          </div>
          <div class="content">
            <h1>Hi ${data.name},</h1>
            <p>
              Welcome to MediTouch!<br />
              Here are your login credentials. This is an auto generated password,
              please change your password after login!
            </p>
            <div class="credentials">
              <p>Email: <span>${data.email}</span></p>
              <p>Password: <span>${password}</span></p>
            </div>
            <p>
              If you have any issues logging in, you can contact us -
              meditouch.bcrypt@gmail.com
            </p>
            <p>Best regards,<br /><span class="team">MediTouch</span></p>
          </div>
          <div class="footer">
            <p>&copy; 2024 MediTouch. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `;

    try {
        const response = await sendMail(data.email, 'Your Login Information', html);
        console.log('Response:', response);
    } catch (error) {
        console.error('Failed to send email:', error.message);
    }
}


async function sendVerificationCode(code, email) {
  // Validate input parameters
  if (!code || !email) {
      console.error('Verification code or email is missing.');
      return;
  }

  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
        rel="stylesheet"
      />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verification Code</title>
      <style>
        body {
          font-family: "Poppins", sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          max-height: 100%;
        }
        .container {
          background-color: #ffffff;
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #5c05ae;
          color: white;
          text-align: center;
          padding: 20px 0;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          line-height: 1.6;
          color: #333;
        }
        .content h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .content p {
          font-size: 16px;
        }
        .verification-code {
          background-color: #f8f8f8;
          border: 1px solid #ddd;
          padding: 10px;
          margin: 20px 0;
          border-radius: 4px;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #999;
        }
        .team {
          color: #5c05ae;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>MediTouch</h2>
        </div>
        <div class="content">
          <h1>Dear user,</h1>
          <p>
            Your password reset verification code is:
          </p>
          <div class="verification-code">
            ${code}
          </div>
          <p>
            If you have any issues, you can contact us at <a href="mailto:meditouch.bcrypt@gmail.com">meditouch.bcrypt@gmail.com</a>.
          </p>
          <p>Best regards,<br /><span class="team">MediTouch Team</span></p>
        </div>
        <div class="footer">
          <p>&copy; 2024 MediTouch. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
  `;

  try {
      // Send the email using the sendMail function
      const response = await sendMail(email, 'Your Verification Code', html);
      console.log('Verification email sent successfully:', response);
  } catch (error) {
      console.error('Failed to send verification email:', error.message);
  }
}



// Export the functions
module.exports = { sendMail, sendPassword, sendVerificationCode};
