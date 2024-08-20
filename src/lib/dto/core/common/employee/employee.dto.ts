export interface CommonEmployeeDTO {
    id: number;
    employeeId: number;
    employeeNumber: string | null;
    name: string | null;
    identityCard: string | null;
    program: string;
    scheme: string | null;
    grade: string | null;
    position?: string | null;
    placement?: string;
    currentGrade?: string | null,
    currentPosition?: string | null,
    currentPlacement?: string | null,
}

// Converts JSON strings to/from your types
export class CommonEmployeeConvert {
    public static fromJson(json: string): CommonEmployeeDTO {
        return JSON.parse(json);
    }

    public static toJson(value: CommonEmployeeDTO): string {
        return JSON.stringify(value);
    }
}
