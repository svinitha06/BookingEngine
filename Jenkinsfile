pipeline{
    environment {
    imagename = "bookingengine"
    dockerImage = ''
  }
    agent any
    stages {
        stage('CheckOut'){
            steps {
                git branch: 'main', url: 'https://github.com/MS396584/BookingEngine.git'
            }
        }
       stage('Build'){
           steps{
             script{
                dockerImage = docker.build imagename
                   }
                }
           }
       stage('Sonar Analysis'){
            steps {
                 withSonarQubeEnv("scan") {
                 sh "${tool("scan")}/bin/sonar-scanner -Dsonar.projectKey=Booking -Dsonar.projectName=BookingEngine -Dsonar.sources=."
                
                                       }
                 }
           }
        stage('nexus'){
            steps{
                sh 'docker tag bookingengine localhost:8095/booking/bookingengine'
                sh 'docker login -u admin -p admin123 localhost:8095'
            }
        }
    }
}
