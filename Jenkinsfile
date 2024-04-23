node('') {
    stage 'Checkout'
        checkout scm
    stage 'Build infor'
    stage 'Build'
        sh "yarn install"
        sh "yarn build"
        sh "docker build -t meta-football-app:local-latest -f Dockerfile --no-cache . "
    stage 'Deploy'
        sh "docker-compose -f src/docker/app.yml up -d"
}