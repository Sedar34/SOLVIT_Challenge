import { Request, Response } from 'express';
import { BlogPost } from '../models/BlogPost';
import { BlogManager } from '../services/BlogManager';
import { randomUUID } from 'crypto';

// Initialize blog manager
const blogManager = new BlogManager();

export class BlogController {
    /**
     * Create a new blog post
     */
    public static async createPost(req: Request, res: Response): Promise<void> {
        try {
            const { title, content, author } = req.body;

            // Validation
            if (!title || !content || !author) {
                res.status(400).json({
                    success: false,
                    message: 'Title, content, and author are required'
                });
                return;
            }

            // Generate unique ID
            const id = randomUUID();

            // Create new blog post
            const blogPost = new BlogPost(id, title, content, author);
            const createdPost = blogManager.addPost(blogPost);

            res.status(201).json({
                success: true,
                message: 'Blog post created successfully',
                data: createdPost.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create blog post'
            });
        }
    }

    /**
     * Get all blog posts
     */
    public static async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = blogManager.getAllPosts();

            res.status(200).json({
                success: true,
                message: 'Blog posts retrieved successfully',
                data: posts.map(post => post.toJSON()),
                count: posts.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to retrieve blog posts'
            });
        }
    }

    /**
     * Get a blog post by ID
     */
    public static async getPostById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const post = blogManager.findPostById(id as string);

            if (!post) {
                res.status(404).json({
                    success: false,
                    message: 'Blog post not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Blog post retrieved successfully',
                data: post.toJSON()
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to retrieve blog post'
            });
        }
    }

    /**
     * Get posts by author
     */
    public static async getPostsByAuthor(req: Request, res: Response): Promise<void> {
        try {
            const { author } = req.params;
            const posts = blogManager.getPostsByAuthor(author as string);

            res.status(200).json({
                success: true,
                message: `Posts by author '${author}' retrieved successfully`,
                data: posts.map(post => post.toJSON()),
                count: posts.length
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to retrieve posts by author'
            });
        }
    }

    /**
     * Search posts by keyword
     */
    public static async searchPosts(req: Request, res: Response): Promise<void> {
        try {
            const { keyword } = req.query;

            if (!keyword || typeof keyword !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Keyword query parameter is required'
                });
                return;
            }

            const posts = blogManager.filterPostsByKeyword(keyword);

            res.status(200).json({
                success: true,
                message: `Posts matching keyword '${keyword}' retrieved successfully`,
                data: posts.map(post => post.toJSON()),
                count: posts.length
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to search posts'
            });
        }
    }

    /**
     * Get recent posts
     */
    public static async getRecentPosts(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const posts = blogManager.getRecentPosts(limit);

            res.status(200).json({
                success: true,
                message: `${limit} most recent posts retrieved successfully`,
                data: posts.map(post => post.toJSON()),
                count: posts.length
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to retrieve recent posts'
            });
        }
    }

    /**
     * Update a blog post
     */
    public static async updatePost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { title, content, author } = req.body;

            const updatedPost = blogManager.updatePost(id as string, { title, content, author });

            res.status(200).json({
                success: true,
                message: 'Blog post updated successfully',
                data: updatedPost.toJSON()
            });
        } catch (error) {
            const statusCode = error instanceof Error && error.message.includes('not found') ? 404 : 400;
            res.status(statusCode).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to update blog post'
            });
        }
    }

    /**
     * Delete a blog post
     */
    public static async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = blogManager.deletePost(id as string);

            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Blog post not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Blog post deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to delete blog post'
            });
        }
    }

    /**
     * Get blog statistics
     */
    public static async getStats(req: Request, res: Response): Promise<void> {
        try {
            const totalPosts = blogManager.getPostCount();
            const allPosts = blogManager.getAllPosts();

            // Calculate authors statistics
            const authorStats = allPosts.reduce((acc, post) => {
                acc[post.author] = (acc[post.author] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            res.status(200).json({
                success: true,
                message: 'Blog statistics retrieved successfully',
                data: {
                    totalPosts,
                    totalAuthors: Object.keys(authorStats).length,
                    authorStats,
                    mostRecentPost: allPosts.length > 0 ? blogManager.getRecentPosts(1)[0]?.toJSON() : null
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to retrieve statistics'
            });
        }
    }
}