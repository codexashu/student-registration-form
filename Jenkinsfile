pipeline {
    agent any

    triggers {
        // Trigger build automatically whenever a push notification is sent by GitHub Webhook
        githubPush()
    }

    options {
        timeout(time: 15, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        ansiColor('xterm')
    }

    environment {
        PROJECT_NAME = 'student-registration-form'
        DEPLOY_PORT = '8080'
    }

    stages {
        stage('Verify Environment') {
            steps {
                echo '=========================================='
                echo "Building Project: ${env.PROJECT_NAME}"
                echo 'Checking runner environment and tools...'
                echo '=========================================='
                sh '''
                    echo "Current Workspace: $(pwd)"
                    echo "Git version: $(git --version || echo 'Not installed')"
                    echo "Python3 version: $(python3 --version || echo 'Not installed')"
                    echo "Node version: $(node --version || echo 'Not installed')"
                '''
            }
        }

        stage('Verify HTML File Existence') {
            steps {
                echo '=========================================='
                echo 'Stage: Checking HTML File Existence'
                echo '=========================================='
                sh '''
                    if [ ! -f index.html ]; then
                        echo "[ERROR] index.html does not exist in root directory!"
                        exit 1
                    fi
                    echo "[SUCCESS] index.html exists."
                    ls -la index.html
                '''
            }
        }

        stage('Test Required HTML Elements (Python)') {
            steps {
                echo '=========================================='
                echo 'Stage: Running Python HTML Elements Test'
                echo '=========================================='
                sh '''
                    python3 -m unittest discover -s tests -p "test_*.py" -v
                '''
            }
        }

        stage('Test Required HTML Elements (Node.js)') {
            steps {
                echo '=========================================='
                echo 'Stage: Running Node.js HTML Structure Test'
                echo '=========================================='
                sh '''
                    node tests/test_html.js
                '''
            }
        }

        stage('Run Unified Test Runner') {
            steps {
                echo '=========================================='
                echo 'Stage: Running ./run_tests.sh'
                echo '=========================================='
                sh '''
                    chmod +x run_tests.sh
                    ./run_tests.sh
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                echo '=========================================='
                echo 'Stage: Packaging & Deploying Application'
                echo '=========================================='
                sh '''
                    echo "[+] Packaging production static web distribution..."
                    mkdir -p dist
                    cp index.html styles.css script.js dist/
                    echo "[SUCCESS] Distribution bundle created in $(pwd)/dist"

                    # If Docker is available, build containerized image
                    if command -v docker &>/dev/null; then
                        echo "[+] Building Docker image: student-registration-portal:latest..."
                        docker build -t student-registration-portal:latest .
                        echo "[SUCCESS] Container image built successfully."
                    else
                        echo "[INFO] Standalone static artifacts ready for web server deployment."
                    fi
                '''
            }
        }
    }

    post {
        success {
            echo '==================================================='
            echo ' SUCCESS: Tests passed and Application Deployed!   '
            echo '==================================================='
        }
        failure {
            echo '==================================================='
            echo ' FAILURE: HTML file missing or test assertions failed. '
            echo ' Please check the build log for missing elements.  '
            echo '==================================================='
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
