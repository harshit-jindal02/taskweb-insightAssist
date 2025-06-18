# Full Stack To-Do Application

This repository contains a full stack To-Do application, featuring:
- **Backend:** Flask-based REST API for managing to-do items.
- **Frontend:** React.js single-page application for user interaction.
- **Deployment:** Helm charts for deploying both backend and frontend to Kubernetes.

---

## Project Structure

```
.
├── backend/
│   └── Flask-ToDo-List/         # Flask backend API
├── frontend/
│   └── Simple-Todos-In-React-JS/ # React frontend app
├── helm/
│   ├── backend/                 # Helm chart for backend
│   └── frontend/                # Helm chart for frontend
└── README.md                    # (This file)
```

---

## Prerequisites

- [Python 3.7+](https://www.python.org/)
- [Node.js 14+ and npm](https://nodejs.org/)
- [Docker](https://www.docker.com/) (for containerization)
- [Helm 3+](https://helm.sh/) (for Kubernetes deployment)
- [Kubernetes cluster](https://kubernetes.io/) (for Helm deployment)

---

## Backend (Flask API)

- Location: `backend/Flask-ToDo-List/`
- Provides RESTful endpoints for managing to-do items.
- See [backend/Flask-ToDo-List/README.md](backend/Flask-ToDo-List/README.md) for setup and API details.

### Local Development

```bash
cd backend/Flask-ToDo-List
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

---

## Frontend (React App)

- Location: `frontend/Simple-Todos-In-React-JS/`
- User interface for interacting with the to-do list.
- See [frontend/Simple-Todos-In-React-JS/README.md](frontend/Simple-Todos-In-React-JS/README.md) for setup and usage.

### Local Development

```bash
cd frontend/Simple-Todos-In-React-JS
npm install
npm start
```

---

## Running the Full Stack Locally

1. Start the backend server (see above).
2. Start the frontend app (see above).
3. By default, the frontend expects the backend API at `http://localhost:5000`.

---

## Deployment with Helm

This project includes Helm charts for deploying both backend and frontend to a Kubernetes cluster.

### Steps

1. Ensure you have access to a Kubernetes cluster and Helm is installed.
2. Build and push Docker images for both backend and frontend (see their respective READMEs).
3. Update the image tags in `helm/backend/values.yaml` and `helm/frontend/values.yaml`.
4. Deploy using Helm:

```bash
# Deploy backend
helm install backend ./helm/backend

# Deploy frontend
helm install frontend ./helm/frontend
```

5. Check the NOTES.txt in each chart for post-installation instructions.

---

# taskweb-insightAssist
