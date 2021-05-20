pipeline{
    agent any
    stages {
        stage('checkout'){
            steps {
                sh 'git clone https://github.com/MS396584/BookingEngine.git'
            }
        }
        stage('build'){
            steps {
                sh 'npm install'
            }
        }
    }
}
