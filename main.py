from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get API key from .env
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise ValueError("API_KEY is missing in the .env file.")

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins if necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base URL for the Financial Modeling Prep API
API_URL = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}"

@app.get("/data")
async def get_filtered_data(
    start_date: Optional[str] = Query(default=None, description="Start date (e.g., 2020-09-26)"),
    end_date: Optional[str] = Query(default=None, description="End date (e.g., 2024-09-28)"),
    min_revenue: Optional[str] = Query(default=None, description="Minimum revenue"),
    max_revenue: Optional[str] = Query(default=None, description="Maximum revenue"),
    min_net_income: Optional[str] = Query(default=None, description="Minimum net income"),
    max_net_income: Optional[str] = Query(default=None, description="Maximum net income"),
):
    """
    Fetch and filter financial data from the Financial Modeling Prep API.
    """
    try:
        # Convert empty strings to None or integers (as required)
        start_date = start_date or None
        end_date = end_date or None
        min_revenue = int(min_revenue) if min_revenue else None
        max_revenue = int(max_revenue) if max_revenue else None
        min_net_income = int(min_net_income) if min_net_income else None
        max_net_income = int(max_net_income) if max_net_income else None

        # Fetch data from the external API
        response = requests.get(API_URL)
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()

        # Apply filters to the fetched data
        filtered_data = [
            item for item in data
            if (
                (not start_date or item["date"] >= start_date) and
                (not end_date or item["date"] <= end_date) and
                (not min_revenue or item["revenue"] >= min_revenue) and
                (not max_revenue or item["revenue"] <= max_revenue) and
                (not min_net_income or item["netIncome"] >= min_net_income) and
                (not max_net_income or item["netIncome"] <= max_net_income)
            )
        ]

        # Return the filtered data
        return {"data": filtered_data}

    except ValueError as e:
        # Handle invalid type conversions
        raise HTTPException(status_code=400, detail={"error": "Invalid query parameter value", "details": str(e)})

    except requests.exceptions.RequestException as e:
        # Handle network/API errors gracefully
        raise HTTPException(
            status_code=500,
            detail={"error": "Failed to fetch data from the external API", "details": str(e)},
        )

    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(
            status_code=500,
            detail={"error": "An unexpected error occurred", "details": str(e)},
        )
