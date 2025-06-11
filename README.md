# yt1d Clone – Frontend + Backend

## Overview
This project mimics the behaviour of sites like **yt1d.com**:

* **Frontend** (static) – paste a YouTube link, see available formats, click to download.
* **Backend** (Node.js) – uses `yt-dlp` to fetch formats and returns direct links.

## Folder Structure
```
yt1d_clone/
├── backend/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

## Local Setup
```bash
# 1. Backend
cd backend
npm install
# make sure `python` and `yt-dlp` (installed via pip) are available
node server.js

# 2. Frontend
# Just open frontend/index.html in your browser or use Live Server
```

## Deployment
### Backend (Render)
1. Push `backend/` folder to a GitHub repo.
2. Create a new **Web Service** on Render.
3. Set:
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * **Python version**: add `buildCommand` env `poetry` or install `yt-dlp` manually.
4. Add a **Build Step** in Render “Environment → Build Command”:

   ```bash
   pip install yt-dlp
   npm install
   ```

5. Deploy – note the URL (e.g. `https://ytclone-backend.onrender.com`).

### Frontend (Netlify)
1. Push `frontend/` folder to GitHub.
2. Create new site on Netlify → link repo.
3. **Build Command**: (leave blank)
4. **Publish directory**: `frontend`
5. Deploy.

6. Edit `frontend/script.js` – change:
   ```js
   BACKEND_URL = "https://YOUR-BACKEND-URL.onrender.com";
   ```

## Legal Notice
Downloading YouTube videos may violate the YouTube Terms of Service.  
Use for personal, educational, or authorized content only.
