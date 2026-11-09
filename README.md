# Country Population Visualiser

A small Flask + JavaScript web app for browsing countries by population and flag.

> Built as a technical assessment for a job application (November 2024).

## Features

- Lists every country alphabetically in a dropdown
- Live search box that filters the dropdown as you type
- Shows the selected country's most recent recorded population in a table
- Displays the country's flag

## How it works

```
Browser (static/js/script.js) ──▶ Flask (main.py) ──▶ CountriesNow API
         ▲                          /api/population       (population + flag data)
         └──── JSON ─────────────── /api/country/flag
```

The Flask backend proxies two endpoints of the public [CountriesNow API](https://countriesnow.space/).
The frontend merges population and flag data client-side, sorts it and renders the UI.

## Project structure

```
main.py               # Flask app and API proxy routes
templates/index.html  # Page layout and styling
static/js/script.js   # Data fetching, search, dropdown and display logic
```

## Running locally

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Then open http://127.0.0.1:5000.

## Tech

Python · Flask · Requests · JavaScript (Fetch API) · HTML/CSS
