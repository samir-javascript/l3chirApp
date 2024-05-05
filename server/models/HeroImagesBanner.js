import mongoose from "mongoose";
const ImageHeroUploads = new mongoose.Schema({
     alt: {
        type: String,
     },
     image: {
        type: Object,
        required: true
     }
}, {
    timestamps: true
})
const HeroImagesModel = new mongoose.Schema({
    images: [ImageHeroUploads],
})
const HeroBannerImages = mongoose.models.HeroBannerImages || mongoose.model('HeroBannerImages', HeroImagesModel)
export default HeroBannerImages