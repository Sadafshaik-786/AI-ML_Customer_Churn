import os
import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression

DATA_PATH = os.environ.get("DATA_PATH", "data/WA_Fn-UseC_-Telco-Customer-Churn.csv")
MODEL_PATH = os.environ.get("MODEL_PATH", "models/churn_pipeline.pkl")

def load_data(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)

    # Rename columns to align with UI fields
    rename_map = {
        'SeniorCitizen':'seniorCitizen',
        'Partner':'partner',
        'Dependents':'dependents',
        'PhoneService':'phoneService',
        'MultipleLines':'multipleLines',
        'InternetService':'internetService',
        'OnlineSecurity':'onlineSecurity',
        'OnlineBackup':'onlineBackup',
        'DeviceProtection':'deviceProtection',
        'TechSupport':'techSupport',
        'StreamingTV':'streamingTV',
        'StreamingMovies':'streamingMovies',
        'PaperlessBilling':'paperlessBilling',
        'PaymentMethod':'paymentMethod',
        'MonthlyCharges':'monthlyCharges',
        'TotalCharges':'totalCharges',
    }
    df = df.rename(columns=rename_map)

    # Handle TotalCharges
    df["totalCharges"] = pd.to_numeric(df["totalCharges"], errors="coerce")
    df = df[df["tenure"] >= 0].copy()
    df["totalCharges"] = df["totalCharges"].fillna(df["totalCharges"].median())

    # Map SeniorCitizen 0/1 → Yes/No
    if df["seniorCitizen"].dtype != object:
        df["seniorCitizen"] = df["seniorCitizen"].map({0: "No", 1: "Yes"})

    # Map target
    df["Churn"] = df["Churn"].map({"No": 0, "Yes": 1})

    # Contract column fix
    if "contract" not in df.columns and "Contract" in df.columns:
        df = df.rename(columns={"Contract": "contract"})

    selected_cols = [
        "gender","seniorCitizen","partner","dependents","tenure","phoneService","multipleLines",
        "internetService","onlineSecurity","onlineBackup","deviceProtection","techSupport",
        "streamingTV","streamingMovies","contract","paperlessBilling","paymentMethod",
        "monthlyCharges","totalCharges","Churn"
    ]
    return df[selected_cols].copy()

def build_pipeline(categorical_cols, numeric_cols):
    preprocessor = ColumnTransformer(
        [("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols),
         ("num", StandardScaler(), numeric_cols)]
    )
    clf = LogisticRegression(max_iter=1000)
    return Pipeline([("pre", preprocessor), ("clf", clf)])

def train_and_save():
    df = load_data(DATA_PATH)
    X = df.drop(columns=["Churn"])
    y = df["Churn"]

    categorical_cols = [c for c in X.columns if c not in ["tenure","monthlyCharges","totalCharges"]]
    numeric_cols = ["tenure","monthlyCharges","totalCharges"]

    pipe = build_pipeline(categorical_cols, numeric_cols)
    pipe.fit(X, y)

    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(pipe, MODEL_PATH)
    print(f"✅ Saved model to {MODEL_PATH}")

if __name__ == "__main__":
    train_and_save()
