import { v4 as uuidv4 } from '../../deps.ts';

export class UuidUtil {
    public static uuid4(): string{
        return uuidv4.generate();
    }
}