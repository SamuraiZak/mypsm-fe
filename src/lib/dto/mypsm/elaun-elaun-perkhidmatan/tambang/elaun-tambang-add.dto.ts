export interface ServAllTambangDetailDTO {
    allowanceTypeCode: string;
    applyCode: string;
    stateCode: string;
    familyDetail: ServAllTambangFamilyDetailDTO[];
}

export interface ServAllTambangFamilyDetailDTO {
    name: string;
    age: number;
    relationshipCode: string;
}

// Converts JSON strings to/from your types
export class ServAllTambangDetailConvert {
    public static fromJson(json: string): ServAllTambangDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServAllTambangDetailDTO): string {
        return JSON.stringify(value);
    }
}
