export type surchargeaIdRequestDTO = {
    surchargeId: number;
};

export class surchargeIdRequestDTOConvert {
    public static fromJson(json: string): surchargeaIdRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: surchargeaIdRequestDTO): string {
        return JSON.stringify(value);
    }
}