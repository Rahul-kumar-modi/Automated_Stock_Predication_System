from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.stocks import router as stock_router
from app.routes.training import router as training_router
from app.routes.prediction import router as prediction_router
from app.routes.portfolio import router as portfolio_router

app = FastAPI(
    title="AI Portfolio Management API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock_router)
app.include_router(training_router)
app.include_router(prediction_router)
app.include_router(portfolio_router)


@app.get("/")
def home():
    return {
        "message": "AI Portfolio Backend Running"
    }