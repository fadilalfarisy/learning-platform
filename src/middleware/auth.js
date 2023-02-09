import { verifyAccessToken } from '../libs/token.js';

const auth = (req, res, next) => {
    let accessToken = req.headers.authorization
    if (!accessToken) {
        return res.status(401).json({
            status: 401,
            message: 'failed',
            info: 'forbidden'
        });
    }

    try {
        accessToken = accessToken.split(' ')[1];
        verifyAccessToken(accessToken, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    status: 401,
                    message: 'failed',
                    info: 'forbidden'
                });
            }
            req.token = decoded
            next()
        })

    } catch (error) {
        next(error)
    }
};

const adminAuth = (req, res, next) => {
    if (req.token.role.toLowerCase() !== 'admin') {
        return res.status(401).json({
            status: 401,
            message: 'failed',
            info: 'your not admin'
        });
    }
    next()
};

export {
    auth,
    adminAuth
}