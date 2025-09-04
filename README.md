# Kazi Tasnim Zinat - Academic Website

Professional academic website showcasing research publications, experience, and achievements.

## 📁 Project Structure

```
academic-website/
├── index.html                 # Main HTML file
├── css/
│   └── styles.css            # Main stylesheet
├── js/
│   └── script.js             # Main JavaScript file
├── assets/
│   ├── images/
│   │   └── profile.jpg       # Profile photo (add your own)
│   └── cv/
│       └── Kazi_Tasnim_Zinat_CV.pdf  # CV PDF (optional)
├── README.md                 # Project documentation
└── .gitignore               # Git ignore file
```

## 🛠️ Setup Instructions

### Method 1: GitHub Pages (Recommended)

1. **Create a new GitHub repository**
   ```bash
   # Repository name should be: [your-username].github.io
   # For example: kzintas.github.io
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/[your-username]/[your-username].github.io.git
   cd [your-username].github.io
   ```

3. **Add the website files**
   - Copy `index.html` to the root directory
   - Create `css/` folder and add `styles.css`
   - Create `js/` folder and add `script.js`
   - Create `assets/` folder structure

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Initial website setup"
   git push origin main
   ```

5. **Access your website**
   - Your website will be available at: `https://[your-username].github.io`
   - It may take a few minutes to become live

### Method 2: Local Development

1. **Download the files**
   - Save all files in your local directory

2. **Serve locally**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have it)
   npx http-server
   
   # Or simply open index.html in your browser
   ```

3. **Access locally**
   - Open `http://localhost:8000` in your browser

