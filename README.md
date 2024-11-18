# MediTouch

MediTouch is a groundbreaking initiative aimed at transforming healthcare delivery by providing comprehensive healthcare services to remote and underserved areas through a simple, user-friendly app. The system is to reach the rural areas of our country and solve pressing medical issues. Our mission is to reduce healthcare costs by offering affordable solutions and minimising unnecessary travel to healthcare facilities. By leveraging advanced technology, MediTouch enhances the quality and efficiency of healthcare services, ensuring that every individual receives optimal care. Additionally, MediTouch is committed to health education and awareness, empowering the public with vital information to promote healthy living and proactive health management.

**ℹ️ This repo contains the server side of the meditouch project!**

### Project Structure
With an example of auth API (with passport.js):
```bash
meditouch-backend/
|---node_modules/
|---src/
    |---config/
        |---database.config.js
        |---pasport.config.js
    |---features/
        |---auth/
            |---controllers/
                |---auth.controller.js
            |---routes/
                |---auth.routes.js
    |---middlewares/
    |---models/
        |---user.model.js
    |---utils/
    |---index.js
    |---server.js

|---.env
|---.gitignore
|---package-lock.json
|---package.json
|---README.md
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
DB_URL=your_mongodb_url
PORT=3000
SESSION_SECRET=your_complex_session_secret
```

### Author
1. [Kaium Al Limon](https://github.com/kaiumallimon)  
2. [Kamrul Islam Arnob](https://github.com/KamrulIslamArnob)
