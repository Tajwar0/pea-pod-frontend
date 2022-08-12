const validateUsername = (username) => {
  return String(username).match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/);
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
  return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
};

module.exports = { validateEmail, validateUsername, validatePassword };
