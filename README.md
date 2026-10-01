# 🎓 Student Registration Form Portal & CI/CD Automated Testing

A modern, responsive Student Registration Webpage configured with dual continuous integration pipelines (**GitHub Actions** and **Jenkins**) to automatically test and verify whether the HTML file exists and contains all required form elements whenever code is pushed.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Project File Structure](#-project-file-structure)
3. [Features & Required Form Elements](#-features--required-form-elements)
4. [Running the Webpage Locally](#-running-the-webpage-locally)
5. [Automated Test Suite](#-automated-test-suite)
6. [CI/CD Pipeline 1: GitHub Actions](#-cicd-pipeline-1-github-actions)
7. [CI/CD Pipeline 2: Jenkins Pipeline](#-cicd-pipeline-2-jenkins-pipeline)
8. [Configuring Jenkins GitHub Webhook (Push Trigger)](#-configuring-jenkins-github-webhook-push-trigger)
9. [Pushing to Your GitHub Account](#-pushing-to-your-github-account)

---

## 🚀 Project Overview

This project satisfies the following DevOps and Web Development requirements:
- **Responsive HTML5 Webpage:** Implements a student registration form with modern styling and client-side validation.
- **Automated Element & File Existence Tests:** Dual test suites (Python `unittest` and Node.js) that test:
  1. `index.html` file existence in the root directory.
  2. Standard HTML5 DOCTYPE and title tags.
  3. `<form>` element with proper attributes.
  4. Required input fields: Full Name, Email (`type="email"`), Phone (`type="tel"`), Date of Birth (`type="date"`), Gender selection, Academic Course selection, Residential Address, and Submit button.
- **GitHub Actions Workflow:** Automatically triggers on every `push` and `pull_request` to `main` and `master`.
- **Jenkins Pipeline:** Standard declarative `Jenkinsfile` that checks out the repository, verifies file existence, and executes element test suites.

---

## 📂 Project File Structure

```
student-registration-form/
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI workflow
├── tests/
│   ├── test_html.py             # Python unittest suite for HTML & element verification
│   └── test_html.js             # Node.js test runner for HTML structure validation
├── index.html                   # Student Registration Webpage
├── styles.css                   # Responsive CSS styles
├── script.js                    # Interactive form validation script
├── Jenkinsfile                  # Declarative Jenkins CI Pipeline
├── run_tests.sh                 # Unified test execution script
├── package.json                 # Project npm metadata & scripts
├── .gitignore                   # Git ignore file
└── README.md                    # Comprehensive documentation
```

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

## 💻 Running the Webpage Locally

You can open `index.html` directly in any web browser, or serve it using Python or Node.js:

### Option A: Using Python built-in HTTP server
```bash
# Start local server on port 8000
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option B: Using Node.js `npx serve`
```bash
npx serve .
```

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

### Workflow Steps:
1. **Checkout Repository:** Fetches the code using `actions/checkout@v4`.
2. **Setup Runtimes:** Configures Python 3.11 and Node.js 20.
3. **Verify File Existence:** Executes a bash check to ensure `index.html` exists.
4. **Python Automated Unit Tests:** Executes `test_html.py` asserting doctype, form presence, and required fields.
5. **Node.js Automated Test Runner:** Executes `test_html.js` for additional cross-runtime verification.
6. **Unified Test Runner:** Runs `./run_tests.sh` to confirm 100% pass status.

---

## 🛠️ CI/CD Pipeline 2: Jenkins Pipeline

Located at: `Jenkinsfile`

### Stages:
1. **Verify Environment:** Prints runtime versions (`git`, `python3`, `node`).
2. **Verify HTML File Existence:** Verifies `index.html` is present in the workspace root.
3. **Test Required HTML Elements (Python):** Executes the Python `unittest` suite.
4. **Test Required HTML Elements (Node.js):** Executes the Node.js test script.
5. **Run Unified Test Runner:** Confirms overall test execution.
6. **Post Actions:** Emits build status notifications (`SUCCESS` / `FAILURE`).

---

## 🔗 Configuring Jenkins GitHub Webhook (Push Trigger)

To trigger the Jenkins pipeline automatically whenever you push code to GitHub:

1. **In Jenkins:**
   - Create a new **Pipeline** job (e.g., `student-registration-ci`).
   - Under **Build Triggers**, check **GitHub hook trigger for GITScm polling**.
   - Under **Pipeline**, select **Pipeline script from SCM**.
   - Select **Git**, paste your GitHub repository URL (e.g., `https://github.com/<your-username>/student-registration-form.git`).
   - Set Branch Specifier to `*/main`.
   - Script Path: `Jenkinsfile`.
   - Save the job.

2. **In GitHub:**
   - Go to your repository on GitHub.
   - Click **Settings** > **Webhooks** > **Add webhook**.
   - Payload URL: `http://<YOUR_JENKINS_SERVER_IP_OR_URL>:8080/github-webhook/`
   - Content type: `application/json`.
   - Which events would you like to trigger this webhook? Select **Just the push event**.
   - Click **Add webhook**.

Whenever you run `git push origin main`, GitHub will immediately notify Jenkins to run the pipeline!

---

## 📤 Pushing to Your GitHub Account

Follow these steps to create the repository on your GitHub account and push the code:

### Step 1: Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com).
2. Click the **+** icon in the top right corner and choose **New repository**.
3. Name the repository: `student-registration-form`.
4. Choose **Public** or **Private**.
5. **Do NOT** initialize with a README, .gitignore, or license (we already have them!).
6. Click **Create repository**.

### Step 2: Link Remote & Push from Terminal
Run the following commands in this directory:

```bash
# Navigate to the project directory
cd /Users/ashutoshpandey/.gemini/antigravity/scratch/student-registration-form

# Check git status
git status

# Add your GitHub repository remote (replace <YOUR_GITHUB_USERNAME> with your actual username)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/student-registration-form.git

# Set the default branch to main
git branch -M main

# Push the code and branch to GitHub
git push -u origin main
```

> **Note on Authentication:**
> When prompted for your password, use your GitHub **Personal Access Token (PAT)**:
> - On GitHub: `Settings` > `Developer Settings` > `Personal access tokens` > `Tokens (classic)`
> - Generate a token with `repo` and `workflow` permissions.
> - Or push using SSH if you have SSH keys configured:
>   `git remote set-url origin git@github.com:<YOUR_GITHUB_USERNAME>/student-registration-form.git`
