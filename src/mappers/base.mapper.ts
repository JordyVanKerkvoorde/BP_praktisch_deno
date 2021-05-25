export default abstract class BaseMapper<T>{
    public abstract fromClientFormatSingle(object: any): any;

    public fromClientFormatMultiple(objects: any[]): any[]{
        return objects.map((object: T): any[] => this.fromClientFormatSingle(object));
    }

    public abstract toClientFormatSingle(object: T): any;

    public toClientFormatMultiple(objects: T[]): any[] {
        return objects.map((object: T): any[] => this.toClientFormatSingle(object));
    }
}