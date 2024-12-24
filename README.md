# MediTouch

MediTouch is a groundbreaking initiative aimed at transforming healthcare delivery by providing comprehensive healthcare services to remote and underserved areas through a simple, user-friendly app. The system is to reach the rural areas of our country and solve pressing medical issues. Our mission is to reduce healthcare costs by offering affordable solutions and minimising unnecessary travel to healthcare facilities. By leveraging advanced technology, MediTouch enhances the quality and efficiency of healthcare services, ensuring that every individual receives optimal care. Additionally, MediTouch is committed to health education and awareness, empowering the public with vital information to promote healthy living and proactive health management.

**ℹ️ This repo contains the server side of the meditouch project!**

### Project Structure
With an example of auth API (with passport.js):
```bash
meditouch-backend/
|-- .env
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md
|-- src
    |-- config
        |-- database.config.js
    |-- features
        |-- apikey
            |-- controllers
                |-- apikey.controller.js
            |-- routes
                |-- apikey.route.js
        |-- auth
            |-- controllers
                |-- auth.controller.js
                |-- doctor.auth.controller.js
            |-- routes
                |-- auth.routes.js
                |-- doctor.auth.routes.js
        |-- cart
            |-- controllers
                |-- cart.controller.js
            |-- routes
                |-- cart.route.js
        |-- community
            |-- controllers
                |-- community.controller.js
            |-- routes
                |-- community.routes.js
        |-- healthtips
            |-- controllers
                |-- healthtips.controller.js
            |-- routes
                |-- healthtips.routes.js
        |-- mail
            |-- mail.sender.js
        |-- telemedicine
            |-- controllers
                |-- doctor.controller.js
            |-- routes
                |-- doctor.routes.js
        |-- test
            |-- controllers
                |-- test.controller.js
            |-- routes
                |-- test.route.js
    |-- index.js
    |-- middlewares
        |-- apikey.middleware.js
    |-- models
        |-- apikeys.model.js
        |-- cart.model.js
        |-- community.model.js
        |-- doctor.model.js
        |-- healthtips.model.js
        |-- user.model.js
    |-- server.js
    |-- utils
        |-- generate.random.password.js
        |-- image.upload.js
|-- tasklist.md
|-- uploads

```



### Get Started

To get started, Clone this Repository at first with the following command:

```bash
git clone https://github.com/kaiumallimon/meditouch-backend.git
```

Next, Install all the dependencies(make sure that the latest version of node.js is installed in your computer). To do this, run the following command:

```bash
npm install
```
```bash
Run the following command to check the current policy:

To check : 
**Get-ExecutionPolicy**

To change it temporary : 
**Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass**

Do it permanetly :
**Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser**

Reset after work done :
**Set-ExecutionPolicy Restricted**
```

Now, the project setup is complete. To run the project, you can simply run the following command:

```bash
node src/index.js
```

or you can use nodemon for automatic changes; to use nodemon, run the following commands:

Install Nodemon:
```bash
npm i nodemon -g
```

run the server with nodemon:
```bash
nodemon src/index.js
```

Don't Forget to create a `.env` file with this format:

