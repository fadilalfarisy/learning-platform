import express from 'express'
import user from './users.route.js'
import admin from './admin.route.js'
import tokenController from '../controllers/token.controller.js'

const router = express.Router()

router.use('/user', user)
router.use('/admin', admin)
router.get('/token', tokenController.checkRefreshToken)

export default router