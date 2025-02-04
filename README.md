# Road Safety AI Innovations

This project aims to improve road safety through AI-driven technologies, creating systems that enhance driver and pedestrian safety, predict accident hotspots, and provide real-time hazard detection. Our goal is to build a safer environment for everyone on the road.

## Key Features

- **AI-Driven Safety Monitoring**: A system that provides real-time feedback to drivers, promoting safe driving behaviors.
- **Accident Prediction & Prevention**: Predicting accident-prone areas and preventing accidents through AI-powered solutions.
- **Pedestrian Protection**: A system that focuses on ensuring pedestrian safety by detecting risks and alerting drivers.
- **Vehicle Interaction for Mixed Traffic**: Enabling vehicles to communicate and interact in mixed traffic, ensuring smooth and safe traffic flow.
- **Real-Time Hazard Detection**: Detecting road hazards instantly and notifying drivers for quick reactions.
- **Smart Parking Solutions**: AI-powered parking system that identifies available parking spots and reduces congestion.

## Installation Guide

Follow these steps to set up the project locally and run both the backend and frontend.

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Nischith2004/RoadSafety.git
cd RoadSafety
```

### 2. Initialize the Repository

If you have just cloned the repository, initialize it as a Git repository:

```bash
git init
```

### 3. Set up the Virtual Environment

#### For Windows:

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
```

#### For macOS/Linux:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Python Dependencies

Install the necessary Python dependencies from the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### 5. Install Node Modules

Install the required node modules in the root project directory (main folder):

```bash
cd ..
npm install
```

### 6. Start the Backend Server

Start the backend server by running the following command in the root project directory:

```bash
cd backend
python server.py
```

### 7. Start the Frontend Development Server

Run the frontend development server:

```bash
cd ..
npm run dev
```

## Usage

- Visit `http://localhost:5173` to access the frontend application.
- The backend server will be running at `http://localhost:5000` to handle all the backend logic.

## Contributing

We welcome contributions to improve road safety technologies! If you'd like to contribute, follow these steps:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your branch (`git push origin feature-name`).
6. Open a pull request to merge your changes into the main project.

## License

This project is not  licensed under the MIT License.
