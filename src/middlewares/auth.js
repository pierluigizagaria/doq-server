import jwt from '../helpers/Jwt';
import { ERRORS } from '../config/constants';

const authMiddleware = (socket, next) => {
    if (!socket.handshake.headers['authorization'] || socket.handshake.headers['authorization'].split(' ')[0] !== 'Bearer')
        return next(new Error('Forbidden'))
    const bearer = socket.handshake.headers['authorization'].split(' ')[1];
    jwt.verify(bearer)
        .then((verified) => {
            socket.jwtInfo = verified;
            next();
        })
        .catch((error) => {
            const message = error.name === 'TokenExpiredError' ? ERRORS.TOKEN_EXPIRED : ERRORS.INVALID_ACCESS_TOKEN;
            return next(new Error(message));
        });
};

export default authMiddleware;