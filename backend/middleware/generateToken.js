import jwt from "jsonwebtoken";


// const secret_key = process.env.JWT_SECRET;
export const createToken = (userId,email) => {
    const token = jwt.sign({id:userId,email:email}, secret_key, { expiresIn: '5h'  });
    return token;
}

// module.exports = {
//     createToken
// }