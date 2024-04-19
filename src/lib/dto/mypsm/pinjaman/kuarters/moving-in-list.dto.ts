export interface MovingInKuarters {
    id:                     number;
    employeeNumber:         string;
    name:                   string;
    identityDocumentNumber: string;
    applicationDate:        string;
    approvedDate:           string;
    isOccupied:             boolean;
    status?:                 string;
}

// Converts JSON strings to/from your types
export class MovingInKuartersConvert {
    public static fromJson(json: string): MovingInKuarters[] {
        return JSON.parse(json);
    }

    public static toJson(value: MovingInKuarters[]): string {
        return JSON.stringify(value);
    }
}