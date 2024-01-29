// ===============================================================
// Text Translation Helper
// ===============================================================

import { textLibrary } from "$lib/constants/core/text-translation-constant";

export class TranslationHelper {
    static toMalay(keyword: string){
        let tempText:TextTranslation = textLibrary.find((item)=>{
            return item.english === keyword;
        });

        if (tempText != null) {
            return tempText.malay;
        } else {
            return keyword;
        }
    }
}