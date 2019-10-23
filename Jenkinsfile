#!/usr/bin/env groovy
pipeline {

    /*
     * Run everything on an existing agent configured with a label 'docker'.
     * This agent will need docker, git and a jdk installed at a minimum.
     */
    agent any
    

    // using the Timestamper plugin we can add timestamps to the console log
    options {
        timestamps()
    }

    stages {
        stage('Build') {
       
            steps {
                // using the Pipeline Maven plugin we can set maven configuration settings, publish test results, and annotate the Jenkins console
                sh 'npm i --save'
            }
        }

        stage('Build and Publish Image') {
            when {
                branch 'github-public'  //only run these steps on the master branch
            }
            steps {
                /*
                 * Multiline strings can be used for larger scripts. It is also possible to put scripts in your shared library
                 * and load them with 'libaryResource'
                 */
               sh 'ng build --prod'
            }
        }
    }

}