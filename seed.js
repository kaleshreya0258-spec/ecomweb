require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const products = [
  {
    name: 'Premium Dog Kibble – Chicken & Rice',
    price: 1299,
    category: 'Dogs',
    stock: 54,
    rating: 4.8,
    reviews: 212,
    featured: true,
    description: 'High-protein dry food with real chicken and wholesome rice. No artificial colours or preservatives.',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&h=400&fit=crop&auto=format',
  },
  {
    name: 'Cat Scratching Post Tower',
    price: 2499,
    category: 'Cats',
    stock: 22,
    rating: 4.6,
    reviews: 98,
    featured: true,
    description: 'Multi-level sisal scratching post with cosy perch. Keeps claws healthy and furniture safe.',
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&h=400&fit=crop&auto=format',
  },
  {
    name: 'Retractable Dog Leash – 5m',
    price: 599,
    category: 'Dogs',
    stock: 87,
    rating: 4.3,
    reviews: 64,
    featured: false,
    description: 'Ergonomic grip with one-button brake. Suitable for dogs up to 30 kg.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=400&fit=crop&auto=format',
  },
  {
    name: 'Budgie Starter Cage Kit',
    price: 3499,
    category: 'Birds',
    stock: 11,
    rating: 4.5,
    reviews: 31,
    featured: false,
    description: 'Complete cage with perches, feeders, swing, and a bag of seed mix. Perfect for new bird owners.',
    image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=500&h=400&fit=crop&auto=format',
  },
  {
    name: 'Aquarium Starter Tank – 20L',
    price: 1999,
    category: 'Fish',
    stock: 16,
    rating: 4.7,
    reviews: 52,
    featured: true,
    description: 'Includes filter, LED light, and gravel. Everything you need to set up a healthy tank.',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500&h=400&fit=crop&auto=format',
  },
  {
    name: 'Hamster Habitat Deluxe',
    price: 1749,
    category: 'Small Pets',
    stock: 34,
    rating: 4.4,
    reviews: 40,
    featured: false,
    description: 'Spacious multi-level habitat with tubes, wheel, and hideout for hamsters or gerbils.',
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500&h=400&fit=crop&auto=format',
  },
  {
    name: 'Grain-Free Cat Wet Food (Pack of 12)',
    price: 849,
    category: 'Cats',
    stock: 120,
    rating: 4.9,
    reviews: 301,
    featured: true,
    description: 'Tender chunks in gravy, made with real salmon and tuna. Grain-free recipe for sensitive tummies.',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=500&h=400&fit=crop&auto=format',
  },
  {
    name: 'Interactive Dog Puzzle Toy',
    price: 799,
    category: 'Dogs',
    stock: 60,
    rating: 4.2,
    reviews: 77,
    featured: false,
    description: 'Treat-dispensing puzzle toy that keeps dogs mentally stimulated and reduces boredom.',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&h=400&fit=crop&auto=format',
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB connected')

    await Product.deleteMany({})
    console.log('🗑️  Cleared products collection')

    await Product.insertMany(products)
    console.log(`✅ Seeded ${products.length} products successfully!`)

    process.exit(0)
  } catch (err) {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  }
}

seed()
