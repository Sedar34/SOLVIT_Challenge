import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes';
import { errorHandler, notFoundHandler } from './middleware/ErrorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Blog Management API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
app.use('/api/v1/blog', blogRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Blog Management API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api/v1/blog',
      documentation: {
        posts: {
          create: 'POST /api/v1/blog/createposts',
          getAll: 'GET /api/v1/blog/getAllposts',
          getById: 'GET /api/v1/blog/getByIdposts/:id',
          getByAuthor: 'GET /api/v1/blog/getPostsByAuthor/:author',
          search: 'GET /api/v1/blog/searchposts/:keyword',
          getRecent: 'GET /api/v1/blog/getRecentposts/:limit',
          update: 'PUT /api/v1/blog/updateposts/:id',
          delete: 'DELETE /api/v1/blog/deleteposts/:id',
          stats: 'GET /api/v1/blog/getStats'
        }
      }
    }
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Blog Management API is running on port ${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
});

export default app;