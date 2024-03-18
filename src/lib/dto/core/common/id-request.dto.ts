export type commonIdRequestDTO = {
    id: number;
};

export class commonIdRequestDTOConvert {
    public static fromJson(json: string): commonIdRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: commonIdRequestDTO): string {
        return JSON.stringify(value);
    }
}