```bash
DB_URL=mongodb+srv://kaiumallimon:e2B1tUqAZ0IBSRCN@meditouch-backend.ogsmo.mongodb.net/meditouch?retryWrites=true
PORT=3000
SESSION_SECRET=IUZ5cfiJeFl0rsCOIUZ5cfiJeFl0rsCOIUZ5cfiJeFl0rsCO	
JWT_SECRET = IUZ5cfiJeFl0rsCOIUZ5cfiJeFl0rsCOIUZ5cfiJeFl0rsCO	
EMAIL= meditouch.bcrypt@gmail.com
EMAIL_PASSWORD= gfhwoutfhcmkaukn
X_API_KEY= p5xBzm5vWlni1f9VertqKkdOgUJaQCcX


## Google service account
GOOGLE_SERVICE_ACCOUNT = '{
  "type": "service_account",
  "project_id": "meditouch-backend",
  "private_key_id": "5b03fa195077b98d00e34bd9885166a1cbeab101",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCW3HkU59Bz6/BI\nIf9JpGTr6INJ64KKSc2ipNYlXHyDo0e7nc1LcRwOJDvscbddKzwrWDYaP/6fsYYO\nZhpXhYk7IubWHap+IK5xqCZYG8F+SSVr1EJ4mSczlalr1QnzWutbdwAtTO4hk2ap\nEL/2o25X8NBdKa8m5somc/qZA/MpBgF6zRC+SS1lJINzZZBgb5LNj+lwzwO95CUS\nKzrAa9f1SLFwObzD3nNmP1wpz21NWlz8T2Q4wWTnFPu6ECc3riPIKORQzLm+EocU\nOSHuaya2TsbHUGEoyqA+FM1xJzUf0vJNqV9WKmCbMTeLlQRHS7uVPRDgqKzQFgi4\nVwKC1N6hAgMBAAECggEABn1plWVQ6bZmrykMlcXFXwNbp9xtJeHS6izz1sZJx6fz\nOAur1JOtxKCjwKI2ZIMC+E0NLB1AqOy20FEYJQJmSu2kxzqeJlrlkOzOPtAYMi9C\nCtzQweYPclVSj9mpr0G5X5qY9ASb4e84uraGa5J69rwyBS/74aKKuRNtiROgbE1N\nmMQgM8zpyq1igM+jmxziyq1PkK8YUSihdg6ACumHoDNVDBvZ/7tlDXY5CbosW6uu\nJ9R5q0bosb5Zh0hpwI23hRNf/6Tse6V0X4BR3b64lmYoZaGdvC6Nl1gzmLGo4LgI\nAicwaGCj4V/fAWsS8lE2UvkKMvuIkyVDpKr40/6imQKBgQDG6D8zK3AqoxoLoxuS\nlznjuOCaIvWqKl2B3bYjYhemhRhrHppm1vxifdI34jgMEfCLiv1ji9Lf3j2o4de1\nhKBH3wDTsChMm2U5LoBHRiW6kkZkJKKYvJLe+FNUVePHZUG8Bjh0uawW2k6kNCwZ\no4YA1V8Qo8LEBK5XWfEFLmvxOwKBgQDCKctXUKSQgZYDgl5LBSeWiyQuArn2dVqx\nnDeEzrg1J8NSDYAHkjJx7WU6E5p1lfgmejjdpgnxwW/Qup/dLmky4yST1YaxPtTF\nXbLrLWS/whS4+gde7fo2S3b9p/PN4jH8ZDUOuqpVb22mK/BcA/J3epzw669odeJy\nDlDoqQZx0wKBgQCIaas+WqIYe7dXF8vHIzOue5J940/8HgX3FKjfZ1y09T6j6F8X\n/IUmvwe3D8xEauE/sljJNpGuuuoqsoiPkp+h6szUYVGiCEjJiJytROyHId5ou79P\nZLSNel0bz7Phgg4s908srlHZcmrQrn84Li+uzqbd8JGYgWVXvvVPCmE5FQKBgQCL\nyWlDGKUSAKnPJvnaCwEAanaGxaG65ayA+JYkAGwwoMsHdP669K9qxF4/nMN0ap84\nnH/6W8MHEZv9646SwAou/8diw7TwQOsQmS/qD0lcoU8oCaJq3uxoUJZ/cn6duH8C\nVea5Dvz4+3s2yqWGqbTT/iulbBliHJUGRnZLuv0PzwKBgQCnBbn08kPabVHzDkPX\nPQfVlBM/Ye6vQE1Y1gIas38oiN8/Js8sGPzo+EbCdkGJRv/tiNchhzxJNgegMfBv\nD5pJJjbhbFFzKlYrSUSHPEtQqCCxj5jpX6uKCN56rEJxaUfoUxlLPqCcSid1YIBr\nhOBNm50j7hYlg3xBkpJb7Dq+Zw==\n-----END PRIVATE KEY-----\n",
  "client_email": "meditouch@meditouch-backend.iam.gserviceaccount.com",
  "client_id": "113182593851224257702",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/meditouch%40meditouch-backend.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}'

API_URL=https://arnobbot-langflow-testbot.hf.space/api/v1/run/de4ef838-7fa6-4b19-b668-0bd8d206ef6c?stream=false
BEARER_TOKEN=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
X_API_KEY=sk-z5DItXbxYfxm1OhbjOMFkGDpH4UMwXD8Q2Sd3ncUF1I

Datastex_application_token = AstraCS:qNWdweGZzZrUgimZutpePzOS:e90709edfd3580ffddbbbab05761d268f34ae074e5c7f36f41478554ca1018a4
Datastex_application_URL = https://api.langflow.astra.datastax.com

## gdrive folder id
GDRIVE_FOLDER_ID = 1RJOgnfJCMKshKTZwng5d1sM09Eh1rrni

```

### Api validation with api keys
Before making a request to the server with api url, make sure that you have an api key created (both local key and the remote key) otherwise you'll get an unautorized response.

Process to include api validation in a api with proper permission:

Import the apikey validation middleware:

```bash
const middleware = require('../<path to your middlware>/apikey.middleware');
```
Include the middleware in the router with necessary permission:
```bash
router.get('/api-endpoint', middleware('read'), controller);
```


### Author
1. [Kaium Al Limon](https://github.com/kaiumallimon)  
2. [Kamrul Islam Arnob](https://github.com/KamrulIslamArnob)
