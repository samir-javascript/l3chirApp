import mongoose from "mongoose"
const CategoriesModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Categories = mongoose.models.Categories || mongoose.model('Categories', CategoriesModel)
export default Categories