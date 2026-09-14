import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { SAMPLE_PRODUCTS } from './src/data/products';
import { ProductReview, Order } from './src/types';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for interactive additions during session
  const products = [...SAMPLE_PRODUCTS];
  const orders: Order[] = [];
  const newsletterSubscribers: string[] = [];
  const contactInquiries: Array<{ name: string; email: string; subject: string; message: string; date: string }> = [];

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', brand: 'RED FOX Footwear', timestamp: new Date().toISOString() });
  });

  // GET /api/products
  app.get('/api/products', (req, res) => {
    const { category, search, sort, limit } = req.query;
    let result = [...products];

    if (category && category !== 'All') {
      if (category === 'Sale') {
        result = result.filter(p => p.isSale);
      } else {
        result = result.filter(p => p.category === category || p.gender === category);
      }
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (sort) {
      if (sort === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      } else if (sort === 'newest') {
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }
    }

    if (limit) {
      const num = parseInt(limit as string, 10);
      if (!isNaN(num)) {
        result = result.slice(0, num);
      }
    }

    res.json(result);
  });

  // GET /api/products/:id
  app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  });

  // POST /api/reviews
  app.post('/api/reviews', (req, res) => {
    const { productId, author, rating, title, comment } = req.body;
    const product = products.find(p => p.id === productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (!author || !rating || !title || !comment) {
      res.status(400).json({ error: 'Missing required review fields' });
      return;
    }

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      author: String(author).trim(),
      rating: Number(rating),
      date: 'Just now',
      title: String(title).trim(),
      comment: String(comment).trim(),
      verified: true
    };

    if (!product.reviews) {
      product.reviews = [];
    }
    product.reviews.unshift(newReview);
    product.reviewCount = product.reviews.length;
    product.rating = Number((product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviewCount).toFixed(1));

    res.json({ success: true, review: newReview, productRating: product.rating, reviewCount: product.reviewCount });
  });

  // POST /api/orders
  app.post('/api/orders', (req, res) => {
    const orderData = req.body as Order;
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      res.status(400).json({ error: 'No items in order' });
      return;
    }

    const orderId = `RF-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    };

    orders.push(createdOrder);
    res.status(201).json({ success: true, order: createdOrder });
  });

  // POST /api/newsletter
  app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res.status(400).json({ error: 'Valid email address required' });
      return;
    }
    newsletterSubscribers.push(email);
    res.json({
      success: true,
      message: 'Welcome to the RED FOX Pack! Check your inbox for your 15% discount code.',
      discountCode: 'REDFOX15'
    });
  });

  // POST /api/contact
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Please provide name, email, and message' });
      return;
    }
    contactInquiries.push({ name, email, subject: subject || 'General Inquiry', message, date: new Date().toISOString() });
    res.json({
      success: true,
      message: 'Thank you for reaching out to RED FOX Support! Our athletics team will respond within 24 hours.'
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express 4 wildcard
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RED FOX server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
