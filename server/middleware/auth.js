import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        const isCustomAuth = token?.length < 500; 
        let decodedData ;
        console.log(token)
        if(isCustomAuth && token) {
            decodedData = jwt.verify(token,'shhhh');
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.verify(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
   

};
export default auth;