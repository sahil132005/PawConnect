from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

GEMINI_API_KEY = "AIzaSyAMMi8jt-wvwJs4weq7Xt6teUNZMd-jbqM"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")

    payload = {
        "contents": [{
            "parts": [{"text": user_input}]
        }]
    }
    headers = {"Content-Type": "application/json"}

    response = requests.post(GEMINI_API_URL, json=payload, headers=headers)
    ai_response = response.json()

    # Extract the text response from Gemini's response structure
    try:
        text_response = ai_response['candidates'][0]['content']['parts'][0]['text']
        # Format the response for better readability and remove markdown asterisks
        formatted_response = (text_response
            .replace('**', '')  # Remove markdown bold syntax
            .replace('. ', '.\n')
            .replace('? ', '?\n'))
        return jsonify({"response": formatted_response})
    except (KeyError, IndexError):
        return jsonify({"response": "I apologize, but I couldn't process that request. Could you try asking in a different way?"})

if __name__ == "__main__":
    app.run(debug=True)