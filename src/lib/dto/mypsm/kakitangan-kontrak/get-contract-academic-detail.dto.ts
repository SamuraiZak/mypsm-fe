import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";

export interface GetContractAcademicDetailDTO {
    academicList: AcademicList[];
    isReadonly:         boolean;
    isDraft: boolean;
}

export interface AcademicList {
    id?:               number;
    majorId:          number;
    minorId:          number;
    countryId:        number;
    institutionId:    number;
    educationLevelId: number;
    sponsorshipId:    number;
    name:             string;
    completionDate:   Date;
    finalGrade:       string;
    field:            string;
    document: DocumentBase64RequestDTO;
}
