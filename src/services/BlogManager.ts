import { BlogPost, IBlogPost } from '../models/BlogPost';

export class BlogManager {
  private posts: BlogPost[] = [];

  /**
   * Add a new blog post to the system
   */
  public addPost(blogPost: BlogPost): BlogPost {
    // Validation to prevent duplicate IDs
    if (this.findPostById(blogPost.id)) {
      throw new Error(`A post with ID '${blogPost.id}' already exists`);
    }

    this.posts.push(blogPost);
    return blogPost;
  }

  /**
   * Retrieve all blog posts
   */
  public getAllPosts(): BlogPost[] {
    return [...this.posts]; // Return a copy to prevent external mutation
  }

  /**
   * Find and return a blog post by its ID
   */
  public findPostById(id: string): BlogPost | undefined {
    return this.posts.find(post => post.id === id);
  }

  /**
   * Bonus: Retrieve all posts written by a specific author
   */
  public getPostsByAuthor(author: string): BlogPost[] {
    if (!author || author.trim().length === 0) {
      throw new Error('Author name cannot be empty');
    }
    
    return this.posts.filter(post => 
      post.author.toLowerCase().includes(author.toLowerCase().trim())
    );
  }

  /**
   * Bonus: Return posts containing a specific keyword in their title or content
   */
  public filterPostsByKeyword(keyword: string): BlogPost[] {
    if (!keyword || keyword.trim().length === 0) {
      throw new Error('Keyword cannot be empty');
    }

    const searchTerm = keyword.toLowerCase().trim();
    return this.posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Bonus: Fetch the most recent blog posts, limited by the given number
   */
  public getRecentPosts(limit: number): BlogPost[] {
    if (limit <= 0) {
      throw new Error('Limit must be a positive number');
    }

    return [...this.posts]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  /**
   * Update an existing blog post
   */
  public updatePost(id: string, updates: Partial<Omit<IBlogPost, 'id' | 'createdAt'>>): BlogPost {
    const post = this.findPostById(id);
    if (!post) {
      throw new Error(`Post with ID '${id}' not found`);
    }

    if (updates.title !== undefined) {
      post.title = updates.title;
    }
    if (updates.content !== undefined) {
      post.content = updates.content;
    }
    if (updates.author !== undefined) {
      post.author = updates.author;
    }

    return post;
  }

  /**
   * Delete a blog post by ID
   */
  public deletePost(id: string): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index === -1) {
      return false;
    }

    this.posts.splice(index, 1);
    return true;
  }

  /**
   * Get total number of posts
   */
  public getPostCount(): number {
    return this.posts.length;
  }
}