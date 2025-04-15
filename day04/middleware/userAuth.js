const jwt = require("jsonwebtoken")
const User = require("../module/userSchemas")

const userAuth = async (req, res, next) => {

    const {tocken} = req.cookies
    if(!tocken){
        throw new Error("invalid tocken")
    }

    
    const payload =jwt.verify(tocken,"adiv1234")
    const {_id} = payload

    if(!_id){
        throw new Error("id is missing")
    }

    const data = await User.findById(_id)
     if(!data){
        throw new Error("user not found");
        }
        req.data = data;
next()
}

// if (!tocken || !tocken.startsWith("Bearer ")) {
//     return res.status(400).send({ message: "Malformed token" });
// }

module.exports = userAuth;




// Use this approach if you want to pass tokens in the Authorization header instead of cookies.
// It’s commonly used in APIs where cookies are not practical (e.g., mobile apps or third-party integrations).


// const jwt = require("jsonwebtoken");
// const User = require("../module/userSchemas");

// const userAuth = async (req, res, next) => {
//     try {
//         // Extract the Authorization header

//         const authHeader = req.headers.authorization;

//         // Check if the header exists and starts with "Bearer "

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             throw new Error("Authorization header is missing or invalid");
//         }

//         // Extract the token by removing the "Bearer " prefix
//         const tocken = authHeader.split(" ")[1];

//         // Verify the token
//         const payload = jwt.verify(tocken, "adiv1234");
//         const { _id } = payload;

//         if (!_id) {
//             throw new Error("ID is missing in token");
//         }

//         // Find the user in the database
//         const data = await User.findById(_id);
//         if (!data) {
//             throw new Error("User not found");
//         }

//         // Attach user data to the request object
//         req.data = data;
//         next();
//     } catch (err) {
//         res.status(401).send({ message: "Unauthorized: " + err.message });
//     }
// };

// module.exports = userAuth;