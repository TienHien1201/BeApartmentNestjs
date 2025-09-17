FROM node:24.1.0-alpine AS build

WORKDIR /app

# Lí do cài package trước rồi mới đi coppy src vào mà có thể làm gọn hơn là coppy src vào thì nó đã có package rồi là do tận dụng tính năng cache của docker sau khi build lần đầu giúp những lần sau build nhanh hơn và nếu ta chỉ sửa code k cài thư viện gì thì có cache nó chỉ build src lại cái thay đổi k cài lại package   
# Đây là cài package
COPY package.json ./

RUN npm install

# Đây là coppy src vào
COPY . .

RUN npx prisma generate


RUN npm run build

# Xóa các thư viện nằm trong devDependencies vì các thư viện ở devDependencies chỉ sử dụng khi chúng ta dev
RUN npm prune --production


CMD ["node", "dist/main"]

FROM node:24.1.0-alpine AS start

WORKDIR /app

COPY --from=build ./app/dist ./dist
COPY --from=build ./app/generated ./generated
COPY --from=build ./app/node_modules ./node_modules
COPY --from=build ./app/package.json ./package.json
CMD ["node", "dist/main"]
# 2.2GB
# 1.2GB
# 1.54GB
# 470MB