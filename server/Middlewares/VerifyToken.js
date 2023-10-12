const jwt = require("jsonwebtoken");
const globalCongig = require("../Authentication/global.config");

const jwtdecode = require("jwt-decode");
const VerifyToken = (req, res, next) => {
  const token = req.headers["authentication"];
  // console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized Access",
      error: "Provide jwt token.",
    });
  }
  var splitToken = token.split(":");
  console.log(splitToken);
  jwt.verify(
    splitToken[0],
    globalCongig.secretKey,
    {
      algorithms: globalCongig.algorithm,
    },
    (err, decoded) => {
      if (err) {
        console.log("15:>", err);
        return res.status(403).json({
          msg: "Forbidden Access",
          error: err.message,
        });
      }
      if (req.params.id) {
        if (req.params.id !== decoded.userId) {
          return res.status(403).json({
            msg: "Forbidden Access",
          });
        }
      }
      console.log("21:>", decoded);
      next();
    }
  );
};

module.exports = VerifyToken;
