# 📞 Telecom Customer Churn Prediction

🚀 **AI-powered Churn Prediction System** that helps telecom companies identify customers likely to discontinue their service.  
This project integrates a **Machine Learning model (Random Forest)** with a **FastAPI backend** and a **React + TypeScript frontend (Lovable UI)** for real-time churn risk analysis.



## 🧠 Project Overview

Customer churn directly impacts business revenue — predicting it early allows companies to take preventive action.

This project predicts **whether a telecom customer is likely to churn** based on various attributes such as:
- Contract type  
- Monthly & total charges  
- Internet service  
- Payment method  
- Demographics (gender, senior citizen, etc.)

✅ **Tech Stack Used:**
- **Frontend:** React + TypeScript + Vite + ShadCN UI  
- **Backend:** FastAPI (Python)  
- **Model:** Random Forest Classifier (trained with Telco Customer Dataset)  
- **Communication:** REST API (JSON-based)  
- **Version Control:** Git + GitHub  
- **Optional Deployment:** Render / Vercel / AWS / Railway  


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/yourusername/churn-prediction.git
cd churn-prediction


2️⃣ Backend Setup (FastAPI)

Copy code
cd churn-backend
python -m venv .venv
.venv\Scripts\activate   # (Windows)
# or source .venv/bin/activate (Mac/Linux)

pip install -r requirements.txt
Run the Backend:


uvicorn app.main:app --reload --port 9000
✅ Once started, open:


http://127.0.0.1:9000
You should see:

{"message": "Welcome to the Churn Prediction API 🚀"}

3️⃣ Frontend Setup (React + Vite)

cd churn-frontend
npm install
npm run dev
✅ Visit:

arduino
Copy code
http://localhost:5173/
You’ll see a user-friendly interface where you can input customer details and get real-time churn predictions.

### 🔄 Workflow:

### 🧩 Step 1 — Data & Model
Trained a Random Forest model using the Telco Customer Churn dataset (Kaggle).

Features include service type, contract details, and payment history.

Model outputs:

churn: Yes/No

probability: Confidence score (0–100%)

### ⚙️ Step 2 — Backend (FastAPI)
Serves the model using /predict API.

Handles input validation with Pydantic Schemas (schemas.py).

Enables CORS for frontend access.

Example request:

json
Copy code
POST /predict
{
  "gender": "Female",
  "seniorCitizen": "No",
  "partner": "Yes",
  "dependents": "No",
  "tenure": 24,
  "phoneService": "Yes",
  "multipleLines": "No",
  "internetService": "Fiber optic",
  "onlineSecurity": "No",
  "onlineBackup": "Yes",
  "deviceProtection": "Yes",
  "techSupport": "No",
  "streamingTV": "Yes",
  "streamingMovies": "Yes",
  "contract": "Month-to-month",
  "paperlessBilling": "Yes",
  "paymentMethod": "Electronic check",
  "monthlyCharges": 75.35,
  "totalCharges": 2000.5
}
Response:

json
Copy code
{
  "churn": "Yes",
  "probability": 82.4
}


### 🖥️ Step 3 — Frontend (React)
Collects user input through a multi-step form.

Sends JSON data to FastAPI endpoint.

Displays churn prediction result with color-coded visuals:

🔴 High Risk — Likely to churn

🟢 Safe — Not likely to churn

🌍 Real-Time Applications
💼 Telecom Industry:

Identify at-risk customers and offer personalized retention plans.

### 🛍️ E-commerce Platforms:

Predict customers likely to stop shopping and trigger targeted discounts.

### 🏦 Banking & Finance:

Forecast account closures or inactive users.

### 🎮 Gaming Industry:

Detect players likely to stop playing and offer engagement rewards.

### 🧰 Skills Demonstrated
Machine Learning (Random Forest, Feature Engineering)

Python (pandas, scikit-learn, joblib)

FastAPI (RESTful API, Pydantic validation)

React + TypeScript + Vite

Git, GitHub version control

API Integration & CORS setup

### 🧪 Testing the API
Run locally or test using Postman / cURL:


curl -X POST "http://127.0.0.1:9000/predict" \
     -H "Content-Type: application/json" \
     -d "{ \"gender\": \"Male\", \"seniorCitizen\": \"No\", ... }"

### 🚀 Deployment Guide (Optional)
Deploy Backend (FastAPI):
Use Render, Railway, or AWS EC2.

Ensure model file (model.joblib) is included.

Update CORS origins to match frontend URL.

Deploy Frontend:
Build React app:


npm run build
Deploy on Vercel, Netlify, or GitHub Pages.

Set backend API URL in environment file (.env):

VITE_API_URL=https://your-backend.onrender.com

### 🏁 Conclusion
This project shows how Machine Learning + Web Integration can provide actionable business insights.
With further optimization, it can help reduce churn, increase customer retention, and drive business growth across industries.

### 👨‍💻 Author
Naseem Sadaf Shaik


