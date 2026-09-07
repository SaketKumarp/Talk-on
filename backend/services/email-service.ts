import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Talk-on" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Talk-on OTP",

    html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>Talk-on Login</h2>

                <p>Your OTP is:</p>

                <h1 style="letter-spacing: 5px;">
                    ${otp}
                </h1>

                <p>
                    This OTP will expire in 5 minutes.
                </p>

                <p>
                    If you didn't request this OTP,
                    you can safely ignore this email.
                </p>
            </div>
        `,
  });

  console.log(`OTP email sent to ${email}`);
};
