import { RouterContext } from '../../deps.ts'
import { verify } from '../../deps.ts'
import config from "../config.ts";

class AuthMiddleware {
    public async authenticate(context: RouterContext, next: any) {
        try{
            const header = context.request.headers.get('Authorization');

            if(typeof header !== 'undefined') {
                const bearer = header!.split(' ')[1];
                // const decoded: any = jwt.verify(bearer, config.jwt.secret);
                // req.auth = {
                //     user: decoded.user
                // };
                const decoded: any = await verify(bearer, config.jwt.secret, "HS512");
                let cookies: any = context.cookies;
                cookies.user = decoded;
                context.cookies = cookies;

                return next();
            } else {
                context.throw(401);
            }
        } catch(err) {
            console.error(err);
            context.throw(501);
        }
    }
}

export const authMiddleware = new AuthMiddleware();