from pydantic import BaseModel

class ChurnRequest(BaseModel):
    gender: str
    seniorCitizen: str
    partner: str
    dependents: str
    tenure: str
    phoneService: str
    multipleLines: str
    internetService: str
    onlineSecurity: str
    onlineBackup: str
    deviceProtection: str
    techSupport: str
    streamingTV: str
    streamingMovies: str
    contract: str
    paperlessBilling: str
    paymentMethod: str
    monthlyCharges: str
    totalCharges: str


class ChurnResponse(BaseModel):
    churn: bool
    probability: float
