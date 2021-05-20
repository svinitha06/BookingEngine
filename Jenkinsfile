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
                sh 'mvn sonar:sonar'
            }
        }
    }
}
