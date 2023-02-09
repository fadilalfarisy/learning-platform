import express from "express"
import { auth } from "../middleware/auth.js"
import usersController from '../controllers/users.controller.js'
import coursesController from "../controllers/courses.controller.js"
import categoryController from "../controllers/category.controller.js"

const user = express.Router()

user.post('/login', usersController.login)
user.get('/logout', usersController.logout)
user.post('/register', usersController.register)

//category
user.get('/course/category', auth, categoryController.getCategory)
user.get('/course/category/popular', auth, coursesController.getPopularCategory)

//course
user.get('/courses', auth, coursesController.getCourses)
user.get('/course/:id', auth, coursesController.getCourseById)


export default user