from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)

# Set up CORS
CORS(app)

# Load the model
with open('naive_bayes_model.pkl', 'rb') as file:
    model = pickle.load(file)

#Load scaler
with open('scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)

# Check if the model is loaded correctly
if model is None:
    print("Model loading failed!")
else:
    print("Model loaded successfully.")
    print(model)

frontend_folder = os.path.join(os.getcwd(), "..", "frontend")
dist_folder = os.path.join(frontend_folder, "dist")

@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)


@app.route("/app/predict", methods=['POST'])
def predict():
    # Retrieve features from the request
    data = request.get_json()
    
    # Print the received features
    print('Received features:', data)
    
    # Convert input features to numeric values explicitly
    try:
        glucose = float(data['glucose'])
        insulin = float(data['insulin'])
        bmi = float(data['bmi']) 
        age = float(data['age'])
    except (ValueError, KeyError) as e:
        return jsonify({"error": "Invalid input data"}), 400

    # Create a 2D array with the numeric input features
    input_features = np.array([glucose, insulin, bmi, age]).reshape(1,-1)
    
    # Print the final features for prediction
    print('Final features for prediction:', input_features)

    # Apply standardization
    std_data = scaler.transform(input_features)

     # Make prediction
    prediction = model.predict(std_data)
    
    # Print the raw prediction output
    print('Raw prediction output:', prediction)

    output = int(prediction[0])
    # Print the final output
    print('Final output:', output)
    
    return jsonify({"prediction": output})

if __name__ == '__main__':  
    app.run(debug=True)