export interface IBlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
  }
  
  export class BlogPost implements IBlogPost {
    private _id: string;
    private _title: string;
    private _content: string;
    private _author: string;
    private _createdAt: Date;
  
    constructor(id: string, title: string, content: string, author: string) {
      this._id = id;
      this._title = title;
      this._content = content;
      this._author = author;
      this._createdAt = new Date();
    }
  
    // Getters
    public get id(): string {
      return this._id;
    }
  
    public get title(): string {
      return this._title;
    }
  
    public get content(): string {
      return this._content;
    }
  
    public get author(): string {
      return this._author;
    }
  
    public get createdAt(): Date {
      return this._createdAt;
    }
  
    // Setters
    public set title(title: string) {
      if (!title || title.trim().length === 0) {
        throw new Error('Title cannot be empty');
      }
      this._title = title.trim();
    }
  
    public set content(content: string) {
      if (!content || content.trim().length === 0) {
        throw new Error('Content cannot be empty');
      }
      this._content = content.trim();
    }
  
    public set author(author: string) {
      if (!author || author.trim().length === 0) {
        throw new Error('Author cannot be empty');
      }
      this._author = author.trim();
    }
  
    // Convert to JSON for API responses
    public toJSON(): IBlogPost {
      return {
        id: this._id,
        title: this._title,
        content: this._content,
        author: this._author,
        createdAt: this._createdAt
      };
    }
  
    // Static method to create from plain object
    public static fromObject(obj: IBlogPost): BlogPost {
      const post = new BlogPost(obj.id, obj.title, obj.content, obj.author);
      post._createdAt = new Date(obj.createdAt);
      return post;
    }
  }