import mongoose, {Schema} from 'mongoose'

var CategorySchema  = new Schema({
    name: String,
    main: Boolean
});

export default mongoose.model('Category', CategorySchema)
