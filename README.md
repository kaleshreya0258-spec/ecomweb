# PawMart Backend (Express + Node.js + MongoDB + Multer)

A standalone Express.js backend that replaces the previous Next.js API routes + Cloudinary setup. Images are now stored **locally** on disk via **Multer** instead of Cloudinary.

## Setup

```bash
cd pawmart-backend
npm install
```

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pawmart
JWT_SECRET=change-this-to-a-long-random-secret
ADMIN_EMAIL=admin@pawmart.com
ADMIN_PASSWORD=pawmart123
FRONTEND_URL=http://localhost:3000
```

## Run

```bash
npm run dev      # with nodemon (auto-restart)
# or
npm start        # plain node
```

Server runs at `http://localhost:5000`

## Folder structure

```
pawmart-backend/
├── server.js          # Express app entry point
├── config/
│   ├── db.js          # MongoDB connection
│   └── multer.js       # Local image upload config
├── models/
│   ├── Product.js
│   └── Admin.js
├── routes/
│   ├── products.js    # CRUD + image upload
│   └── auth.js        # login/logout
├── middleware/
│   └── auth.js         # JWT route protection
└── uploads/            # uploaded images saved here
```

## API Endpoints

| Method | Endpoint              | Auth | Description           |
|--------|------------------------|------|------------------------|
| GET    | `/api/products`        | No   | List all products     |
| GET    | `/api/products/:id`    | No   | Get single product    |
| POST   | `/api/products`        | Yes  | Create product (multipart/form-data, field `image`) |
| PUT    | `/api/products/:id`    | Yes  | Update product        |
| DELETE | `/api/products/:id`    | Yes  | Delete product        |
| POST   | `/api/auth/login`      | No   | Admin login → returns JWT |
| POST   | `/api/auth/logout`     | No   | Clear cookie          |

Uploaded images are served at: `http://localhost:5000/uploads/<filename>`

## Default admin login

On first login attempt, the admin account is auto-created from your `.env`:
```
Email: admin@pawmart.com
Password: pawmart123
```

## Connecting from the Next.js frontend

In your Next.js `.env.local`, add:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Then call the API like:
```js
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
```

For protected routes, send the JWT:
```js
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: formData, // FormData with image file + fields
})
```
