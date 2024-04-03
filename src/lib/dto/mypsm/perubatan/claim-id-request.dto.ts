export interface ClaimIdRequestDTO {
    id: number;
    month: string;
}

export class ClaimIdRequestDTOConvert {
    public static fromJson(json: string): ClaimIdRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ClaimIdRequestDTO): string {
        return JSON.stringify(value);
    }
}