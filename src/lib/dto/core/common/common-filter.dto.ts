export interface CommonFilterDTO {
    program?: string | null;
    employeeNumber?: string | null;
    name?: string | null;
    identityDocumentNumber?: string | null;
    scheme?: string | null;
    grade?: string | null;
    position?: string | null;
    status?: string | null;
}

// Converts JSON strings to/from your types
export class CommonFilterConvert {
    public static toCommonListRequestDTO(json: string): CommonFilterDTO {
        return JSON.parse(json);
    }

    public static commonListRequestDTOToJson(value: CommonFilterDTO): string {
        return JSON.stringify(value);
    }
}
