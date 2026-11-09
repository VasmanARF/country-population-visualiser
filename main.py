from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

# Home route
@app.route("/")
def index():
    return render_template("index.html")

# API route to fetch country population 
@app.route("/api/population")
def get_population():
    url = "https://countriesnow.space/api/v0.1/countries/population"
    response = requests.get(url)  
    if response.status_code == 200:
        data = response.json()  
        # Send the data to the frontend
        return jsonify(data)  
    return jsonify({"error": "Failed to fetch data"}), 500

# API route to fetch country flag 
@app.route("/api/country/flag")
def get_flag():
    url = "https://countriesnow.space/api/v0.1/countries/flag/images"
    response = requests.get(url)  
    if response.status_code == 200:
        data = response.json() 
        # Send the data to the frontend
        return jsonify(data)  
    return jsonify({"error": "Failed to fetch data"}), 500
if __name__ == "__main__":
    app.run(debug=True)
