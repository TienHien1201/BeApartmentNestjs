import * as nodemailer from 'nodemailer';

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'phamtienhien08072018@gmail.com',
    pass: 'gqqrdaxprykasskf',
  },
});

// Wrap in an async IIFE so we can use await.

export const sendMail = async (
  to: string,
  typeAccess?: string,
  fullName?: string,
) => {
  const isLogin = typeAccess === 'login';

  const info = await transporter.sendMail({
    from: '"Hien CNTT 👻" <tienhien.cntt@gmail.com>',
    to: to,
    subject: isLogin ? 'Cảnh báo đăng nhập' : 'Thông báo đăng ký',
    text: isLogin
      ? 'Cảnh báo đăng nhập: tài khoản của bạn vừa mới thao tác đăng nhập.'
      : 'Thông báo đăng ký: tài khoản của bạn đã đăng ký thành công.',
    html: `
  <div>
    <p style="color: ${isLogin ? 'red' : 'green'}">
      ${isLogin ? 'Cảnh báo đăng nhập' : 'Thông báo đăng ký'}
    </p>
    <p>
      ${
        fullName
          ? `Chào mừng <b>${fullName}</b>, tài khoản của bạn vừa mới thao tác`
          : 'Tài khoản của bạn vừa mới thao tác'
      }
      <b>
        ${
          isLogin
            ? 'đăng nhập vào Apartment Business'
            : 'đăng ký thành công tài khoản Apartment Business'
        }.
      </b>
    </p>
  </div>
`,
  });

  console.log('Message sent:', info.messageId);
};
