pipeline {    agent any    tools {nodejs "NodeJS"}    stages {        stage('Checkout') {            steps {                // Récupère le code depuis le SCM configuré                  git url : 'https://github.com/SLK349/cryptoApp.git', branch: 'main'            }        }        stage('Install dependencies') {            agent {                    docker { image 'node:14' }            }            steps {                // Utilise 'sh' pour les commandes shell sous Unix/Linux ou 'bat' sous Windows                sh 'npm install'            }        }        stage('Test') {            agent {                    docker { image 'node:14' }            }            steps {                // Exécuter les tests unitaires ou d'autres types de tests                sh 'npm test'            }            post {                // Gérer les résultats des tests, par exemple en marquant le build comme instable                always {                    junit '**/test-results/*.xml' // Assurez-vous que vos tests génèrent des rapports au format JUnit XML                }                success {                    echo 'Les tests ont réussi !'                }                failure {                    echo 'Les tests ont échoué !'                }            }        }        stage('Build') {            agent {                    docker { image 'node:14' }            }            steps {                // Construire l'application pour la production                sh 'npm run build'            }        }        stage('Deploy') {            steps {                echo 'Déploiement de l\'application...'            }        }    }}