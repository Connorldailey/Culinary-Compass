declare namespace Express {
    interface Request {
      user?: {
<<<<<<< HEAD
        id: any;
=======
        id: number;
>>>>>>> 7659945123ff53697481207520432e3ba97f774d
        username: string;
      };
    }
  }