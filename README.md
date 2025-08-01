# Ngẫm - Web App Tạo Câu Nói Hay với Gemini AI

<div align="center">

![Ngẫm App Screenshot](https://github.com/user-attachments/assets/b8934aa2-ad61-40f2-8ede-34ef858d5bb8)

*Tạo câu nói hay từ cảm xúc của bạn*

</div>

## 🌟 Tổng quan

**Ngẫm** là một web app fullstack giúp bạn tạo ra những câu nói hay, ý nghĩa dựa trên cảm xúc hiện tại của bạn. Ứng dụng sử dụng công nghệ Gemini AI để sinh ra những câu nói phù hợp, được thiết kế với giao diện tối giản, hiện đại và responsive.

## ✨ Tính năng

### 🎯 Tính năng chính
- **Tạo câu nói từ cảm xúc**: Chọn từ 8 cảm xúc có sẵn hoặc tự nhập cảm xúc của bạn
- **Tích hợp Gemini AI**: Sử dụng AI để tạo ra câu nói phù hợp và ý nghĩa
- **Fallback thông minh**: Hệ thống câu nói mẫu khi chưa có API key
- **Caching thông minh**: Lưu cache trong 1 phút cho cùng cảm xúc

### 🎨 Giao diện & UX
- **Responsive design**: Tối ưu cho mọi thiết bị
- **Hiệu ứng fade-in**: Câu nói xuất hiện mượt mà
- **Giao diện tối giản**: Màu trắng với điểm nhấn xanh nhạt
- **Loading spinner**: Thông báo trạng thái khi đang tạo câu nói

### 📚 Quản lý câu nói
- **Lịch sử gần đây**: Xem 3 câu nói gần nhất
- **Yêu thích**: Lưu câu nói vào danh sách yêu thích
- **Tạo lại**: Tạo câu nói mới cho cùng cảm xúc
- **Chia sẻ**: Copy câu nói hoặc chia sẻ qua Web Share API

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 18** với TypeScript
- **TailwindCSS** cho styling
- **Custom hooks** cho state management
- **LocalStorage** cho persistence

### Backend
- **Node.js** với Express
- **Gemini AI API** cho sinh câu nói
- **In-memory caching** với Map
- **CORS & Helmet** cho bảo mật

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (v16 trở lên)
- npm hoặc yarn
- Gemini API key (tùy chọn)

### 1. Clone repository
```bash
git clone https://github.com/legiahoang1872/deep.git
cd deep
```

### 2. Cài đặt dependencies
```bash
npm run install-all
```

### 3. Cấu hình environment
```bash
cp .env.example .env
```

Chỉnh sửa file `.env` và thêm Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
REACT_APP_API_URL=http://localhost:5000
```

### 4. Chạy ứng dụng
```bash
# Chạy đồng thời frontend và backend
npm run dev

# Hoặc chạy riêng lẻ
npm run server  # Backend: http://localhost:5000
npm run client  # Frontend: http://localhost:3000
```

### 5. Build cho production
```bash
npm run build
```

## 🔑 Lấy Gemini API Key

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng nhập với tài khoản Google
3. Tạo API key mới
4. Copy và paste vào file `.env`

**Lưu ý**: Ứng dụng vẫn hoạt động với câu nói mẫu nếu chưa có API key.

## 📁 Cấu trúc dự án

```
deep/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MoodInput.tsx
│   │   │   ├── QuoteDisplay.tsx
│   │   │   └── QuoteHistory.tsx
│   │   ├── api.ts         # API service
│   │   ├── types.ts       # TypeScript types
│   │   └── App.tsx        # Main app component
│   ├── public/
│   └── package.json
├── server/                # Express backend
│   ├── index.js          # Main server file
│   └── package.json
├── package.json          # Root scripts
├── .env.example          # Environment template
└── README.md
```

## 🔄 API Documentation

### Endpoints

#### `GET /api/health`
Kiểm tra trạng thái server

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "geminiConfigured": true
}
```

#### `POST /api/quote`
Tạo câu nói từ cảm xúc

**Request:**
```json
{
  "mood": "vui vẻ"
}
```

**Response:**
```json
{
  "quote": "Hạnh phúc không phải là đích đến mà là cách chúng ta di chuyển.",
  "mood": "vui vẻ",
  "generated_at": "2025-01-01T00:00:00.000Z",
  "cached": false,
  "fallback": false
}
```

### Error Handling
- **400**: Thiếu hoặc sai định dạng mood
- **500**: Lỗi server hoặc API (trả về câu fallback)

## 🎭 Các cảm xúc có sẵn

- 😊 **Vui vẻ** - Câu nói tích cực, vui tươi
- 😢 **Buồn** - Câu nói an ủi, động viên
- 🔥 **Động lực** - Câu nói truyền cảm hứng
- 💕 **Lãng mạn** - Câu nói về tình yêu
- 🤔 **Sâu lắng** - Câu nói triết lý, suy ngẫm
- 😄 **Hài hước** - Câu nói vui nhộn
- 🤗 **An ủi** - Câu nói xoa dịu tâm hồn
- ✨ **Cảm hứng** - Câu nói về ước mơ, hoài bão

## 💡 Tính năng nâng cao

### LocalStorage
- Lưu lịch sử câu nói (key: `ngam-quote-history`)
- Lưu danh sách yêu thích (key: `ngam-favorites`)

### Caching
- Cache in-memory trong 1 phút cho mỗi mood
- Tự động xóa cache hết hạn
- Hiển thị indicator khi dùng cache

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Grid layout tự động điều chỉnh

## 🐛 Troubleshooting

### Lỗi thường gặp

**Frontend không kết nối được backend:**
```bash
# Kiểm tra backend có chạy không
curl http://localhost:5000/api/health

# Kiểm tra REACT_APP_API_URL trong .env
echo $REACT_APP_API_URL
```

**TailwindCSS không hoạt động:**
```bash
cd client
npm install -D tailwindcss@3.3.0 postcss@8.4.31 autoprefixer@10.4.16
```

**Gemini API không hoạt động:**
- Kiểm tra API key trong file `.env`
- Verify API key tại [Google AI Studio](https://makersuite.google.com/)
- Ứng dụng vẫn hoạt động với fallback quotes

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

## 📝 License

Dự án này sử dụng MIT License. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Thái Bình Dương**

---

<div align="center">

Được tạo với ❤️ và Gemini AI

</div>