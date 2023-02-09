import express from "express"
import multer from "multer"
import { auth, adminAuth } from "../middleware/auth.js"
import adminController from '../controllers/admin.controller.js'
import usersController from "../controllers/users.controller.js"
import coursesController from "../controllers/courses.controller.js"
import categoryController from "../controllers/category.controller.js"

//config images filename
const filestorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}+${file.originalname}`)
    }
})

//allow image with format jpeg, jpg, or png only
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: filestorage, fileFilter: fileFilter })

const admin = express.Router()

admin.post('/login', adminController.login)
admin.get('/logout', adminController.logout)
admin.post('/register', adminController.register)

// admin.get('/admin', adminController.getAdmin)
// admin.delete('/admin/:id', adminController.deleteAdmin)

//crud category
admin.get('/category', auth, adminAuth, categoryController.getCategory)
admin.post('/category', auth, adminAuth, categoryController.createCategory)
admin.put('/category/:id', auth, adminAuth, categoryController.updateCategory)
admin.delete('/category/:id', auth, adminAuth, categoryController.deleteCategory)

//crud courses
admin.get('/courses', auth, adminAuth, coursesController.getCourses)
admin.get('/course/:id', auth, adminAuth, coursesController.getCourseById)
admin.post('/course', auth, adminAuth, upload.single('course_image'), coursesController.createCourse)
admin.put('/course/:id', auth, adminAuth, upload.single('course_image'), coursesController.updateCourse)
admin.delete('/course/:id', auth, adminAuth, coursesController.deleteCourse)

//crud users
admin.get('/users', auth, adminAuth, usersController.getUsers)
admin.delete('/user/:id', auth, adminAuth, usersController.deleteUser)

//statistics
admin.get('/statistics', auth, adminAuth, adminController.getStatistics)

export default admin