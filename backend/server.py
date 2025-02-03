import pandas as pd
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

# Load trained model
rf_model = joblib.load('accpred.pkl')  # Ensure the .pkl file is in the same directory

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Validate required fields
        required_fields = ['latitude', 'longitude', 'time', 'weather', 'road_type', 'traffic_volume']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required field(s)'}), 400

        # Extract and validate inputs
        lat = float(data['latitude'])
        lon = float(data['longitude'])
        time = int(data['time'])
        weather = int(data['weather'])
        road_type = int(data['road_type'])
        traffic = float(data['traffic_volume'])

        # Validate input ranges (optional but recommended)
        if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
            return jsonify({'error': 'Invalid latitude or longitude'}), 400
        if not (1 <= time <= 24):
            return jsonify({'error': 'Time must be between 1 and 24'}), 400
        if traffic < 0:
            return jsonify({'error': 'Traffic volume cannot be negative'}), 400

        # Calculate derived features
        high_traffic = 1 if traffic > 100 else 0
        rush_hour = 1 if (7 <= time <= 10) or (16 <= time <= 19) else 0

        # Create input DataFrame with expected feature order
        input_data = pd.DataFrame([[lat, lon, time, weather, road_type, traffic, high_traffic, rush_hour]],
                                  columns=['latitude', 'longitude', 'time_of_day', 'weather', 'road_type',
                                           'traffic_volume', 'high_traffic', 'rush_hour'])

        # Predict probability
        proba = rf_model.predict_proba(input_data)[0][1]
        return jsonify({'accident_probability': round(proba, 4)})

    except ValueError as e:
        # Handle invalid input types (e.g., non-numeric values)
        return jsonify({'error': f'Invalid input: {str(e)}'}), 400
    except Exception as e:
        # Handle any other unexpected errors
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)