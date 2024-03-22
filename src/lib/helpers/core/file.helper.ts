import type { DocumentList, ServiceAllowanceDocumentDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/service-allowance.dto';
import type { ServiceAllowanceDocument } from '$lib/schemas/mypsm/service-allowance/service-allowance.schema';

export class FileHelper {
    static filesToDocuments(files: FileList):DocumentList {
        let documents: DocumentList = {
            documents:[],
        };

        Array.from(files).forEach((file) => {
            let document: ServiceAllowanceDocumentDTO = {
                name: '',
                base64: '',
            };

            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string;

                // document.encStr = base64String.substring(
                //     base64String.indexOf(',') + 1,
                // );
                document.name = file.name;
                documents.documents.push(document);
            };

            reader.readAsDataURL(file);
        });

        return documents;
    }
}
