import yfinance as yf
import pandas as pd


class DataService:

    @staticmethod
    def download_stock_data(tickers, start, end):
        data = yf.download(
            tickers,
            start=start,
            end=end,
            group_by='ticker'
        )

        return data