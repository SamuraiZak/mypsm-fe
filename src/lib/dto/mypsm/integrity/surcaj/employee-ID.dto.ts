export type employeeIdRequestDTO = {
    employeeId: number;
};

export class employeeIdRequestDTOConvert {
    public static fromJson(json: string): employeeIdRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: employeeIdRequestDTO): string {
        return JSON.stringify(value);
    }
}