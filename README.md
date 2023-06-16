<div align="center">

# Outfithub Backend

</div>

<br>

## Get Started
### Prerequisites
* Download and install <a href="https://nodejs.org/dist/v18.16.0/node-v18.16.0-x64.msi">Node.js v18.16.0<a/> <br>
  Make sure your Node.js and npm are installed:
  ```bash
  node -v
  npm -v
  ```
* Have a Google Cloud Platform account if you want to deploy using GCP.

### Installation
* Clone the repository using git:
  ```bash
  git clone https://github.com/C23-PS070/Outfithub-Backend.git
  ```
* Move to project folder:
  ```bash
  cd Outfithub-Backend
  ```
* Install the packages:
  ```bash
  npm install
  ``` 
* Run the server:
  ```bash
  # node
  node app.js
  
  # npm
  npm start
  ``` 

### SQL Instance
* 
  
### Deployment
* Clone the repository using git:
   ```bash
  git clone https://github.com/C23-PS070/Outfithub-Backend.git
  ```
* Move to project folder:
  ```bash
  cd Outfithub-Backend
  ```
  
  _Note: You must change the SECRET_KEY, DB_USER, DB_NAME, DB_PASS and INSTANCE_CONNECTION_NAME in the app.js file according to what you have created using the Cloud Shell Editor or other text editor._
  
* Build an image:
  ```bash
  gcloud builds submit --tag gcr.io/PROJECT_ID/IMAGE_NAME
  ```
  
   _Note: You must change the PROJECT_ID and IMAGE_NAME according to what you want to create._
 
* Make sure the image that has been created is running properly:
  ```bash
   docker run -p 8080:8080 IMAGE_NAME
  ```
  
  _Notes: You must change the IMAGE_NAME according to the image you have created._
  
* Deploy a Cloud Run service
  ```bash
  gcloud run deploy SERVICE_NAME \
  --image IMAGE_NAME \
  --add-cloudsql-instances INSTANCE_CONNECTION_NAME \
  --platform managed \
  --region REGION \
  --allow-unauthenticated \
  ```
  
   _Notes: You must change the SERVICE_NAME, IMAGE_NAME, INSTANCE_CONNECTION_NAME and REGION according to what you want to create._

* Perform the test using the deployed link.

<br>

## Usage
If the server is already running, you can check our <a href="https://documenter.getpostman.com/">API Documentation</a> for more details and test it with Postman.

<br>

## Tech Stack
[![Google Cloud Platform](https://img.shields.io/badge/Google%20Cloud%20Platform-%234285F4.svg?style=plastic&logo=google-cloud&logoColor=white)](https://cloud.google.com/) [![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=plastic&logo=mysql&logoColor=white)]() [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=plastic&logo=node.js&logoColor=white)]() [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=plastic&logo=express&logoColor=%2361DAFB)]() [![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?style=plastic&logo=docker&logoColor=white)](https://www.docker.com/) [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=plastic&logo=github&logoColor=white)](https://github.com/) [![Postman](https://img.shields.io/badge/Postman-FF6C37?style=plastic&logo=postman&logoColor=white)](https://www.postman.com/) [![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=plastic&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

<br>

## License
[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg?style=plastic)](https://www.gnu.org/licenses/gpl-3.0)
