export interface DetailAllowanceResponsetDTO {
    employeeNo: string;
    name: string;
    identityCard: string;
    grade: string;
    currentPlacement: string;
    group: string;
    status: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDetailAllowanceResponsetDTO(
        json: string,
    ): DetailAllowanceResponsetDTO {
        return JSON.parse(json);
    }

    public static detailAllowanceResponsetDTOToJson(
        value: DetailAllowanceResponsetDTO,
    ): string {
        return JSON.stringify(value);
    }
}
