export interface InterimDateApllication {
    interimId: number;
    startDate: string;
    endDate: string;
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class InterimDateApllicationConvert {
    public static fromJson(json: string): InterimDateApllication {
        return JSON.parse(json);
    }

    public static toJson(value: InterimDateApllication): string {
        return JSON.stringify(value);
    }
}