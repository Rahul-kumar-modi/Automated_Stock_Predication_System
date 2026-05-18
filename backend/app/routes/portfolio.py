from fastapi import APIRouter

router = APIRouter(
    prefix="/portfolio",
    tags=["Portfolio"]
)


@router.get("/")
def get_portfolio():

    portfolio_value = 1245000

    allocations = [
        {
            "ticker": "AAPL",
            "weight": 25,
            "allocated_amount": round(portfolio_value * 0.25, 2)
        },
        {
            "ticker": "MSFT",
            "weight": 20,
            "allocated_amount": round(portfolio_value * 0.20, 2)
        },
        {
            "ticker": "GOOGL",
            "weight": 18,
            "allocated_amount": round(portfolio_value * 0.18, 2)
        },
        {
            "ticker": "AMZN",
            "weight": 15,
            "allocated_amount": round(portfolio_value * 0.15, 2)
        },
        {
            "ticker": "META",
            "weight": 12,
            "allocated_amount": round(portfolio_value * 0.12, 2)
        },
        {
            "ticker": "NVDA",
            "weight": 10,
            "allocated_amount": round(portfolio_value * 0.10, 2)
        }
    ]

    return {
        "portfolio_value": portfolio_value,
        "daily_return": 4.5,
        "sharpe_ratio": 1.89,
        "allocations": allocations
    }


@router.get("/chart")
def get_chart_data():

    chart_data = [
        {
            "name": "Jan",
            "value": 1000000
        },
        {
            "name": "Feb",
            "value": 1080000
        },
        {
            "name": "Mar",
            "value": 1120000
        },
        {
            "name": "Apr",
            "value": 1245000
        },
        {
            "name": "May",
            "value": 1320000
        }
    ]

    return {
        "chart_data": chart_data
    }