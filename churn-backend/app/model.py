import os
import joblib
import pandas as pd

MODEL_PATH = os.environ.get("MODEL_PATH", "models/churn_pipeline.pkl")
_model = None

def get_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model not found at {MODEL_PATH}. Train it first with: python -m app.train"
            )
        _model = joblib.load(MODEL_PATH)
    return _model

def predict_one(payload: dict) -> tuple[str, int]:
    model = get_model()
    df = pd.DataFrame([payload])

    # Ensure numeric types
    for col in ["tenure", "monthlyCharges", "totalCharges"]:
        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0.0)

    proba = float(model.predict_proba(df)[0, 1])
    label = "Yes" if proba >= 0.5 else "No"
    pct = int(round(proba * 100))
    return label, pct
