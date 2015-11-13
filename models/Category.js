import mongoose, {Schema} from 'mongoose'

var CategorySchema  = new Schema({
    name: String,
    main: Boolean,
    parent: { type: Schema.Types.ObjectId, ref: 'Category' }
})

export default mongoose.model('Category', CategorySchema)
