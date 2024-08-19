const jwt = require('jsonwebtoken');

// verify Token
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if(!token)
    return res.status(401).json({message: 'token not found'});

  try {
    const tokenUser = jwt.verify(token, process.env.SECRETE_KEY);
    req.user = tokenUser;
    next();
  } catch(error) {
    return res.status(401).json({message: "Unauthorized"});
  }
}

// verify Token & Authorize the user
function verifyTokenAndAuth(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user,id === req.param.id || req.user.isAdmin){
      next();
    } else {
      return res.status(403).json({message: "You Are not Allowed"});
    }
  });
}

//verify Token and Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if(req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "you are not allowed,only admin allowed" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin
}
