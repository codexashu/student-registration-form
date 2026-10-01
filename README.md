# 🎓 Student Registration Form Portal & CI/CD Automated Testing + Deployment

A modern, responsive Student Registration Webpage configured with dual continuous integration pipelines (**GitHub Actions** and **Jenkins**) to automatically test and verify whether the HTML file exists and contains all required form elements whenever code is pushed, and automatically **deploy** the application to **GitHub Pages** and **Docker containers**.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Project File Structure](#-project-file-structure)
3. [Features & Required Form Elements](#-features--required-form-elements)
4. [Live Deployment Options](#-live-deployment-options)
   - [GitHub Pages Deployment (Automatic via Actions)](#1-github-pages-deployment-automatic-via-actions)
   - [Docker Container Deployment](#2-docker-container-deployment)
   - [Local Development Server](#3-local-development-server)
5. [Automated Test Suite](#-automated-test-suite)
6. [CI/CD Pipeline 1: GitHub Actions](#-cicd-pipeline-1-github-actions)
7. [CI/CD Pipeline 2: Jenkins Pipeline](#-cicd-pipeline-2-jenkins-pipeline)
8. [Configuring Jenkins GitHub Webhook (Push Trigger)](#-configuring-jenkins-github-webhook-push-trigger)

---

## 🚀 Project Overview

This project satisfies the following DevOps and Web Development requirements:
- **Responsive HTML5 Webpage:** Implements a student registration form with modern styling and client-side validation.
- **Automated Element & File Existence Tests:** Dual test suites (Python `unittest` and Node.js) that test:
  1. `index.html` file existence in the root directory.
  2. Standard HTML5 DOCTYPE and title tags.
  3. `<form>` element with proper attributes.
  4. Required input fields: Full Name, Email (`type="email"`), Phone (`type="tel"`), Date of Birth (`type="date"`), Gender selection, Academic Course selection, Residential Address, and Submit button.
- **GitHub Actions Workflow:** Automatically triggers on every `push` and `pull_request` to `main` and `master`, tests the code, and automatically deploys to **GitHub Pages**.
- **Jenkins Pipeline:** Standard declarative `Jenkinsfile` that checks out the repository, verifies file existence, executes element test suites, and bundles the application for deployment.

---

## 📂 Project File Structure

```
student-registration-form/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI & Deployment workflow
├── tests/
│   ├── test_html.py             # Python unittest suite for HTML & element verification
│   └── test_html.js             # Node.js test runner for HTML structure validation
├── index.html                   # Student Registration Webpage
├── styles.css                   # Responsive CSS styles
├── script.js                    # Interactive form validation script
├── Dockerfile                   # Production Nginx container configuration
├── docker-compose.yml           # Compose specification for multi-platform deployment
├── Jenkinsfile                  # Declarative Jenkins CI & Deployment Pipeline
├── run_tests.sh                 # Unified test execution script
├── package.json                 # Project npm metadata & scripts
├── .gitignore                   # Git ignore file
└── README.md                    # Comprehensive documentation
```

---

## 🌐 Live Deployment Options

### 1. GitHub Pages Deployment (Automatic via Actions)
Whenever you push to the `main` branch, the GitHub Actions workflow tests the HTML and then deploys the site to GitHub Pages:

👉 **Live Site URL:** `https://codexashu.github.io/student-registration-form/`

> **Note to enable GitHub Pages in your repo:**
> 1. Go to your repository on GitHub: **[codexashu/student-registration-form](https://github.com/codexashu/student-registration-form)**
> 2. Click **Settings** > **Pages** (under "Code and automation" in the left sidebar).
> 3. Under **Build and deployment > Source**, select **GitHub Actions**.
> 4. Future pushes will automatically update the live site!

---

### 2. Docker Container Deployment
You can deploy the registration portal inside an ultra-lightweight, high-performance Nginx Alpine container:

```bash
# Build and run directly using Docker
docker build -t student-registration-portal:latest .
docker run -d -p 8080:80 --name student_reg_app student-registration-portal:latest

# Or using Docker Compose:
docker compose up -d
```
Access the application at: `http://localhost:8080`

---

### 3. Local Development Server
Open directly in any browser, or use Python:
```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 📝 Features & Required Form Elements

The `index.html` webpage contains semantic HTML5 elements structured into clear sections:

| Field / Element | HTML Tag & Attributes | Purpose / Validation |
| :--- | :--- | :--- |
| **Form Container** | `<form id="studentRegistrationForm" method="POST">` | Form wrapper with ID |
| **Full Name** | `<input type="text" id="fullName" name="fullName" required>` | Student's full legal name |
| **Email Address** | `<input type="email" id="email" name="email" required>` | Standard RFC email input |
| **Phone Number** | `<input type="tel" id="phone" name="phone" required>` | Student phone contact |
| **Date of Birth** | `<input type="date" id="dob" name="dob" required>` | Date picker input |
| **Gender** | `<input type="radio" name="gender">` | Radio button selection |
| **Academic Program** | `<select id="course" name="course" required>` | Dropdown selection of degrees |
| **Residential Address** | `<textarea id="address" name="address" required>` | Multi-line street address |
| **Declaration Terms** | `<input type="checkbox" id="terms" name="terms" required>` | Student certification checkbox |
| **Submit Button** | `<button type="submit" id="submitBtn">` | Submits the registration |
| **Reset Button** | `<button type="reset" id="resetBtn">` | Clears all form fields |

---

## 🧪 Automated Test Suite

The repository includes test runners that verify file existence and DOM element presence.

### 1. Run via Shell Script (Recommended)
```bash
chmod +x run_tests.sh
./run_tests.sh
```

### 2. Run via Python (`unittest`)
```bash
python3 -m unittest discover -s tests -p "test_*.py" -v
```

### 3. Run via Node.js
```bash
node tests/test_html.js
# Or using npm
npm test
```

---

## ⚡ CI/CD Pipeline 1: GitHub Actions

Located at: `.github/workflows/ci.yml`

### Triggers:
- Every `push` to `main` and `master`
- Every `pull_request` to `main` and `master`
- Manual trigger via `workflow_dispatch`

### Workflow Jobs:
1. **validate-webpage:**
   - Checks out repository (`actions/checkout@v4`).
   - Verifies `index.html` file existence.
   - Runs Python `unittest` suite (`test_html.py`).
   - Runs Node.js DOM test suite (`test_html.js`).
   - Executes `./run_tests.sh`.
2. **deploy-github-pages:**
   - Triggers only when validation succeeds on `main`.
   - Packages static HTML/CSS/JS artifacts.
   - Deploys live to **GitHub Pages**.

---

## 🛠️ CI/CD Pipeline 2: Jenkins Pipeline

Located at: `Jenkinsfile`

### Stages:
1. **Verify Environment:** Prints runtime versions (`git`, `python3`, `node`).
2. **Verify HTML File Existence:** Verifies `index.html` is present in the workspace root.
3. **Test Required HTML Elements (Python):** Executes the Python `unittest` suite.
4. **Test Required HTML Elements (Node.js):** Executes the Node.js test script.
5. **Run Unified Test Runner:** Confirms overall test execution.
6. **Deploy Application:** Generates production `dist/` directory and builds container image if Docker is present.
7. **Post Actions:** Emits build status notifications (`SUCCESS` / `FAILURE`).

---

## 🔗 Configuring Jenkins GitHub Webhook (Push Trigger)

To trigger the Jenkins pipeline automatically whenever you push code to GitHub:

1. **In Jenkins:**
   - Create a new **Pipeline** job (e.g., `student-registration-ci`).
   - Under **Build Triggers**, check **GitHub hook trigger for GITScm polling**.
   - Under **Pipeline**, select **Pipeline script from SCM**.
   - Select **Git**, paste your GitHub repository URL: `https://github.com/codexashu/student-registration-form.git`.
   - Set Branch Specifier to `*/main`.
   - Script Path: `Jenkinsfile`.
   - Save the job.

2. **In GitHub:**
   - Go to: `https://github.com/codexashu/student-registration-form/settings/hooks`
   - Click **Add webhook**.
   - Payload URL: `http://<YOUR_JENKINS_SERVER_IP_OR_URL>:8080/github-webhook/`
   - Content type: `application/json`.
   - Which events would you like to trigger this webhook? Select **Just the push event**.
   - Click **Add webhook**.

Whenever you run `git push origin main`, GitHub will immediately notify Jenkins to run the pipeline!
