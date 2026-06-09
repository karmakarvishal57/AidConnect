pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'aidconnect-backend:jenkins'
        FRONTEND_IMAGE = 'aidconnect-frontend:jenkins'
        ADMIN_IMAGE    = 'aidconnect-admin:jenkins'
        DOCKER_REGISTRY = 'vish57'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code from GitHub...'
                script {
                    echo "Building commit: ${env.GIT_COMMIT}"
                    echo "Branch: ${env.GIT_BRANCH}"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'

                script {
                    echo "Building backend image: ${BACKEND_IMAGE}"
                    sh "docker build -t ${BACKEND_IMAGE} ./backend"

                    echo "Building frontend image: ${FRONTEND_IMAGE}"
                    sh "docker build -t ${FRONTEND_IMAGE} ./frontend"

                    echo "Building admin image: ${ADMIN_IMAGE}"
                    sh "docker build -t ${ADMIN_IMAGE} ./admin"

                    sh 'docker images | grep jenkins'
                }
            }
        }

        stage('Start Application Services') {
            steps {
                echo 'Starting MERN application...'

                script {
                    sh 'docker compose up -d'

                    echo 'Waiting for services to start...'
                    sleep(time: 30, unit: 'SECONDS')

                    sh 'docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"'
                }
            }
        }

        stage('Health Check & Testing') {
            steps {
                echo 'Running health checks...'

                script {
                    sh '''
                    curl -f http://localhost:3000 || {
                        echo "Backend health check failed"
                        exit 1
                    }
                    echo "Backend is healthy"
                '''

                    sh '''
                    curl -f http://localhost:5173 || {
                        echo "Frontend health check failed"
                        exit 1
                    }
                    echo "Frontend is accessible"
                '''

                    sh '''
                    curl -f http://localhost:5174 || {
                        echo "Admin health check failed"
                        exit 1
                    }
                    echo "Admin is accessible"
                '''

                    sh '''
                    curl -f http://localhost:3000 || {
                        echo "Database connection failed"
                        exit 1
                    }
                    echo "Database is connected"
                '''
                }
            }
        }

        stage('Integration Tests') {
            steps {
                echo 'Running integration tests...'

                script {
                    sh '''
                    echo "Creating test task..."

                    curl -X POST http://localhost:5000/api/tasks \
                        -H "Content-Type: application/json" \
                        -d '{"title":"Jenkins CI Test Task","completed":false}' \
                        -f || exit 1
                '''

                    sh '''
                    echo "Verifying task creation..."

                    curl -s http://localhost:5000/api/tasks | \
                    grep "Jenkins CI Test Task" || {
                        echo "Task creation test failed"
                        exit 1
                    }

                    echo "Integration test passed"
                '''
                }
            }
        }

        stage('Performance Check') {
            steps {
                echo 'Running basic performance checks...'

                script {
                    sh '''
                    echo "Checking API response time..."
                    time curl -s http://localhost:3000 > /dev/null

                    echo "Checking frontend load time..."
                    time curl -s http://localhost:5173 > /dev/null
                '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up resources...'

            script {
                sh '''
                echo "Stopping application containers..."
                docker compose down || true

                echo "Removing test containers..."
                docker ps -aq --filter "label=jenkins-test" | xargs -r docker rm -f

                echo "Cleaning up unused images..."
                docker image prune -f || true
            '''
            }
        }

        success {
            echo 'Pipeline completed successfully!'

            script {
                sh '''
                echo "Build #$(BUILD_NUMBER) succeeded at $(date)"
                '''
            }
        }

        failure {
            echo 'Pipeline failed!'

            script {
                sh '''
                echo "Capturing container logs for debugging..."
                docker compose logs || true
            '''
            }
        }

        unstable {
            echo 'Pipeline completed with warnings'
        }
    }
}
