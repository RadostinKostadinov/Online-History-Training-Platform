const jwt = require("jsonwebtoken");

function validateUser(req, res, next) {
  //Проверка дали има auth-token в header-ите на заявката
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied. Redirect to homepage");
  }

  //Валидация на Token-a
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.verified = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token.");
  }
}

function validateTeacher(req, res, next) {
  //Проверка, дали потребителят е учител.
  if (req.verified.type != "teacher") {
    return res
      .status(400)
      .send("Access Denied. User must be of type 'teacher'.");
  }
  next();
}

module.exports.validateUser = validateUser;
module.exports.validateTeacher = validateTeacher;
