import Cors from 'cors';

export const corsMiddleware = Cors({
    methods: ['GET', 'HEAD', 'POST'],
    origin: '*',
});

export async function runMiddleware(req, res, middleware) {
  return new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
          if (result instanceof Error) {
              return reject(result);
          }
          return resolve(result);
      });
  });
}
