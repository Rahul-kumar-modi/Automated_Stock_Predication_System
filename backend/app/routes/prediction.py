from fastapi import APIRouter
from app.services.model_service import ModelService

import yfinance as yf
import numpy as np

router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"]
)

model = ModelService.load_model()

tickers = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "META",
    "TSLA",
    "NVDA",
    "JPM",
    "V",
    "DIS",
    "NFLX",
    "INTC",
    "AMD",
    "IBM",
    "ORCL",
    "BA",
    "KO",
    "PEP",
    "WMT",
    "MCD",
    "NKE",
    "CSCO",
    "XOM",
    "CVX",
    "GS",
    "CAT",
    "HD",
    "UNH",
    "PFE"
]


@router.get("/")
def predict():

    prices = []

    valid_tickers = []

    for ticker in tickers:

        try:

            stock = yf.Ticker(ticker)

            hist = stock.history(period="5d")

            if hist.empty:

                print(f"No data for {ticker}")

                prices.append(1)

                valid_tickers.append(ticker)

                continue

            latest_close = hist["Close"].iloc[-1]

            prices.append(float(latest_close))

            valid_tickers.append(ticker)

        except Exception as e:

            print(f"Error fetching {ticker}: {e}")

            prices.append(1)

            valid_tickers.append(ticker)

    while len(prices) < 29:
        prices.append(1)

    prices = np.array(prices)

    prices = prices / np.max(prices)

    observation = np.tile(prices, (37, 1))

    action, _states = model.predict(observation)

    print("Tickers:", len(valid_tickers))
    print("Predictions:", len(action))

    predictions = []

    portfolio_value = 1245000

    for i in range(min(len(valid_tickers), len(action))):

        weight = round(float(action[i]), 3)

        if weight > 0.7:
            signal = "Strong Buy"

        elif weight > 0.4:
            signal = "Buy"

        elif weight > 0.2:
            signal = "Hold"

        else:
            signal = "Sell"

        allocated_amount = round(
            portfolio_value * weight,
            2
        )

        predictions.append({
            "ticker": valid_tickers[i],
            "weight": weight,
            "signal": signal,
            "price": round(float(prices[i] * 1000), 2),
            "allocated_amount": allocated_amount
        })

    return {
        "predictions": predictions
    }