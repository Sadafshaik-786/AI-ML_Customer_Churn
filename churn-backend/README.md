# Churn Predictor Backend (FastAPI)

## Quickstart (local)

```bash
# 1. Create & activate venv
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Train model
python -m app.train

# 4. Run API
uvicorn app.main:app --reload --port 8000
