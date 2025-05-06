import { MessagesKey } from '../../helpers/messages/messagesKey';
import { getMessage } from '../../helpers/messages/messagesUtil';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export class Middleware {
  protected static module = 'erp_in';
  private static key = process.env.JWT_SECRET;

  protected static translateJWT(token: string): JwtPayload | null {
    try {
      if (!this.key) {
        return null;
      }

      const decodedToken = jwt.verify(token, this.key);

      return decodedToken as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  public static async MiddlewareContext(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: getMessage(req, MessagesKey.MISSINGTOKEN) });
    }

    const token = authorization.split(' ')[1];
    const decodedToken = this.translateJWT(token);

    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: getMessage(req, MessagesKey.INVALIDTOKEN) });
    }

    req.headers['role_pkid'] = decodedToken.role_id?.toString();

    next();
  }

  public static AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    Middleware.MiddlewareContext(req, res, next);
  }
}
