import mongoose from 'mongoose'
import Course from '../models/courses.model.js'
import cloudinary from '../libs/cloudinary.js'

const createCourse = async (req, res, next) => {
    const {
        course_name,
        price,
        enroll,
        category_id,
    } = req.body
    const { path: pathCourseImage } = req.file
    try {
        //check required field
        if (!course_name || !price || !category_id || !pathCourseImage) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    course_name: 'must not be null',
                    price: 'must not be null',
                    category_id: 'must not be null',
                    course_image: 'must not be null'
                }
            });
        }

        //upload course image to cloudinary
        const uploadCourseImage = await cloudinary.uploader.upload(pathCourseImage)

        const newCourse = await Course.create({
            course_name,
            price,
            enroll,
            category_id,
            course_image: {
                public_id: uploadCourseImage.public_id,
                url: uploadCourseImage.secure_url
            }
        })

        res.status(201).json({
            code: 201,
            status: 'CREATED',
            data: newCourse
        })

    } catch (error) {
        next(error)
    }
}

const getCourses = async (req, res, next) => {
    try {
        let { search, price } = req.query
        let query = {}
        let sorting = { '_id': 1 }

        //filter by search keyword
        if (search) {
            query = {
                ...query,
                'course_name': {
                    $regex: search,
                    $options: "i"
                }
            }
        }

        //sort by price lowest or highest
        if (price.toLowerCase() === 'lowest') {
            sorting = { 'price': 1 }
        }
        if (price.toLowerCase() === 'highest') {
            sorting = { 'price': -1 }
        }

        const courses = await Course.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category_course'
                },
            }, {
                $unwind: '$category_course'
            }, {
                $match: query
            }, {
                $sort: sorting
            }, {
                $project: {
                    _id: 1,
                    course_image: '$course_image.url',
                    course_name: 1,
                    price: 1,
                    enroll: 1,
                    category: '$category_course.category_name'
                }
            }
        ])
        res.status(200).json({
            code: 200,
            status: 'OK',
            data: courses
        })

    } catch (error) {
        next(error)
    }
}

const getCourseById = async (req, res, next) => {
    const { id } = req.params
    try {
        const course = await Course.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category_course'
                },
            }, {
                $unwind: '$category_course'
            }, {
                $match: { _id: mongoose.Types.ObjectId(id) }
            }, {
                $project: {
                    _id: 1,
                    course_image: '$course_image.url',
                    course_name: 1,
                    price: 1,
                    enroll: 1,
                    category: '$category_course.category_name'
                }
            }
        ])

        //when id course not found
        if (!course) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    id: 'course not found'
                }
            });
        }

        res.status(200).json({
            code: 200,
            status: 'OK',
            data: course[0]
        })

    } catch (error) {
        next(error)
    }
}

const updateCourse = async (req, res, next) => {
    const { id } = req.params
    const {
        course_name,
        price,
        enroll,
        category_id,
    } = req.body
    try {
        //check required field
        if (!course_name || !price || !category_id) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    course_name: 'must not be null',
                    price: 'must not be null',
                    category_id: 'must not be null',
                }
            });
        }

        const existingCourse = await Course.findOne({ _id: id })
        //when id course not found
        if (!existingCourse) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    id: 'course not found'
                }
            });
        }

        let public_id_course_image, url_course_image = ''

        //when course image not updated
        if (!req.file) {
            public_id_course_image = existingCourse.course_image.public_id
            url_course_image = existingCourse.course_image.url
        }

        //when course image is updated
        if (req.file) {
            const { path: pathCourseImage } = req.file

            //check course image
            if (existingCourse.course_image.public_id) {
                //delete image from cloudinary
                cloudinary.uploader.destroy(existingCourse.course_image.public_id)
                    .then(result => console.log(result))
            }

            //uploead new course image
            const uploadCourseImage = await cloudinary.uploader.upload(pathCourseImage)

            public_id_course_image = uploadCourseImage.public_id
            url_course_image = uploadCourseImage.secure_url
        }

        await Course.updateOne({
            _id: id
        }, {
            $set: {
                course_name,
                price,
                enroll,
                category_id,
                course_image: {
                    public_id: public_id_course_image,
                    url: url_course_image
                },
            }
        })

        res.status(201).json({
            code: 201,
            status: 'CREATED',
            data: {
                message: 'success updated course'
            }
        })

    } catch (error) {
        next(error)
    }
}

const deleteCourse = async (req, res, next) => {
    const { id } = req.params
    try {
        const existingCourse = await Course.findOne({ _id: id })
        //when id course not found
        if (!existingCourse) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    id: 'course not found'
                }
            });
        }

        //delete image from cloudinary
        if (existingCourse.course_image.public_id) {
            cloudinary.uploader.destroy(existingCourse.course_image.public_id)
                .then(result => console.log(result))
        }

        const deletedCourse = await Course.deleteOne({ _id: id })
        //when no one course is deleted
        if (deletedCourse.deletedCount === 0) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    id: 'course not found'
                }
            });
        }

        res.status(200).json({
            code: 200,
            status: 'OK',
            data: {
                message: 'success deleted course'
            }
        })

    } catch (error) {
        next(error)
    }
}


const getPopularCategory = async (req, res, next) => {
    try {
        const popularCategory = await Course.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category_course'
                },
            }, {
                $unwind: '$category_course'
            }, {
                $sort: { enroll: -1 }
            }, {
                $limit: 3
            }, {
                $project: {
                    _id: 0,
                    _id: "$category_course._id",
                    category_name: "$category_course.category_name"
                }
            }
        ])

        res.status(200).json({
            code: 200,
            status: 'OK',
            data: popularCategory
        })

    } catch (error) {
        next(error)
    }
}

const coursesController = {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getPopularCategory
}

export default coursesController