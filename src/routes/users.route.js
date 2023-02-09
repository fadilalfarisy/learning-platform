import express from "express"
import { auth, adminAuth } from "../middleware/auth.js"
import usersController from '../controllers/users.controller.js'
import coursesController from "../controllers/courses.controller.js"
import categoryController from "../controllers/category.controller.js"

const user = express.Router()

user.post('/login', usersController.login)
user.get('/logout', usersController.logout)
user.post('/register', usersController.register)

//category
user.get('/course/category', categoryController.getCategory)
user.get('/course/category/popular', coursesController.getPopularCategory)

//course
user.get('/courses', coursesController.getCourses)
user.get('/course/:id', coursesController.getCourseById)


export default user