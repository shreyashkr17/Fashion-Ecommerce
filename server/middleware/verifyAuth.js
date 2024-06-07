const jwt = require('jsonwebtoken')

const authenticateJWt = (req,res,next)=>{
    // console.log(req.header.Authorization);
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
            if(err){
                return res.status(403).json({
                    message:"Invalid Token"
                })
            }

            req.user = user;
            // console.log("User verified");
            next()
        });
    }else{
        res.status(401).json({message:"Authorization Header Required"});
    }
}

module.exports = {authenticateJWt}