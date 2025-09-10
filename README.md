# News Summarizer Agent

A full-stack application that summarizes news articles using advanced NLP models. The project consists of a Python backend for news fetching, summarization, and a React frontend for user interaction.

## Features
- Fetch news from various sources (APIs, web scraping)
- Summarize news articles using HuggingFace models
- Date-based news selection
- Responsive and modern UI

## Project Structure
```
backend/
  main.py                # Backend entry point
  requirement.txt        # Python dependencies
  demo/
    huggingFaceApi.py    # HuggingFace summarization logic
    NewsApi.py           # News API integration
    webScraper.py        # Web scraping logic
frontend/
  src/
    components/          # React components
    App.jsx, main.jsx    # Main React files
  public/                # Static assets
  package.json           # Frontend dependencies
```

## Getting Started

### Backend
1. Navigate to `backend/`:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   pip install -r requirement.txt
   ```
3. Run the backend server:
   ```sh
   python main.py
   ```

### Frontend
1. Navigate to `frontend/`:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- Open the frontend in your browser (usually at `http://localhost:5173`)
- Select a date and view summarized news articles

## Requirements
- Python 3.8+
- Node.js 16+

## License
MIT License
