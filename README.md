# Financial Data App

This is a full-stack web application that displays financial data using a React frontend and a FastAPI backend. The application allows users to filter, sort, and view financial data with a responsive UI.

---

## **Deployed Application**
- **Frontend**: [https://financial-data-app-beta.vercel.app/](https://financial-data-app-beta.vercel.app/)
- **Backend**: [https://rahul-financial-data-app.onrender.com](https://rahul-financial-data-app.onrender.com)
- note: If there are no incoming requests to your backend for 15 minutes, Render will automatically stop the service to save resources. 
The backend will restart automatically when a new request is received, but this can cause a 50 second delay for the first request (cold start).
---

## **Features**
- Filter financial data by:
  - Date range.
  - Revenue range.
  - Net income range.
- Sort data by:
  - Date.
  - Revenue.
  - Net income.
- Fully responsive design for desktop and mobile users.

---

## **Tech Stack**
- **Frontend**: React (Vite), TailwindCSS.
- **Backend**: FastAPI.
- **Hosting**:
  - **Frontend**: Vercel.
  - **Backend**: Render.

---

## **Setup Instructions**

Follow these steps to run the project locally.

### **1. Clone the Repository**
Clone the GitHub repository to your local machine:
```bash
git clone https://github.com/RahulKBV/Rahul-financial-data-app.git
cd Rahul-financial-data-app
```

---

### **2. Running the Backend Locally**

1. Navigate to the backend directory (or stay in the root if the backend is in the root):
   ```bash
   # All files are located in the root directory
   ```

2. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the backend directory and add your `API_KEY`:
   ```
   API_KEY=your-api-key
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

5. The backend will be available at:
   ```
   http://127.0.0.1:8000
   ```

---

### **3. Running the Frontend Locally**

1. Navigate to the frontend directory:
   ```bash
   # All files are located in the root directory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory and add the backend URL:
   ```
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The frontend will be available at:
   ```
   http://127.0.0.1:5173
   ```

---

## **Deployment**

### **Backend Deployment (Render)**

1. Ensure your backend is pushed to a GitHub repository.
2. Go to [Render](https://render.com/) and create a **Web Service**.
3. Configure the service:
   - **Build Command**: `pip install -r requirements.txt`.
   - **Start Command**: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`.
   - Add environment variables (e.g., `API_KEY`).
4. Deploy your backend. It will be available at:
   ```
   https://rahul-financial-data-app.onrender.com
   ```

---

### **Frontend Deployment (Vercel)**

1. Ensure your frontend is pushed to a GitHub repository.
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Log in to Vercel:
   ```bash
   vercel login
   ```

4. Navigate to your frontend directory:
   ```bash
   # All files are located in the root directory
   ```

5. Deploy the frontend:
   ```bash
   vercel
   ```

6. Configure environment variables during setup:
   - **Key**: `VITE_API_BASE_URL`.
   - **Value**: `https://rahul-financial-data-app.onrender.com`.

7. Your frontend will be available at:
   ```
   https://financial-data-app-beta.vercel.app/
   ```

---

## **Troubleshooting**

1. **CORS Issues**:
   - Ensure your FastAPI backend has the following middleware configured:
     ```python
     from fastapi.middleware.cors import CORSMiddleware

     app.add_middleware(
         CORSMiddleware,
         allow_origins=["*"],  # Replace "*" with specific frontend URL for production
         allow_credentials=True,
         allow_methods=["*"],
         allow_headers=["*"],
     )
     ```

2. **Backend Not Working Locally**:
   - Verify your `requirements.txt` includes all dependencies, including `fastapi`, `uvicorn`, and `gunicorn`.

3. **Frontend Not Fetching Data**:
   - Ensure `VITE_API_BASE_URL` is set correctly in your `.env` file.

---

---

