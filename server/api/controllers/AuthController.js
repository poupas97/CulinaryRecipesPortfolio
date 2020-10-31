const jwt = require('jsonwebtoken');

module.exports = () => {
  const login = async (req, res, next) => {
    const { body: { username, password } } = req;
    const accessToken = jwt.sign({ username, password }, process.env.ACCESS_TOKEN_SECRET)
    return res.status(200).json({ accessToken });
  };
      
  const authenticateToke = (req, res, next) => {
    const { headers: { authorization }, originalUrl } = req;
    
    let token; 
    if(originalUrl !== '/api/login') {

      if(authorization) [, token] = authorization.split(' ');
      if(!token) return res.sendStatus(401);
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userAuthenticated) => {
        if(err) return res.sendStatus(403);
        
        req.userAuthenticated = userAuthenticated;
        next();
      })
    } else{
      next()
    }
  }

  return { login, authenticateToke };
}