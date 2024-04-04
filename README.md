![Online History Training Platform](https://github.com/RadostinKostadinov/Online-History-Training-Platform/blob/main/docs/Resources/Images/Figma/github_readme_logo2.png)

## A platform that teachers and students can use for online learning

This project was built as a thesis project, so it isn't production-ready. But can be used as a solid foundation for such a platform.

The main vision of the project is to be a self-hosted platform for a school in Bulgaria, where teachers can upload lessons and add exercises, competitions, and tests to them. On the other hand, students, divided into classes, can read the lessons and solve exercises, competitions, or tests.

### Explanation

You can check the project's UML diagrams to get more detailed information about its logic and how it is expected to work.<br>**_Diagrams:_** [Bulgarian](https://github.com/RadostinKostadinov/Online-History-Training-Platform/tree/main/docs/Diagrams/Bulgarian/Images) | [English](https://github.com/RadostinKostadinov/Online-History-Training-Platform/tree/main/docs/Diagrams/English/Images)<br>**_Common diagrams:_** [Database conceptual model](https://github.com/RadostinKostadinov/Online-History-Training-Platform/blob/main/docs/Diagrams/English/Images/Database_Conceptual_Model.png), [Use-Case Teacher](https://github.com/RadostinKostadinov/Online-History-Training-Platform/blob/main/docs/Diagrams/English/Images/usecase_teacher.jpg), [Use-Case Student](https://github.com/RadostinKostadinov/Online-History-Training-Platform/blob/main/docs/Diagrams/English/Images/usecase_student.jpg), [Sitemap](https://github.com/RadostinKostadinov/Online-History-Training-Platform/blob/main/docs/Diagrams/English/Images/sitemap.jpg)

### Tech Stack

**Client:** Angular, TypeScript<br>**Server:** Node, Express, MongoDB<br>**Other:** Git, Postman, Figma

### Installation & Configuration

To clone and run this project, you'll need [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/download) (which comes with npm) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your computer.

```bash
# Clone this repository
$ git clone https://github.com/RadostinKostadinov/Online-History-Training-Platform.git
```

##### Server

```bash
# Go into /Online-History-Training-Platform/server/
# Install dependencies
$ npm install

# Create a new file named `.env`
# Open the `.env.example` file located in the /server/ directory
# Copy the contents of `.env.example` and paste it into `.env` file.
# Replace the placeholder values in the `.env` file with your actual configuration values.

# Run the application in development mode
$ npm run dev

```

##### Client

```bash
# Go into /Online-History-Training-Platform/client/
# Install dependencies
$ npm install

# Run the application
$ npm run start
```

## Contacts

If you have any questions feel free to contact me at dev@rkostadinov.com
