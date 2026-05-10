# CINEMAX APP - ROADMAP HOÀN THIỆN

## PHẦN 1: HOÀN THIỆN APP CINEMAX

### 1.1 Filter ở Search
- [ ] Ấn icon filter → hiện modal filter từ dưới lên
- [ ] Filter theo Rating — 6+, 7+, 8+, 9+
- [ ] Filter theo Year — 2020, 2021, 2022, 2023, 2024
- [ ] Filter theo Sort — Popularity, Top Rated, Newest
- [ ] Ấn Apply → filter kết quả search
- [ ] Ấn Reset → xóa filter

### 1.2 Test Toàn App
- [ ] Đăng ký tài khoản mới
- [ ] Đăng nhập, đăng xuất
- [ ] Wishlist sync đúng chưa
- [ ] Edit profile lưu đúng chưa
- [ ] Navigate không bị lỗi
- [ ] Chạy trên điện thoại thật

---

## PHẦN 2: UPLOAD AVATAR

- [ ] Cài Firebase Storage
- [ ] Cho user chọn ảnh từ thư viện (đã có expo-image-picker)
- [ ] Upload ảnh lên Firebase Storage
- [ ] Lưu URL vào Firestore
- [ ] Hiện ảnh thật ở Profile và HomePage thay vì default avatar
- [ ] Hiện loading khi đang upload

---

## PHẦN 3: BUILD APK

- [ ] Cài EAS CLI
- [ ] Tạo file eas.json
- [ ] Build APK preview
- [ ] Download APK
- [ ] Cài lên điện thoại thật
- [ ] Test lại toàn bộ trên APK

---

## PHẦN 4: TYPESCRIPT NÂNG CAO

- [ ] Generic types
- [ ] Utility types — Partial, Required, Pick, Omit
- [ ] Type cho navigation params chuẩn hơn
- [ ] Type cho API response TMDB
- [ ] Xóa toàn bộ `any` trong code

---

## PHẦN 5: PERFORMANCE

- [ ] Memo — tránh render lại không cần thiết
- [ ] useCallback — tránh tạo lại function
- [ ] useMemo — tránh tính toán lại
- [ ] FlatList optimization
- [ ] Image caching với FastImage

---

## PHẦN 6: CLEAN ARCHITECTURE

- [ ] Chuẩn hóa folder structure
- [ ] Tách custom hooks
- [ ] Tách services
- [ ] Tách constants
- [ ] Xóa code thừa, comment thừa

---

## PHẦN 7: NODE.JS + EXPRESS

- [ ] Cài Node.js, khởi tạo project
- [ ] Tạo server cơ bản
- [ ] Viết REST API:
  - [ ] POST /auth/register
  - [ ] POST /auth/login
  - [ ] GET /users/:id/profile
  - [ ] PUT /users/:id/profile
  - [ ] GET /users/:id/wishlist
  - [ ] POST /users/:id/wishlist
  - [ ] DELETE /users/:id/wishlist/:movieId
- [ ] Error handling middleware
- [ ] CORS, Body parser

---

## PHẦN 8: MONGODB + MONGOOSE

- [ ] Tạo MongoDB Atlas
- [ ] Connect với Express
- [ ] Tạo Schema User
- [ ] Tạo Schema Wishlist
- [ ] Viết CRUD đầy đủ

---

## PHẦN 9: JWT AUTHENTICATION

- [ ] Hash password với Bcrypt
- [ ] Tạo JWT token khi đăng nhập
- [ ] Verify token middleware
- [ ] Refresh token
- [ ] Bảo vệ route cần đăng nhập

---

## PHẦN 10: DEPLOY BACKEND

- [ ] Push code lên Github
- [ ] Deploy lên Render hoặc Railway
- [ ] Connect MongoDB Atlas
- [ ] Test API bằng Postman

---

## PHẦN 11: CONNECT APP VỚI BACKEND MỚI

- [ ] Thay Firebase Auth bằng JWT tự viết
- [ ] Thay Firestore bằng MongoDB API
- [ ] Cập nhật toàn bộ API call trong app
- [ ] Test toàn bộ app với backend mới

---

## PHẦN 12: PUBLISH STORE (Tùy Chọn)

- [ ] Tạo tài khoản Google Play Developer
- [ ] Build AAB
- [ ] Upload lên Play Store
- [ ] Điền thông tin, screenshot
- [ ] Submit review

---

## THỨ TỰ ƯU TIÊN

| Thứ Tự | Phần                                  | Trạng Thái |
|--------|---------------------------------------|------------|
| 1      | Filter Search                         |  Chưa làm |
| 2      | Test toàn app                         |  Chưa làm |
| 3      | Upload avatar                         |  Chưa làm |
| 4      | Build APK                             |  Chưa làm |
| 5      | TypeScript + Performance + Clean code |  Chưa làm |
| 6      | Node.js + Express                     |  Chưa làm |
| 7      | MongoDB + Mongoose                    |  Chưa làm |
| 8      | JWT Authentication                    |  Chưa làm |
| 9      | Deploy backend                        |  Chưa làm |
| 10     | Connect app với backend mới           |  Chưa làm |
| 11     | Publish Store                         |  Tùy chọn |