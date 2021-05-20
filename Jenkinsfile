pipeline{
    agent any
    stages {
        stage('build'){
            steps {
                git branch: 'main', url: 'https://github.com/MS396584/BookingEngine.git'
                sh 'npm install'
            }
        }
       stage('Sonar Analysis'){
            steps {
                 withSonarQubeEnv("scan") {
                 sh "${tool("scan")}/bin/sonar-scanner -Dsonar.projectKey=Booking -Dsonar.projectName=BookingEngine -Dsonar.sources=."
                
                                       }
            }
        }
    }
}
