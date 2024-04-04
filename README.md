![Online History Training Platform]()

## A platform that teachers and students can use for online learning

This project was build as a thesis project, so it isn't production ready. But can be used as a solid foundation for such a platform.

The main vision about the project is to be a self-hosted platform for school in Bulgaria, where teachers can upload lessons and add exercises, competitions and tests to them. In the other hand students, divided into classes, can read the lessons and solve exercises, competitions or tests.

### Explanation

You can check project's UML diagrams to get more detailed information about the logic behind it and how it is expected to work.
**_Diagrams:_** [Bulgarian]() | [English]()
**_Common diagrams:_** [Database conceptual model](), [Use-Case Teacher](), [Use-Case Student](), [Sitemap]()

### Tech Stack

**Client:** Angular, TypeScript
**Server:** Node, Express, MongoDB
**Other:** Git, Postman, Figma

### Installation & Configuration

To clone and run this project, you'll need [Git](), [Node.js]() (which comes with npm) and [MongoDB]() installed on your computer.

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

If you have any questions feel free to contact me: dev@rkostadinov.com
