# CINEMAX - PROJECT STRUCTURE

## Cấu Trúc Thư Mục Hiện Tại

```
cinemax/
├── app.json                          # Expo app config
├── App.tsx                           # App entry point
├── eas.json                          # EAS Build config
├── firebase-auth.d.ts                # Firebase type definitions
├── google-services.json              # Google services config
├── index.ts                          # Root index file
├── metro.config.js                   # Metro bundler config
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── ROADMAP.md                        # Project roadmap
├── PROJECT_STRUCTURE.md              # This file
│
├── assets/                           # Static assets
│   ├── Aboutus/                     # About us screen images
│   ├── Download/                    # Download screen images
│   ├── HomePage/                    # Home screen images
│   ├── LogSign/                     # Login/Sign up images
│   ├── Onboarding/                  # Onboarding images
│   ├── Popup_Logout/                # Logout popup images
│   ├── SearchPage/                  # Search screen images
│   ├── Splash/                      # Splash screen images
│   └── WishList/                    # Wishlist screen images
│
├── components/                       # Reusable components
│   ├── layout/
│   │   └── Banner.tsx               # Banner component
│   ├── modals/
│   │   └── LogOutModal.tsx          # Logout modal
│   ├── navigation/
│   │   ├── BottomTabs.tsx           # Bottom tab navigator
│   │   └── ProfileStack.tsx         # Profile stack navigator
│   └── ui/
│       ├── CategoryFilter.tsx       # Category filter component
│       ├── FloatingInput.tsx        # Floating input component
│       └── Card/
│           ├── Card.tsx             # General card component
│           ├── DownloadCard.tsx     # Download card with progress
│           ├── MovieRow.tsx         # Movie row component
│           └── WishlistCard.tsx     # Wishlist card component
│
├── data/                            # Static data & constants
│
├── hooks/                           # Custom React hooks
│   └── hooks.ts                     # Custom hooks collection
│
├── pages/                           # Screen components
│   ├── AboutUs.tsx
│   ├── AllMoviesPage.tsx
│   ├── AppContent.tsx
│   ├── DetailPage.tsx
│   ├── Download.tsx
│   ├── EditProfile.tsx
│   ├── ForgotPassword.tsx
│   ├── HelpFeed.tsx
│   ├── HomePage.tsx
│   ├── LogIn.tsx
│   ├── LogSign.tsx
│   ├── Onboarding.tsx
│   ├── PrivacyPage.tsx
│   ├── Profile.tsx
│   ├── SearchPage.tsx
│   ├── SignUp.tsx
│   ├── Splash.tsx
│   └── WishList.tsx
│
├── redux/                           # Redux store & slices
│   ├── store.ts                     # Redux store config
│   └── features/
│       ├── download/
│       │   ├── downloadSlice.ts     # Download state slice
│       │   └── downloadThunk.ts     # Download thunks
│       ├── user/
│       │   ├── userSlice.ts         # User state slice
│       │   └── useSelectors.ts      # User selectors
│       └── wishList/
│           ├── wishlistThunk.ts     # Wishlist thunks
│           └── wishSlice.ts         # Wishlist state slice
│
├── services/                        # API & external services
│   ├── firebase.ts                  # Firebase initialization & services
│   └── tmdb.ts                      # TMDB API service
│
└── types/                           # TypeScript type definitions
    └── navigation.ts                # Navigation types
```

## Mô Tả Các Thư Mục Chính

### 📁 `assets/`
- Chứa tất cả hình ảnh tĩnh, icon, và resources của app
- Được tổ chức theo screens để dễ quản lý

### 📁 `components/`
- Chứa các component tái sử dụng (reusable components)
- Chia thành: `layout`, `modals`, `navigation`, `ui`
- `Card/` chứa các loại card component khác nhau

### 📁 `data/`
- Chứa static data, constants, mock data
- _Hiện tại trống - cần setup_

### 📁 `hooks/`
- Chứa custom React hooks
- Tập trung quản lý logic tái sử dụng

### 📁 `pages/`
- Chứa các screen components (views)
- Mỗi file tương ứng với một screen trong app

### 📁 `redux/`
- Redux store configuration
- `features/` chứa các slice:
  - **download/**: Quản lý state downloads
  - **user/**: Quản lý state user
  - **wishList/**: Quản lý state wishlist

### 📁 `services/`
- Chứa các service để gọi API hoặc services bên ngoài
- `firebase.ts`: Firebase auth, Firestore
- `tmdb.ts`: TMDB API calls

### 📁 `types/`
- Chứa TypeScript type definitions
- `navigation.ts`: Navigation parameter types

## Quy Ước Đặt Tên

| Loại | Convention | Ví dụ |
|------|-----------|--------|
| Component | PascalCase | `DetailPage.tsx`, `DownloadCard.tsx` |
| File | PascalCase hoặc camelCase | `hooks.ts`, `tmdb.ts` |
| Folder | camelCase | `redux/`, `components/`, `services/` |
| Redux | Slice names | `downloadSlice.ts` |

## Dependencies Cần Kiểm Tra

- React Native / Expo
- Redux Toolkit
- Firebase (Auth, Firestore)
- Navigation (React Navigation)
- TypeScript
- Axios hoặc fetch API (cho TMDB)

---

## Ghi Chú

- Cấu trúc hiện tại khá tốt, cần cải thiện:
  - Thêm `constants/` folder cho constants
  - Thêm `utils/` folder cho utility functions
  - Thêm `api/` folder tách riêng API calls
  - Chuẩn hóa Redux folder structure
