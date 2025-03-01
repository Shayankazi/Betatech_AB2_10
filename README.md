# 🚀 PII Detection System

## **🔍 Project: Identification of Personally Identifiable Information (PII) in Documents and Data**
### **Hackathon Submission - PS10**

### 📌 **Overview**
The **PII Detection System** is an AI-powered tool designed to identify Personally Identifiable Information (PII) such as names, phone numbers, email addresses, and more in unstructured text documents. This project aims to enhance data privacy by detecting and redacting sensitive information automatically.

---
## **🛠️ Tech Stack**

### **Frontend (React.js)**
- React.js (with Vite)
- Tailwind CSS for UI Styling
- Axios for API Communication

### **Backend (Flask API)**
- Flask (Python-based lightweight web framework)
- SpaCy (Natural Language Processing for entity detection)
- Regular Expressions (Regex for pattern matching PII)

### **Database (Optional - for PII Storage & Logs)**
- PostgreSQL / SQLite (for logging detections)

### **Deployment**
- **Frontend**: Vercel / Netlify
- **Backend**: Render / AWS / Heroku

---
## **📂 Folder Structure**
```
pii-detection/
│── backend/           # Flask API Backend
│   │── app.py         # Main Flask application
│   │── models/        # NLP & PII Detection models
│   │── requirements.txt
│
│── frontend/          # React.js Frontend
│   │── src/
│   │   │── components/
│   │   │── App.js     # Main Frontend UI
│   │── package.json
│
│── README.md          # Project Documentation
```
---
## **🚀 Features**
✅ Detects **Emails, Phone Numbers, Names, Locations, and Organizations**
✅ **Text Highlighting** for detected PII
✅ **Secure API Endpoint** for text analysis
✅ **File Upload Support** (PDF, CSV, JSON - upcoming feature)
✅ **Fast & Lightweight** (Optimized NLP processing)

---
## **⚙️ Installation & Setup**

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/Shayankazi/pii-detection.git
cd pii-detection
```

### **2️⃣ Setup Backend (Flask API)**
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Server will run at **http://localhost:5000**

### **3️⃣ Setup Frontend (React.js UI)**
```bash
cd frontend
npm install
npm start
```
Frontend will run at **http://localhost:3000**

---
## **🎯 How to Use**
1. Enter any text containing PII in the input box.
2. Click **"Detect PII"**.
3. Detected PII will be **highlighted** in red.

---
## **📌 API Endpoint (Backend)**
**POST /detect_pii**
```json
{
  "text": "John Doe's email is john.doe@email.com"
}
```
✅ **Response:**
```json
{
  "pii_detected": [
    { "type": "NAME", "text": "John Doe" },
    { "type": "EMAIL", "text": "john.doe@email.com" }
  ]
}
```

---
## **🔮 Future Enhancements**
- 📝 **File Upload Support (PDF, CSV, JSON) for bulk processing**
- 🔒 **Redaction Mode** to automatically replace PII with placeholders
- 📊 **Dashboard with analytics & visualization**
- 🛠️ **Integration with Cloud Storage (AWS S3, GCP, Azure)**

---
## **🤝 Contributing**
Want to contribute? Feel free to fork the repo and submit a PR! 🎯

---
## **📞 Contact**
📧 Email: **shayankazi147@gmail.com**  
🔗 GitHub: **https://github.com/Shayankazi/pii-detection**

🚀 *Built for Hackathon 2025 - Protecting Privacy with AI!* 🔥

