pipeline{
    agent any
    stages {
        stage('build'){
            steps {
                sh 'npm install'
            }
        }
        stage('Soanr Analysis'){
            steps {
                sh 'sonar.projectKey=Booking sonar.projectName=BookingEngine sonar.sources=.'
            }
        }
    }
}
