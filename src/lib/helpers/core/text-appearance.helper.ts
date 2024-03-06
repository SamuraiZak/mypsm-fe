// ===============================================================
// TextHelper
// ===============================================================

export class TextAppearanceHelper {
    static toCamelCase(keyword: string) {
        if (keyword.length <= 0) {
            return keyword;
        } else {
            
            const words = keyword.split(' ');
    
            for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
    
            return words.join(' ');
        }
    }
    static toProper(keyword: string) {

        if (keyword.length <= 0) {
            return keyword;
        } else {
            
            keyword = keyword.toLowerCase();
            const words = keyword.split(' ');
    
            for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
    
            return words.join(' ');
        }
    }
}
