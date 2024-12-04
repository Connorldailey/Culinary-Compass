declare namespace Express {
    interface Request {
      user?: {
        id: any;
        username: string;
      };
    }
  }