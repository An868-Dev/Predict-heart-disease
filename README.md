Rasa Healthcare Chatbot
1. Objective

Build a chatbot that supports heart disease prediction based on user-provided health information.

The chatbot should interact naturally, ask for data step by step, and make predictions using a Logistic Regression model.

Provide explainable AI (XAI) feedback using LIME to ensure transparency.

2. Main Features

Conversational Flow

The chatbot greets the user at the beginning of the conversation.

Sequentially asks for required information (age, gender, blood pressure, cholesterol, heart rate, blood sugar, etc.).

Confirms the collected data before making predictions.

Heart Disease Prediction

Sends the collected data to a trained Logistic Regression model (or other supported ML models).

Returns results: “at risk” or “not at risk” of heart disease.

Explainability (XAI)

Uses LIME to show which features contributed most to the prediction.

Provides explanations in a user-friendly way.

Conversation Management

Handles missing or invalid inputs by asking the user to re-enter.

Supports session continuation if the conversation is interrupted.

3. Non-Functional Requirements

Language: Vietnamese (with the option to extend to English).

Scalability: Support integration with additional models (Random Forest, XGBoost, Neural Network).

Integration: Deployable on web (Rasa Webchat), mobile app, or messaging platforms (Telegram, Messenger).

Performance: Prediction and response time < 2 seconds.

4. Technical Requirements

Framework: Rasa (NLU + Core).

Programming Language: Python.

Machine Learning Model: Logistic Regression (trained with scikit-learn, saved via joblib).

XAI Library: LIME.

Database: SQLite or CSV/JSON for storing conversation history and prediction logs.

Step:
Open file and download by requirements.txt => pip install -r requirements.txt

Go to backend by cd rasa-backend
Step 1: rasa train
step 2: rasa run actions
step 3: rasa shell for testing
for about web you can using step 2 and go front-end then u can tested without rasa shell

