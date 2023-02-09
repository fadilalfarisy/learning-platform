import bcrypt from 'bcrypt'
import User from '../models/users.model.js'
import { createAccessToken, createRefreshToken } from '../libs/token.js'
import Course from '../models/courses.model.js';

const register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        //check required field
        if (!username || !password) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    username: 'must not be null',
                    password: 'must not be null'
                }
            });
        }

        //check duplicated username
        const admin = await User.findOne({ username });
        if (admin) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    username: 'username already used'
                }
            });
        }

        //default value role when admin register
        let role = 'admin'

        //create new admin
        const newAdmin = await User.create({
            username,
            password: password.toString(),
            role
        });


        //create access token and refresh token
        const accessToken = createAccessToken({
            id: newAdmin.id,
            role: role
        });
        const refreshToken = createRefreshToken({
            id: newAdmin.id,
            role: role
        })

        //send refresh token as a cookie
        res.cookie("refresh", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1d
        });

        res.status(201).json({
            code: 201,
            status: 'CREATED',
            data: {
                username,
                role,
                accessToken
            }
        });

    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        //check required field
        if (!username || !password) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    username: 'must not be null',
                    password: 'must not be null'
                }
            });
        }

        //check username admin is exist
        const admin = await User.findOne({
            username: username,
            role: 'admin'
        })

        //when username admin is not found
        if (!admin) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    username: 'username not found'
                }
            });
        }

        //compare the password
        const hashPassword = await bcrypt.compare(password.toString(), admin.password)

        //when password not match
        if (!hashPassword) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    password: 'invalid password'
                }
            });
        }

        //create access token and refresh token
        const accessToken = createAccessToken({
            id: admin._id,
            role: admin.role
        });
        const refreshToken = createRefreshToken({
            id: admin._id,
            role: admin.role
        });

        //send refresh token as a cookie 
        res.cookie("refresh", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1d
        });

        res.status(200).json({
            code: 200,
            status: 'OK',
            data: {
                username: admin.username,
                role: admin.role,
                accessToken: accessToken
            }
        });

    } catch (error) {
        next(error)
    }
};

const logout = async (req, res, next) => {
    try {
        //clear cookie refresh token
        res.clearCookie('refresh', { path: '/' })
        res.status(200).json({
            code: 200,
            status: 'OK',
            data: {
                message: 'success logout'
            }
        })
    } catch (error) {
        next(error)
    }
}

const getStatistics = async (req, res, next) => {
    try {
        const freeCourse = await Course.count({
            price: {
                $eq: 0
            }
        })
        const totalCourse = await Course.count()
        const totalUser = await User.count({
            role: {
                $eq: 'user'
            }
        })

        res.status(200).json({
            code: 200,
            status: 'OK',
            data: {
                total_user: totalUser,
                total_course: totalCourse,
                free_course: freeCourse,
            }
        })

    } catch (error) {
        next(error)
    }
}

const adminController = {
    register,
    login,
    logout,
    getStatistics
}

export default adminController