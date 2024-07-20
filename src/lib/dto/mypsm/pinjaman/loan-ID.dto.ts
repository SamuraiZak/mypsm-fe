export type loanIdRequestDTO = {
    id: number;
    
};

export class loanIdRequestDTOConvert {
    public static fromJson(json: string): loanIdRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: loanIdRequestDTO): string {
        return JSON.stringify(value);
    }
}