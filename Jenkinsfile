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
    }

    post {
        success {
            echo '==================================================='
            echo ' SUCCESS: HTML file verified and all tests passed! '
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
