const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const upload = require('../config/multer')
const requireAuth = require('../middleware/auth')

// GET /api/products  — list all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// GET /api/products/:id — single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

// POST /api/products — create product with optional image (admin only)
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const body = { ...req.body }
    if (req.file) {
      body.image = `/uploads/${req.file.filename}`
    }
    body.featured = body.featured === 'true' || body.featured === true
    body.price = Number(body.price) || 0
    body.stock = Number(body.stock) || 0

    const product = await Product.create(body)
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message || 'Failed to create product' })
  }
})

// PUT /api/products/:id — update product with optional new image (admin only)
router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const body = { ...req.body }
    if (req.file) {
      body.image = `/uploads/${req.file.filename}`
    }
    if (body.featured !== undefined) {
      body.featured = body.featured === 'true' || body.featured === true
    }
    if (body.price !== undefined) body.price = Number(body.price)
    if (body.stock !== undefined) body.stock = Number(body.stock)

    const product = await Product.findByIdAndUpdate(req.params.id, body, { new: true })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: err.message || 'Failed to update product' })
  }
})

// DELETE /api/products/:id (admin only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

module.exports = router
