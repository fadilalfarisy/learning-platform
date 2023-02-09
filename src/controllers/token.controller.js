import { createAccessToken, verifyRefreshToken } from '../libs/token.js';

const checkRefreshToken = async (req, res, next) => {
    try {
        const { refresh } = req.cookies

        //when not sent cookie refresh token
        if (!refresh) {
            return res.status(400).json({
                code: 400,
                status: 'FORBIDDEN',
                errors: {
                    cookies: 'cookie is null'
                }
            });
        }
        verifyRefreshToken(refresh, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    code: 400,
                    status: 'FORBIDDEN',
                    errors: {
                        token: 'invalid token'
                    }
                });
            }
            const accessToken = createAccessToken(decoded.id, decoded.role)
            res.status(200).json({
                code: 200,
                status: 'OK',
                data: {
                    role: decoded.role,
                    accessToken: accessToken
                }
            });
        })
    } catch (error) {
        next(error)
    }
}

const tokenController = {
    checkRefreshToken
}

export default tokenController