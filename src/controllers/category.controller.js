import Category from '../models/category.model.js'

const createCategory = async (req, res, next) => {
    const { category_name } = req.body
    try {
        //check required field
        if (!category_name) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    category_name: 'must not be null',
                }
            });
        }

        //create new category
        const newCategory = await Category.create({
            category_name
        });

        res.status(201).json({
            code: 201,
            status: 'CREATED',
            data: newCategory
        });

    } catch (error) {
        next(error)
    }
}

const getCategory = async (req, res, next) => {
    try {
        const category = await Category.find().select('-__v')

        res.status(200).json({
            code: 200,
            status: 'OK',
            data: category
        });

    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    const { id } = req.params
    const { category_name } = req.body
    try {
        //check required field
        if (!category_name) {
            return res.status(400).json({
                code: 400,
                status: 'BAD_REQUEST',
                errors: {
                    category_name: 'must not be null',
                }
            });
        }

        const category = await Category.findOne({ _id: id })
        //when id category is not found
        if (!category) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    id: 'category not found'
                }
            });
        }

        await Category.updateOne({ _id: id }, {
            $set: {
                category_name
            }
        })

        res.status(201).json({
            code: 201,
            status: 'CREATED',
            data: {
                message: 'success updated category'
            }
        })

    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedCategory = await Category.deleteOne({ _id: id })
        //when no one category is deleted
        if (deletedCategory.deletedCount === 0) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                errors: {
                    id: 'category not found'
                }
            });
        }

        res.status(200).json({
            code: 200,
            status: 'OK',
            data: {
                message: 'success deleted category'
            }
        })

    } catch (error) {
        next(error)
    }
}

const categoryController = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
}

export default categoryController