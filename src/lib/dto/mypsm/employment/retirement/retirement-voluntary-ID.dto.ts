export type retirementVoluntaryIdRequestDTO = {
    id: number;
};

export class retirementVoluntaryIdRequestDTODTOConvert {
    public static fromJson(json: string): retirementVoluntaryIdRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: retirementVoluntaryIdRequestDTO): string {
        return JSON.stringify(value);
    }
}