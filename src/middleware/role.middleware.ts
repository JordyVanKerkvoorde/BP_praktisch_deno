import { RouterContext } from "../../depts.ts";
import { Roles } from "../domain/role.enum.ts";
import { OakUtils } from "../utils/oak.util.ts";

class RoleMiddleware {
    init() {
        let middleware = Object.create(null);
        // dynamically allocate functions for simplified role guarding
        Object.keys(Roles).forEach(role => {
            middleware[role.toLocaleLowerCase()] = (context: RouterContext, next: any) => {
                
                const userRole = (OakUtils.getUser(context)).role;
                if(userRole === role) return next();
                else return context.throw(403);
            } 
        })

        return middleware;
    }
}

export const roleMiddleware = new RoleMiddleware().init();