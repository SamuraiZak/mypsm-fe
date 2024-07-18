import type { DocumentDTO } from '$lib/dto/core/document/document.dto';

export class DocumentHelper {
    public static toBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result as string;
                const base64String = result.split(',')[1];
                resolve(base64String);
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file.'));
            };

            reader.readAsDataURL(file);
        });
    }

    public static async fileListToDocuments(
        fileList: FileList,
    ): Promise<DocumentDTO[]> {
        const fileArray = Array.from(fileList);

        const documentPromises = fileArray.map(async (file) => {
            const base64String = await this.toBase64(file);
            return {
                base64: base64String,
                name: file.name,
            } as DocumentDTO;
        });

        return Promise.all(documentPromises);
    }
}
