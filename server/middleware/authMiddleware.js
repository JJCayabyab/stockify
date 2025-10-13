import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization"); 

  //check if the token is provided
  if (!authHeader) {
    return res.status(401).json({ error: "No authorization header provided" });
  }

  //remove bearer from the token
  const token = authHeader.replace("Bearer ", "");

  try {
    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach the decoded user info to the request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
