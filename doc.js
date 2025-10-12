/**
 * extensionless: để giúp import không cần thêm đuôi js
 * nodemon: để load lại server khi có code thay đổi
 *
 * Tương tác DB
 * mysql2: để tương tác với db (không phải là ORM) là thư viện đã có từ rất lâu
 * sequelize: ORM tương tác với db
 * sequelize-auto: DATABASE FIRST để kéo table đã tồn tại bên trong database vào code (tự tạo model, ...)
 * prisma: ORM để tương tác với db, khuyên dùng vì đơn giản và hiểu quả
 *       - npx prisma init: khởi tạo 1 lần
 *       - npx prisma db pull : kéo db vào code (sẽ chạy khi cần cập nhật)
 *       - npx prisma generate: tạo ra object để chấm lấy table (sẽ chạy khi cần cập nhật)
 *       - npm run prisma (cap nhat lai model trong prisma khi o db co su thay doi) (phai cai npx prisma db pull && npx prisma generate)
 *
 * dotenv: nạp biến từ file .env vào process.env
 *
 * cors: cho phép FE nào? sử dụng (API) lấy dữ liệu
 *
 * bcrypt: mã hoá password (bắt buộc)
 *
 * jsonwebtoken: tạo token
//  * Cú phá generate code nestjs
 *  nest g resource modules/modules-system/token
 */
