pipeline{
    environment {
    imagename = "bookingengine"
    dockerImage = ''
  }
    agent any
    stages {
        stage('clean'){
            steps {
                 deleteDir()
            }
        }
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
                 sh "${tool("scan")}/bin/sonar-scanner \
                     -Dsonar.projectKey=Booking \
                     -Dsonar.projectName=BookingEngine \
                     -Dsonar.sources=server/ \
                     -Dsonar.tests=server/ \
                     -Dsonar.javascript.lcov.reportPaths=./coverage/lcov.info \
                     -Dsonar.testExecutionReportPaths=/var/jenkins_home/workspace/sonar_result_test/xunit.xml"
                                       }
                 }
           }
        stage('nexus'){
            steps{
                sh 'docker tag bookingengine localhost:8095/booking/bookingengine:2.0'
                sh 'docker login -u admin -p admin123 localhost:8095'
                sh 'docker push localhost:8095/booking/bookingengine:2.0'
            }
        }
        stage('run the container'){
            steps{
                sh 'docker pull localhost:8095/booking/bookingengine:2.0'
                sh 'docker stop booking'
                sh 'docker rm booking'
                sh 'docker run --name booking -p 5000:5000 localhost:8095/booking/bookingengine:2.0'
            }
        }
    }
}
