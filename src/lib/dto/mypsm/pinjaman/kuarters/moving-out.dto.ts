export interface MoveOutQuarters {
    id:            number;
    movingOutDate: string;
    quarterDetails?: string;
    outstandingBalance: boolean;
    outstandingAmount?: number;
}

// Converts JSON strings to/from your types
export class MoveOutConvert {
    public static fromJson(json: string): MoveOutQuarters {
        return JSON.parse(json);
    }

    public static toJson(value: MoveOutQuarters): string {
        return JSON.stringify(value);
    }
}