pipeline{
    agent any
    stages {
       
        stage('CheckOut'){
            steps {
                git branch: 'main', url: 'https://github.com/MS396584/BookingEngine.git'
            }
        }
       stage('Sonar Analysis'){
            steps {
                 withSonarQubeEnv("Sonar_server") {
                 sh "${tool("Sonar scanner")}/bin/sonar-scanner \
                     -Dsonar.projectKey=Booking-be \
                     -Dsonar.projectName=BookingEngine-be \
                     -Dsonar.sources=server/"
                                       }
                 }
           }
        stage('docker'){
            steps{
                sh 'docker build -t bookingengine-be:1.0 .'
            }
        }
        stage('nexus'){
            steps{
                sh 'docker tag bookingengine-be:1.0 localhost:12012/bookingengine-be:${BUILD_NUMBER}'
                sh 'docker login -u admin -p admin@123 localhost:12012'
                sh 'docker push localhost:12012/bookingengine-be:${BUILD_NUMBER}'
            }
        }
        
        stage('run the container'){
            steps{
                sh 'docker pull localhost:12012/bookingengine-be:${BUILD_NUMBER}'
                sh 'docker stop Booking-backend'
                sh 'docker rm Booking-backend'
                sh 'docker run --name Booking-backend -p 5000:5000 localhost:12012/bookingengine-be:${BUILD_NUMBER}'
            }
        }
    }
}
