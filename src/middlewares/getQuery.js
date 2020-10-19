import { ERRORS } from '../config/constants';

const getQueryMiddleware = (socket, next) => {
    const session_code = socket.handshake.query['session_code'] || null;
    const action = socket.handshake.query['action'] || null;
    if (session_code === null || action === null) return next(new Error(ERRORS.MISSING_PARAMETERS));
    socket.sessionCode = session_code;
    socket.action = action;
    next();
}

export default getQueryMiddleware;