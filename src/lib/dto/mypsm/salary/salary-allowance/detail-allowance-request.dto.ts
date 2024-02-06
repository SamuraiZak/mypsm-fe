export interface DetailAllowanceRequestDTO {
    employeeId: number;
}
export class DetailAllowanceRequestConvert {
    // to model from json string
    public static fromJson(json: string): DetailAllowanceRequestDTO {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: DetailAllowanceRequestDTO): string {
        return JSON.stringify(value);
    }
}
