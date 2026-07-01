const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    price:       { type: Number, required: true },
    category:    { type: String, required: true },
    stock:       { type: Number, default: 0 },
    rating:      { type: Number, default: 0 },
    reviews:     { type: Number, default: 0 },
    featured:    { type: Boolean, default: false },
    description: { type: String, default: '' },
    image:       { type: String, default: '' }, // local URL e.g. /uploads/filename.jpg
  },
  { timestamps: true }
)

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)
