import User from '../models/users.model.js'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../libs/token.js'

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
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    username: 'username already used'
                }
            });
        }

        //default value role when user register
        let role = 'user'

        const newUser = await User.create({
            username,
            password: password.toString(),
            role
        });

        //create access token and refresh token
        const accessToken = createAccessToken({
            id: newUser.id,
            role: role
        });
        const refreshToken = createRefreshToken({
            id: newUser.id,
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

        //check username user is exist
        const user = await User.findOne({
            username: username,
            role: 'user'
        })

        //when username user is not found
        if (!user) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    username: 'username not found'
                }
            });
        }

        //compare the password
        const hashPassword = await bcrypt.compare(password.toString(), user.password)

        //when password is not match
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
            id: user._id,
            role: user.role
        });
        const refreshToken = createRefreshToken({
            id: user._id,
            role: user.role
        });

        //send refresh token as a cookie 
        res.cookie("refresh", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //1d
        });

        res.status(200).json({
            code: 200,
            status: 'OK',
            data: {
                username: user.username,
                role: user.role,
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

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({ role: 'user' })
        res.status(200).json({
            code: 200,
            status: 'OK',
            data: {
                users
            }
        })
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedAdmin = await User.deleteOne({ _id: id })
        //when no one admin is deleted
        if (deletedAdmin.deletedCount === 0) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    id: 'user not found'
                }
            });
        }
        res.status(200).json({
            code: 200,
            status: 'OK',
            data: {
                message: 'success deleted user'
            }
        })
    } catch (error) {
        next(error)
    }
}

const usersController = {
    register,
    login,
    logout,
    getUsers,
    deleteUser
}

export default usersController