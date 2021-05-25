import { RouterContext } from '../../depts.ts'
import { OakUtils } from "../utils/oak.util.ts";
import { verify } from '../../depts.ts'
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

                context.cookies.set('user', JSON.stringify(decoded));

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