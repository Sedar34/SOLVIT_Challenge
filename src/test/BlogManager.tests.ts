import { BlogPost } from '../models/BlogPost';
import { BlogManager } from '../services/BlogManager';

describe('BlogManager', () => {
  let blogManager: BlogManager;
  let samplePost: BlogPost;

  beforeEach(() => {
    blogManager = new BlogManager();
    samplePost = new BlogPost('1', 'Test Title', 'Test Content', 'Test Author');
  });

  describe('addPost', () => {
    it('should add a new post successfully', () => {
      const result = blogManager.addPost(samplePost);
      expect(result).toBe(samplePost);
      expect(blogManager.getPostCount()).toBe(1);
    });

    it('should throw error for duplicate ID', () => {
      blogManager.addPost(samplePost);
      const duplicatePost = new BlogPost('1', 'Another Title', 'Another Content', 'Another Author');
      
      expect(() => blogManager.addPost(duplicatePost)).toThrow("A post with ID '1' already exists");
    });
  });

  describe('getAllPosts', () => {
    it('should return empty array when no posts exist', () => {
      const posts = blogManager.getAllPosts();
      expect(posts).toEqual([]);
    });

    it('should return all posts', () => {
      const post2 = new BlogPost('2', 'Title 2', 'Content 2', 'Author 2');
      
      blogManager.addPost(samplePost);
      blogManager.addPost(post2);
      
      const posts = blogManager.getAllPosts();
      expect(posts).toHaveLength(2);
      // expect(posts[0].id).toBe('1');
      // expect(posts[1].id).toBe('2');
    });

    it('should return a copy of posts array', () => {
      blogManager.addPost(samplePost);
      const posts = blogManager.getAllPosts();
      
      posts.push(new BlogPost('2', 'Title 2', 'Content 2', 'Author 2'));
      expect(blogManager.getPostCount()).toBe(1);
    });
  });

  describe('findPostById', () => {
    it('should return undefined for non-existent ID', () => {
      const result = blogManager.findPostById('999');
      expect(result).toBeUndefined();
    });

    it('should return the correct post for existing ID', () => {
      blogManager.addPost(samplePost);
      const result = blogManager.findPostById('1');
      
      expect(result).toBe(samplePost);
      expect(result?.title).toBe('Test Title');
    });
  });

  describe('getPostsByAuthor', () => {
    beforeEach(() => {
      blogManager.addPost(new BlogPost('1', 'Post 1', 'Content 1', 'John Doe'));
      blogManager.addPost(new BlogPost('2', 'Post 2', 'Content 2', 'Jane Smith'));
      blogManager.addPost(new BlogPost('3', 'Post 3', 'Content 3', 'John Doe'));
    });

    it('should return posts by specific author', () => {
      const posts = blogManager.getPostsByAuthor('John Doe');
      expect(posts).toHaveLength(2);
      expect(posts.every(post => post.author === 'John Doe')).toBe(true);
    });

    it('should return empty array for non-existent author', () => {
      const posts = blogManager.getPostsByAuthor('Non Existent');
      expect(posts).toHaveLength(0);
    });

    it('should throw error for empty author name', () => {
      expect(() => blogManager.getPostsByAuthor('')).toThrow('Author name cannot be empty');
    });
  });

  describe('filterPostsByKeyword', () => {
    beforeEach(() => {
      blogManager.addPost(new BlogPost('1', 'JavaScript Tutorial', 'Learn JavaScript basics', 'Author 1'));
      blogManager.addPost(new BlogPost('2', 'Python Guide', 'Python programming tutorial', 'Author 2'));
      blogManager.addPost(new BlogPost('3', 'Web Development', 'JavaScript and HTML basics', 'Author 3'));
    });

    it('should filter posts by keyword in title', () => {
      const posts = blogManager.filterPostsByKeyword('JavaScript');
      expect(posts).toHaveLength(2);
    });

    it('should filter posts by keyword in content', () => {
      const posts = blogManager.filterPostsByKeyword('tutorial');
      expect(posts).toHaveLength(2);
    });

    it('should be case insensitive', () => {
      const posts = blogManager.filterPostsByKeyword('javascript');
      expect(posts).toHaveLength(2);
    });

    it('should throw error for empty keyword', () => {
      expect(() => blogManager.filterPostsByKeyword('')).toThrow('Keyword cannot be empty');
    });
  });

  describe('getRecentPosts', () => {
    beforeEach(() => {
      // Add posts with slight delay to ensure different timestamps
      blogManager.addPost(new BlogPost('1', 'Old Post', 'Content 1', 'Author 1'));
      setTimeout(() => {
        blogManager.addPost(new BlogPost('2', 'Newer Post', 'Content 2', 'Author 2'));
      }, 1);
      setTimeout(() => {
        blogManager.addPost(new BlogPost('3', 'Newest Post', 'Content 3', 'Author 3'));
      }, 2);
    });

    // it('should return posts in descending order by creation date', () => {
    //   const posts = blogManager.getRecentPosts(3);
    //   expect(posts).toHaveLength(3);
      
    //   // Check that posts are ordered by creation date (newest first)
    //   for (let i = 0; i < posts.length - 1; i++) {
    //     expect(posts[i].createdAt.getTime()).toBeGreaterThanOrEqual(
    //       posts[i + 1].createdAt.getTime()
    //     );
    //   }
    // });

    it('should limit the number of posts returned', () => {
      const posts = blogManager.getRecentPosts(2);
      expect(posts).toHaveLength(2);
    });

    it('should throw error for invalid limit', () => {
      expect(() => blogManager.getRecentPosts(0)).toThrow('Limit must be a positive number');
      expect(() => blogManager.getRecentPosts(-1)).toThrow('Limit must be a positive number');
    });
  });

  describe('updatePost', () => {
    beforeEach(() => {
      blogManager.addPost(samplePost);
    });

    it('should update post title', () => {
      const updated = blogManager.updatePost('1', { title: 'Updated Title' });
      expect(updated.title).toBe('Updated Title');
      expect(updated.content).toBe('Test Content'); // Should remain unchanged
    });

    it('should update post content', () => {
      const updated = blogManager.updatePost('1', { content: 'Updated Content' });
      expect(updated.content).toBe('Updated Content');
      expect(updated.title).toBe('Test Title'); // Should remain unchanged
    });

    it('should throw error for non-existent post', () => {
      expect(() => blogManager.updatePost('999', { title: 'New Title' }))
        .toThrow("Post with ID '999' not found");
    });
  });

  describe('deletePost', () => {
    beforeEach(() => {
      blogManager.addPost(samplePost);
    });

    it('should delete existing post', () => {
      const result = blogManager.deletePost('1');
      expect(result).toBe(true);
      expect(blogManager.getPostCount()).toBe(0);
    });

    it('should return false for non-existent post', () => {
      const result = blogManager.deletePost('999');
      expect(result).toBe(false);
      expect(blogManager.getPostCount()).toBe(1); // Should remain unchanged
    });
  });

  describe('getPostCount', () => {
    it('should return 0 when no posts exist', () => {
      expect(blogManager.getPostCount()).toBe(0);
    });

    it('should return correct count', () => {
      blogManager.addPost(samplePost);
      blogManager.addPost(new BlogPost('2', 'Title 2', 'Content 2', 'Author 2'));
      
      expect(blogManager.getPostCount()).toBe(2);
    });
  });
});