from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import requests
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from typing import List

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="News Summarizer Agent", version="1.0")

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("NEWS_API_KEY")
if not API_KEY:
    raise ValueError("❌ NEWS_API_KEY not found in .env file")

# Summarizer pipeline
print("⚡ Loading summarizer model...")
summarizer = pipeline("summarization", model="Falconsai/text_summarization")

# Response schema
class NewsArticle(BaseModel):
    title: str
    summary: str
    url: str

@app.get("/news", response_model=List[NewsArticle])
def get_news(date: str = Query(..., description="Date in YYYY-MM-DD format")):
    """
    Fetch and summarize top news for a given date.
    Example: /news?date=2025-09-01
    """
    try:
        # Call NewsAPI with date
        url = f"https://newsapi.org/v2/everything?q=top&from={date}&to={date}&sortBy=popularity&apiKey={API_KEY}"
        print(f"Requesting news for date: {date}")
        response = requests.get(url, timeout=10)
        
        if response.status_code != 200:
            error_msg = f"NewsAPI error: {response.status_code}"
            try:
                error_msg += f" - {response.json().get('message', 'Unknown error')}"
            except:
                pass
            print(f"API Error: {error_msg}")
            raise HTTPException(status_code=response.status_code, detail=error_msg)

        data = response.json()
        articles = data.get("articles", [])
        
        if not articles:
            print(f"No articles found for date: {date}")
            return []
            
        print(f"Found {len(articles)} articles, processing top 10")
        digest = []
        
        for a in articles[:10]:  # summarize top 10
            content = a.get("content") or a.get("description") or a.get("title")
            if content:
                try:
                    summary = summarizer(content, max_length=60, min_length=20, do_sample=False)[0]["summary_text"]
                    print(f"Summarized article: {a['title'][:30]}...")
                except Exception as e:
                    print(f"Summarization error: {str(e)[:100]}")
                    summary = content[:200] + "..."  # fallback if summarizer fails
                digest.append({
                    "title": a["title"],
                    "summary": summary,
                    "url": a["url"]
                })
                
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        error_message = f"Error processing news: {str(e)}"
        print(error_message)
        raise HTTPException(status_code=500, detail=error_message)

    return digest
