import mongoose from "mongoose";
const SocialProofSchema = new mongoose.Schema({
   
        
            user: {
                 type: mongoose.Schema.Types.ObjectId,
                 required: true,
                 ref: "User"
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        
     
}, { timestamps: true });

const Testimonials = mongoose.models.Testimonials || mongoose.model('Testimonials', SocialProofSchema);

export default Testimonials;
