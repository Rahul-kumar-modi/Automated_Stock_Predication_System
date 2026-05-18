from fastapi import APIRouter
import yfinance as yf

router = APIRouter(prefix="/stocks", tags=["Stocks"])


@router.get("/{ticker}")
def get_stock_data(ticker: str):
    stock = yf.Ticker(ticker)

    history = stock.history(period="1mo")

    data = history.reset_index().to_dict(orient="records")

    return {
        "ticker": ticker,
        "data": data
    }