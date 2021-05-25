export class HelperFunctions {
    public static generateRandomString(nrOfChars: number): string {
        return Array(nrOfChars).fill(0).map((elt: number) => {
            return Math.ceil(Math.random() * 35).toString(36);
        }).join("");
    }

    public static generateNewDateNow(): string {
        return new Date().toISOString().split('T').join(' ').split('.')[0];
    }
}