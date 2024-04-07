export interface SurcajPersonalDetailRequesteDTO {
    integrityId: number;
    employeeId:  number;
}

export class SurcajPersonalDetailRequesteDTOConvert {
    public static fromJson(json: string): SurcajPersonalDetailRequesteDTO {
        return JSON.parse(json);
    }

    public static toJson(value: SurcajPersonalDetailRequesteDTO): string {
        return JSON.stringify(value);
    }
}