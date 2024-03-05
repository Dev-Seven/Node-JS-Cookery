// =============== userSignup =====================/

const userMobile = (req, res, next) => {
  let mobile = req.body.mobile;

  /************* Patterns ***************/

  let mobilePatern = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  /************* conditions ***************/

  if (!mobile.match(mobilePatern)) {
    return res.json({ message: "10 digit is required.", code: 400 });
  }

  next();
};

// =============== userSignup =====================/

const userSignup = (req, res, next) => {
  let firstName = req.body.firstName;

  let lastName = req.body.lastName;

  let mobile = req.body.mobile;

  let email = req.body.email;

  /************* Patterns ***************/

  let firtsNamePatern = /^[A-Za-z]{1,32}$/;
  let lastNamePatern = /^[A-Za-z]{1,32}$/;
  let mobilePatern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  let emailPatern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /************* conditions ***************/

  if (!firstName.match(firtsNamePatern)) {
    return res.json({ message: "First name is required", code: 400 });
  }

  if (!lastName.match(lastNamePatern)) {
    return res.json({ message: "Last name is required", code: 400 });
  }

  if (!mobile.match(mobilePatern)) {
    return res.json({ message: "10 digit is required.", code: 400 });
  }

  if (!email.match(emailPatern)) {
    return res.json({ message: "please provide Valide Email", code: 400 });
  }

  next();
};

// =============== adminLogin =====================/

const adminLogin = (req, res, next) => {
  let email = req.body.email;

  let password = req.body.password;

  let emailPatern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let passworPatern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!email.match(emailPatern)) {
    return res.json({ message: "please provide Valide Email", code: 400 });
  }

  if (!password.match(passworPatern)) {
    return res.json({
      message:
        "Password must be including 1 upper case character, special character and alphanumeric and minimum length is 8 characters.",
      code: 400,
    });
  }
  next();
};

// =============== userLogin =====================/

const userLogin = (req, res, next) => {
  let email = req.body.email;

  let password = req.body.password;

  let emailPatern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let passworPatern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

  if (!email.match(emailPatern)) {
    return res.json({ message: "please provide Valide Email", code: 400 });
  }

  if (!password.match(passworPatern)) {
    return res.json({
      message:
        "Password must be including 1 upper case character, special character and alphanumeric and minimum length is 8 characters.",
      code: 400,
    });
  }
  next();
};

module.exports = {
  // userLogin,
  userSignup,
  userMobile,
  // adminLogin
};
