// ===============================================================
// TextHelper
// ===============================================================

export class TextAppearanceHelper {
    static toCamelCase(keyword: string) {
        const words = keyword.split(' ');

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(' ');
    }
    static toProper(keyword: string) {
        keyword = keyword.toLowerCase();
        const words = keyword.split(' ');

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        return words.join(' ');
    }
}
