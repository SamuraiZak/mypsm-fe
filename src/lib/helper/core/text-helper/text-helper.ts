// ===============================================================
// Text Helper
// ===============================================================

export class TextHelper {
    static toCamelCase(keyword: string) {
        const words = keyword.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(" ");

    }
}