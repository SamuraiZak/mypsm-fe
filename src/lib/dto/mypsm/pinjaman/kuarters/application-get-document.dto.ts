export interface QuartersGetDocument {
    id:       number;
    document: QuarterDocument[];
}

export interface QuarterDocument {
    name:     string;
    document: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toQuartersGetDocument(json: string): QuartersGetDocument {
        return JSON.parse(json);
    }

    public static quartersGetDocumentToJson(value: QuartersGetDocument): string {
        return JSON.stringify(value);
    }
}