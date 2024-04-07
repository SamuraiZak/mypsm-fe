export type PTBIdRequestDTO = {
    employeeId: number;
};

export class PTBIdRequestDTOConvert {
    public static fromJson(json: string): PTBIdRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: PTBIdRequestDTO): string {
        return JSON.stringify(value);
    }
}