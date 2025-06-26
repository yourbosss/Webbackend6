import * as multer from 'multer';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
      
    }

    namespace Multer {
      interface File {
        path: string; 
      }
    }
  }
}

export {};
