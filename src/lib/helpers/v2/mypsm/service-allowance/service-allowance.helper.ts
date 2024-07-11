import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
import { DocumentHelper } from '$lib/helpers/core/document.helper';

export class ServiceAllowanceHelpers {
    static async formToJSON(formData: any, fileList: FileList) {
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            const base64String = await DocumentHelper.toBase64(file);
            const documentObject: DocumentDTO = {
                base64: base64String,
                name: file.name,
            };
            formData.documents?.push(documentObject);
        }

        return JSON.stringify(formData);
    }
}
