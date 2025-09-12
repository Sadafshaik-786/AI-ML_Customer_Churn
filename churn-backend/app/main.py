import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .schemas import ChurnRequest, ChurnResponse
from .model import predict_one

# Allow all origins by default (or override with env variable)
ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "*").split(",")

app = FastAPI(title="Churn Predictor API", version="1.0.0")

# ✅ Enable CORS properly so frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in ALLOWED_ORIGINS if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],   # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],   # allow all headers
)

# Root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the Churn Prediction API 🚀"}

# Health check
@app.get("/health")
def health():
    return {"status": "ok"}

# Predict churn
@app.post("/predict", response_model=ChurnResponse)
def predict(req: ChurnRequest):
    churn, prob = predict_one(req.model_dump())
    return ChurnResponse(churn=churn, probability=prob)
