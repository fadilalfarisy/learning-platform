import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

const validateObjectId = (id) => {
    if (ObjectId.isValid(id)) {
        return true
    } else {
        return false
    }
}

export default validateObjectId