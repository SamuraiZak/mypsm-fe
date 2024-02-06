export interface DetailAllowanceDetailResponseDTO {
    salaryLevel: number;
    baseSalary: number;
    itka: number;
    itp: number;
    cola: number;
    salaryMovementMonth: number;
    salaryMovementTotal: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDetailAllowanceDetailResponseDTO(
        json: string,
    ): DetailAllowanceDetailResponseDTO {
        return JSON.parse(json);
    }

    public static detailAllowanceDetailResponseDTOToJson(
        value: DetailAllowanceDetailResponseDTO,
    ): string {
        return JSON.stringify(value);
    }
}
