# Anime Review System

## About

The Anime Review System is a web application that allows users to browse, review, and score various anime series. Utilizing advanced algorithms and modern DevOps practices, this application ensures a seamless and efficient user experience.

## Table of Contents

- [About](#about)
- [DevOps Tools Required](#devops-tools-required)
- [Execution](#execution)
- [Contributors](#contributors)

## DevOps Tools Required

To successfully run and deploy this project, you will need the following DevOps tools:

- **Jenkins**: For continuous integration and continuous delivery.
- **Docker**: For Containerization
- **Kubernetes and Ansible**: For Deployment
- **Minikube**: For running Kubernetes locally.
- **Kubectl**: For managing Kubernetes clusters.
- **Elasticsearch**: For search and analytics.
- **Kibana**: For data visualization.

## Execution

### Jenkins Pipeline

1. **Start Jenkins Pipeline:**
   - Clone the GitHub repository URL of this project into your Jenkins pipeline configuration.
   - The Jenkins pipeline will build and deploy the frontend and backend applications.

2. **Build and Deploy:**
   - Use Maven to build the backend and Npm to build the frontend.
   - Dockerize the applications and push the Docker images to a container registry (e.g., Docker Hub).
   - Ansible will deploy Kubernetes clusters and manage the deployment of Docker images to the clusters.
   - Kubernetes will orchestrate the creation and deployment of all necessary resources.

### Access the Application

1. **Get Minikube ip:**
   - Type the following command to get the Minikube IP and then access the application using the specified port, for example, 30023.

     ```sh
     minikube ip

2. **Open in Browser:**
   - Open your browser and go to http://[minikube-ip]:30023.

### Application Usage

- **Interact with the App:**
    - Browse the available anime series, read reviews, and rate the series.
    - Add anime series to your watchlist if logged in.
 
### Minikube Dashboard
- Check minikube dashboard for the status.
  ```sh
  minikube dashboard

## Contributors

- **Hari Prasad** - [@HariPrasad0023](https://github.com/HariPrasad0023)
- **Pranjal Gawande** - [@PranjalGawande](https://github.com/PranjalGawande)
