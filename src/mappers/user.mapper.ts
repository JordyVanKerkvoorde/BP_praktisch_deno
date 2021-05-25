import BaseMapper from "./base.mapper.ts";

class UserMapper extends BaseMapper<any>{
    public fromClientFormatSingle(object: any) {
        throw new Error("Method not implemented.");
    }

    public toClientFormatSingle(user: any) {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            role: user.role
        };
    }

}

export const userMapper = new UserMapper();