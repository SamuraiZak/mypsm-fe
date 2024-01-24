export interface NewHireDocumentsResponse {
    status: number;
    message: string;
    data: NewHireDocuments;
}

export interface NewHireDocuments {
    isReadonly: boolean;
}
