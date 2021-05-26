import { userService } from '../services/user.service.ts';
import { userMapper } from '../mappers/user.mapper.ts';
import { RouterContext } from '../../depts.ts';
import { OakUtils } from "../utils/oak.util.ts";

class UserController {

    async register(context: RouterContext) {
        try {
            const user = await userService.register(await OakUtils.requestBody(context));

            context.response.body = user;
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }
    
    async login(context: RouterContext) {
        try {
            const token = await userService.login(await OakUtils.requestBody(context));

            context.response.body = token;
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }

    async me(context: RouterContext) {
        try {
            //usermapper en //req.auth
            context.response.body = userMapper.toClientFormatSingle(OakUtils.getUser(context));
        } catch(err) {
            console.error(err);
            context.throw(500);
        }
    }
}

export const userController = new UserController();