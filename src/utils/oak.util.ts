import { RouterContext } from "../../depts.ts";

export class OakUtils {
    public static async requestBody(context: RouterContext): Promise<any> {
        const body = context.request.body({ type: 'json' });
        const json = await body.value;

        return json;
    }

    public static getUser(context: RouterContext): any {
        let cookies: any = context.cookies;
        return cookies.user;
    }
}