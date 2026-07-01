const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    let admin = await Admin.findOne({ email })

    // Auto-seed the default admin on first run (uses env credentials)
    if (!admin && email === process.env.ADMIN_EMAIL) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
      admin = await Admin.create({ email, password: hashed, name: 'Admin User' })
    }

    if (!admin) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie('pawmart_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    })

    res.json({ token, admin: { email: admin.email, name: admin.name } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('pawmart_token')
  res.json({ success: true })
})

module.exports = router
