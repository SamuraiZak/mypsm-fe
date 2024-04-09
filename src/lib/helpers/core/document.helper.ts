export class DocumentHelper {
    public static toBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const base64String = event.target.result
                        .toString()
                        .split(',')[1];
                    resolve(base64String);
                } else {
                    reject(new Error('Failed to read file.'));
                }
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file.'));
            };

            reader.readAsDataURL(file);
        });
    }
}
