# โปรเจกต์ Jira Demo



โปรเจกต์ Jira Demo  สร้างขึ้นเพื่อแสดงทักษะการพัฒนาเว็บไซต์ทั้งฝั่ง Design ระบบ,Database,Front-end และ Back-end 
- Diagram
- 🌐 **Front-end**: React + TypeScript  
- ⚙️ **Back-end**: Go (Golang)

---

## 📦 เริ่มต้นใช้งาน

### 1. โคลนโปรเจกต์จาก GitHub

```bash
git clone https://github.com/6110490023/jira-demo
cd jira-demo
```

---

## 🚀 วิธีการรันโปรเจกต์เพื่อดูผลงาน

### 🔹 ฝั่ง Front-end (React + TypeScript)

```bash
cd front-end
npm install
npm run dev
```

- ระบบ Front-end จะเปิดที่ `http://localhost:3000`
- โปรดเช็คว่ามี file .env หรือไม่เเละ Back-end URL เป็น  `http://localhost:8080/api`

---

### 🔸 ฝั่ง Back-end (Go)

```bash
cd back-end/cmd/api
go get
cd ../..
go run ./cmd/api
```
- โปรดเช็คว่ามี file .env หรือไม่
- ระบบ Back-end จะเปิดที่ `http://localhost:8080`
- document ของ Back-end สามารถดูใน link `http://localhost:8080/api/swagger/index.html` </br>
or`https://jira-demo.onrender.com/api/swagger/index.html`
---

## 🎯 วัตถุประสงค์ของโปรเจกต์

- เพื่อแสดงความสามารถในการตั้งค่าและพัฒนา Full-stack Application
- เพื่อใช้เป็นตัวอย่างผลงานใน Portfolio สำหรับการสมัครงานในสายงาน Software Developer

---

## 📁 โครงสร้างโปรเจกต์

```
jira-demo/
├── front-end/
└── back-end/         # โค้ดส่วนของ Backend (Go)
    └── cmd/api/      # จุดเริ่มต้นของแอปพลิเคชัน Go
```

---

## 🛠️ ความต้องการของระบบ

- Node.js (สำหรับรัน Front-end)
- Go (สำหรับรัน Back-end)

---

หากท่านมีคำถามเพิ่มเติมเกี่ยวกับโปรเจกต์นี้ หรือสนใจพูดคุยเพิ่มเติมเกี่ยวกับทักษะของผู้พัฒนา สามารถติดต่อได้ตามรายละเอียดในโปรไฟล์ GitHub ครับ 🙏


