# Blog Management API

A comprehensive blog management system built with Node.js, Express, and TypeScript. This API provides full CRUD operations for blog posts with advanced features like search, filtering, and author-based queries.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, Delete blog posts
- **Author-based Filtering**: Get all posts by a specific author
- **Keyword Search**: Search posts by keywords in title or content
- **Recent Posts**: Fetch the most recent posts with customizable limits
- **Statistics**: Get blog statistics including post counts and author information
- **TypeScript Support**: Full type safety and better development experience
- **Comprehensive Testing**: Jest test suite with high coverage
- **Docker Support**: Containerized deployment ready
- **Input Validation**: Robust validation for all endpoints
- **Error Handling**: Comprehensive error handling and logging
- **Security**: Helmet.js for security headers, CORS enabled

## 📁 Project Structure

```
blog-management-api/
├── src/
│   ├── controllers/
│   │   └── blogController.ts      # Request handlers
│   ├── models/
│   │   └── BlogPost.ts            # BlogPost class and interface
│   ├── services/
│   │   ├── BlogManager.ts         # Class-based blog management
│   │   └── functionalBlogManager.ts # Functional approach
│   ├── routes/
│   │   └── blogRoutes.ts          # API routes definition
│   ├── middleware/
│   │   └── errorHandler.ts        # Error handling middleware
│   ├── __tests__/
│   │   └── BlogManager.test.ts    # Test suite
│   └── app.ts                     # Main application file
├── dist/                          # Compiled JavaScript output
├── coverage/                      # Test coverage reports
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest testing configuration
├── .eslintrc.js                  # ESLint configuration
├── Dockerfile                    # Docker container setup
├── .gitignore                    # Git ignore patterns
└── README.md                     # This file
```

## 🛠️ Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```
   PORT=3000
   NODE_ENV=development
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm test` - Run the test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1/blog
```

### Endpoints

#### 1. Create a Blog Post
```http
POST /posts
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "author": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "My First Blog Post",
    "content": "This is the content of my blog post...",
    "author": "John Doe",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 2. Get All Blog Posts
```http
GET /posts
```

**Response:**
```json
{
  "success": true,
  "message": "Blog posts retrieved successfully",
  "data": [...],
  "count": 5
}
```

#### 3. Get Blog Post by ID
```http
GET /posts/:id
```

#### 4. Get Posts by Author
```http
GET /posts/author/:author
```

#### 5. Search Posts by Keyword
```http
GET /posts/search?keyword=javascript
```

#### 6. Get Recent Posts
```http
GET /posts/recent?limit=5
```

#### 7. Update Blog Post
```http
PUT /posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "Updated Author"
}
```

#### 8. Delete Blog Post
```http
DELETE /posts/:id
```

#### 9. Get Blog Statistics
```http
GET /posts/stats
```

**Response:**
```json
{
  "success": true,
  "message": "Blog statistics retrieved successfully",
  "data": {
    "totalPosts": 10,
    "totalAuthors": 3,
    "authorStats": {
      "John Doe": 5,
      "Jane Smith": 3,
      "Bob Johnson": 2
    },
    "mostRecentPost": {...}
  }
}
```

### Health Check
```http
GET /health
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🐳 Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t blog-management-api .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 --env-file .env blog-management-api
   ```

## 🏗️ Architecture

### Class-based Approach (Primary)
- **BlogPost Class**: Represents a blog post with encapsulated properties and methods
- **BlogManager Class**: Manages blog posts with full CRUD operations
- **Proper Encapsulation**: Private properties with public getters/setters
- **Type Safety**: Full TypeScript support with interfaces

### Functional Approach (Alternative)
- **Functional Methods**: Standalone functions for managing blog posts
- **Array-based Storage**: Simple array to store blog posts in memory
- **Stateless Functions**: Pure functions for better testability

### Key Design Decisions

1. **TypeScript**: Chosen for type safety and better development experience
2. **Express.js**: Lightweight and flexible web framework
3. **In-memory Storage**: Simple storage solution for demonstration purposes
4. **Modular Architecture**: Separation of concerns with controllers, services, and models
5. **Comprehensive Testing**: Jest for unit testing with high coverage
6. **Error Handling**: Centralized error handling with proper HTTP status codes

## 🔒 Security Features

- **Helmet.js**: Security headers for protection against common vulnerabilities
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Comprehensive validation for all endpoints
- **Error Sanitization**: Prevents sensitive information leakage

## 📈 Performance Considerations

- **Efficient Algorithms**: Optimized search and filtering operations
- **Memory Management**: Proper array handling and copying
- **Response Optimization**: Minimal data transfer with structured responses

## 🚀 Future Enhancements

- **Database Integration**: Add MongoDB or PostgreSQL support
- **Authentication**: JWT-based authentication system
- **Rate Limiting**: Implement API rate limiting
- **Caching**: Add Redis caching for frequently accessed data
- **File Upload**: Support for image uploads in blog posts
- **Pagination**: Implement pagination for large datasets
- **API Versioning**: Support for multiple API versions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you have any questions or need help getting started:

1. Check the API documentation above
2. Review the test files for usage examples
3. Open an issue on GitHub

## 🎯 Getting Started Guide

### Quick Start

1. **Install and run the API**
   ```bash
   npm install
   npm run dev
   ```

2. **Test the health endpoint**
   ```bash
   curl http://localhost:3000/health
   ```

3. **Create your first blog post**
   ```bash
   curl -X POST http://localhost:3000/api/v1/blog/posts \
     -H "Content-Type: application/json" \
     -d '{
       "title": "My First Post",
       "content": "Hello, World!",
       "author": "Your Name"
     }'
   ```

4. **Get all posts**
   ```bash
   curl http://localhost:3000/api/v1/blog/posts
   ```

### Development Workflow

1. **Make changes** to the TypeScript files in `src/`
2. **Run tests** to ensure everything works: `npm test`
3. **Check linting** for code quality: `npm run lint`
4. **Build the project** when ready: `npm run build`
5. **Start the production server**: `npm start`

Happy coding! 🎉