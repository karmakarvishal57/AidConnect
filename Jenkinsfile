/* groovylint-disable NestedBlockDepth */
pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'aidconnect-backend:jenkins'
        FRONTEND_IMAGE = 'aidconnect-frontend:jenkins'
        ADMIN_IMAGE = 'aidconnect-admin:jenkins'
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
                    withCredentials([
                        string(credentialsId:'URI', variable:'URI'),
                        string(credentialsId:'PORT', variable:'PORT'),
                        string(credentialsId:'CLOUDINARY_NAME', variable:'CLOUDINARY_NAME'),
                        string(credentialsId:'CLOUDINARY_API_KEY', variable:'CLOUDINARY_API_KEY'),
                        string(credentialsId:'CLOUDINARY_API_SECRET_KEY', variable:'CLOUDINARY_API_SECRET_KEY'),
                        string(credentialsId:'ADMIN_EMAIL', variable:'ADMIN_EMAIL'),
                        string(credentialsId:'ADMIN_PASSWORD', variable:'ADMIN_PASSWORD'),
                        string(credentialsId:'JWT_SECRET', variable:'JWT_SECRET'),
                        string(credentialsId:'razorpay_api_key', variable:'razorpay_api_key'),
                        string(credentialsId:'razorpay_secret_key', variable:'razorpay_secret_key'),
                        string(credentialsId:'CURRENCY', variable:'CURRENCY')
                    ]) {
                        sh '''
                            echo "Creating backend .env file..."

                            cat > backend/.env <<EOF
PORT=$PORT
URI=$URI
CLOUDINARY_NAME=$CLOUDINARY_NAME
CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET_KEY=$CLOUDINARY_API_SECRET_KEY
ADMIN_EMAIL=$ADMIN_EMAIL
ADMIN_PASSWORD=$ADMIN_PASSWORD
JWT_SECRET=$JWT_SECRET
razorpay_api_key=$razorpay_api_key
razorpay_secret_key=$razorpay_secret_key
CURRENCY=$CURRENCY
EOF

                            echo ".env file created successfully"

                            docker-compose up -d

                            echo "Waiting for services to start..."
                            sleep 30

                            docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"
                       '''
                    }
                }
            }
        }

        stage('Health Check & Testing') {
            steps {
                echo 'Running health checks...'

                script {
                    sh '''
                        curl -f http://host.docker.internal:3000 || {
                            echo "Backend health check failed"
                            exit 1
                        }
                        echo "Backend is healthy"
                    '''

                    sh '''
                        curl -f http://host.docker.internal:5170 || {
                            echo "Frontend health check failed"
                            exit 1
                        }
                        echo "Frontend is accessible"
                    '''

                    sh '''
                        curl -f http://host.docker.internal:5171 || {
                            echo "Admin health check failed"
                            exit 1
                        }
                        echo "Admin is accessible"
                    '''

                    sh '''
                        curl -f http://host.docker.internal:3000/health || {
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
                script {
                    sh '''
                        curl -f http://host.docker.internal:3000/api/user || {
                            echo "User API test failed"
                            exit 1
                        }

                        echo "User API accessible"
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
                        time curl -s http://host.docker.internal:3000/api/doctor/list > /dev/null

                        echo "Checking frontend load time ..."
                        time curl -s http://host.docker.internal:5170 > /dev/null

                        echo "Checking admin load time ..."
                        time curl -s http://host.docker.internal:5171 > /dev/null
                    '''
                }
            }
        }

        stage('Push to Registry') {
    when {
        branch 'main'  // Only push from main branch
    }
    steps {
         script {
            withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                             usernameVariable: 'USERNAME',
                                             passwordVariable: 'PASSWORD')]) {
                sh 'docker login -u $USERNAME -p $PASSWORD'
                sh "docker tag ${BACKEND_IMAGE} ${DOCKER_REGISTRY}/mern-backend:${BUILD_NUMBER}"
                sh "docker tag ${FRONTEND_IMAGE} ${DOCKER_REGISTRY}/mern-frontend:${BUILD_NUMBER}"
                sh "docker tag ${ADMIN_IMAGE} ${DOCKER_REGISTRY}/mern-admin:${BUILD_NUMBER}"
                sh "docker push ${DOCKER_REGISTRY}/mern-backend:${BUILD_NUMBER}"
                sh "docker push ${DOCKER_REGISTRY}/mern-frontend:${BUILD_NUMBER}"
                sh "docker push ${DOCKER_REGISTRY}/mern-admin:${BUILD_NUMBER}"
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
                    echo "Build #$BUILD_NUMBER succeeded at $(date)"
                '''
                slackSend(
                channel: '#deployments',
                color: 'good',
                message: "✅ MERN Pipeline #${BUILD_NUMBER} succeeded!"
            )
            }
        }

        failure {
            echo 'Pipeline failed!'

            script {
                sh '''
                    echo "Capturing container logs for debugging..."
                    docker compose logs || true
                '''
                slackSend(
                channel: '#deployments',
                color: 'danger',
                message: "❌ MERN Pipeline #${BUILD_NUMBER} failed! Check logs: ${BUILD_URL}"
            )
            }
        }

        unstable {
            echo 'Pipeline completed with warnings'
        }
    }
    }
