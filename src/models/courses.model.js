import mongoose from "mongoose";
import Category from "./category.model.js";

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    enroll: {
        type: Number,
        required: true,
        default: 0
    },
    course_image: {
        public_id: String,
        url: String
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Course = mongoose.model("Course", courseSchema);

export default Course