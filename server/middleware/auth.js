const jwt=require("jsonwebtoken");

const authmiddleware=(req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1];

  if(!token){
    return res.status(401).json({message:"NO token found"});
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded;
    next();
    
  } catch (error) {
    res.status(401).json({message:"Toke is not valid"});
  }
}

module.exports=authmiddleware;