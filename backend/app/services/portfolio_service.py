class PortfolioService:

    @staticmethod
    def calculate_returns(initial, final):
        return ((final - initial) / initial) * 100


    @staticmethod
    def portfolio_summary():
        return {
            "total_assets": 1245000,
            "profit": 245000,
            "return_percentage": 24.5
        }