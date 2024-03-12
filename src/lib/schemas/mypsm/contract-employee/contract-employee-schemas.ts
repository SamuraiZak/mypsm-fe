import {
    booleanSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

const stringToMinDate = shortTextSchema.refine((val) => {
    const convertedStringToDate = new Date(val);
    const currentDate = new Date();
return convertedStringToDate > currentDate;
}, { message: "Tarikh tidak boleh kurang dari tarikh semasa." })

const stringToMaxDate = shortTextSchema.refine((val) => {
    const convertedStringToDate = new Date(val);
    const currentDate = new Date();
return convertedStringToDate < currentDate;
}, { message: "Tarikh tidak boleh lebih dari tarikh semasa." })

export const numberSchema = z.coerce.number({
    required_error: 'Medan ini hendaklah diisi.',
    invalid_type_error: 'Sila pastikan medan ini ditaip dengan angka',
}).refine(x => x > 0, { message: "Medan ini tidak boleh dibiar kosong." });
const emailSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).email("Sila nyatakan format emel yang sah. ");
const identificationCardSchema = z.string().refine(x => /^[0-9]+$/.test(x) && x.length == 12, {
    message: "Sila nyatakan No. Kad Pengenalan dalam format yang dikehendaki."
});
const phoneSchema = z.string().refine(x => /^[0-9]+$/.test(x) && (x.length == 11 || x.length == 10),
    {
        message: "Sila nyatakan No. Telefon Bimbit yang betul."
    });
const optionalNumberSchema = z.number().refine(x => x > 0, { message: "Sila tetapkan pilihan anda." }).nullable().default(null);
const optionalTextSchema = z.string().min(4, { message: "Medan hendaklah lebih dari 4 karakter." }).nullable().default(null);



export const _addNewContractEmployeeSchema = z.object({
    name: shortTextSchema,
    email: z.string({
        invalid_type_error: "Medan ini tidak boleh dibiar kosong."
    }).email("Sila nyatakan format emel yang sah. "),
    identityDocumentNumber: z.string().refine(x => /^[0-9]+$/.test(x) && x.length == 12,
        {
            message: "Sila nyatakan No. Kad Pengenalan dalam format yang dikehendaki."
        }),
    startContract: stringToMinDate,
    endContract: stringToMinDate,
    wageRate: numberSchema.refine(x => x > 0, { message: "Medan ini tidak boleh dibiar kosong." }),
    designation: shortTextSchema,
    reportDutyDate: stringToMinDate,
})

export const _editNewContractEmployeeSchema = z.object({
    genderId: numberSchema,
    nationalityId: numberSchema,
    religionId: numberSchema,
    raceId: numberSchema,
    titleId: numberSchema,
    ethnicId: numberSchema,
    maritalId: numberSchema,
    birthCountryId: numberSchema,
    birthStateId: numberSchema,
    phoneNumber: phoneSchema,
    assetDeclarationStatusId: optionalNumberSchema,
    name: shortTextSchema,
    alternativeName: shortTextSchema,
    identityDocumentColor: shortTextSchema,
    identityDocumentNumber: identificationCardSchema,
    email: emailSchema,
    propertyDeclarationDate: stringToMaxDate.nullable().default(null),
    birthDate: stringToMaxDate,
    homeAddress: shortTextSchema,
    homeCountryId: numberSchema,
    homeStateId: numberSchema,
    homeCityId: numberSchema,
    homePostcode: shortTextSchema,
    mailAddress: shortTextSchema,
    mailCountryId: numberSchema,
    mailStateId: numberSchema,
    mailCityId: numberSchema,
    mailPostcode: shortTextSchema,
    isExPoliceOrSoldier: booleanSchema.default(false),
    isInternalRelationship: booleanSchema.default(false),
    employeeNumber: optionalTextSchema,
    relationshipId: optionalNumberSchema,
})

export const _addContractAcademicSchema = z.object({
    majorId: numberSchema,
    minorId: numberSchema,
    countryId: numberSchema,
    institutionId: numberSchema,
    educationLevelId: numberSchema,
    sponsorshipId: numberSchema,
    name: shortTextSchema,
    completionDate: stringToMaxDate,
    finalGrade: shortTextSchema,
    field: shortTextSchema,
})
export const _contractAcademicSchema = z.object({
    academics: _addContractAcademicSchema.array(),
})

export const _addContractExperienceSchema = z.object({
    company: shortTextSchema,
    address: shortTextSchema,
    position: shortTextSchema,
    positionCode: shortTextSchema,
    startDate: stringToMaxDate,
    endDate: stringToMaxDate,
    salary: numberSchema,
})

export const _addContractActivitySchema = z.object({
    name: shortTextSchema,
    joinDate: stringToMaxDate,
    position: shortTextSchema,
    description: shortTextSchema,
})

export const _commonContractDependencySchema = z.object({
    birthCountryId: numberSchema,
    birthStateId: numberSchema,
    relationshipId: numberSchema,
    educationLevelId: numberSchema,
    raceId: numberSchema,
    nationalityId: numberSchema,
    maritalId: numberSchema,
    genderId: numberSchema,
    name: shortTextSchema,
    alternativeName: shortTextSchema,
    identityDocumentColor: shortTextSchema,
    identityDocumentNumber: identificationCardSchema,
    address: shortTextSchema,
    postcode: shortTextSchema,
    birthDate: stringToMaxDate,
    workAddress: shortTextSchema,
    workPostcode: shortTextSchema,
    phoneNumber: phoneSchema,
    marriageDate: stringToMaxDate.nullable().default(null),
    inSchool: booleanSchema,
})

export const _uploadDocSchema = z.object({
    document: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 1_000_000, 'Maximum 1 MB saiz muat naik.')
        .nullable(),
});

export const _addContractViewSecretaryUpdate = z.object({
    candidateId: numberSchema,
    startContract: stringToMinDate,
    endContract: stringToMinDate,
    wageRate: numberSchema,
    placementId: numberSchema,
    designation: shortTextSchema,
    reportDutyDate: stringToMinDate,
    kwspNo: shortTextSchema,
    socsoNo: shortTextSchema,
    taxNo: shortTextSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    serviceTypeId: numberSchema,
    leaveEntitlement: numberSchema,
    effectiveDate: stringToMinDate,
    civilServiceStartDate: stringToMinDate,
    lkimServiceStartDate: stringToMinDate,
    currentServiceStartDate: stringToMinDate,
    firstConfirmServiceDate: stringToMinDate,
    currentConfirmServiceDate: stringToMinDate,
})

export const _addContractCommonRoleResult = z.object({
    id: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
})
export const _addContractSupporterApprover = z.object({
    candidateId: numberSchema,
    supporterId: numberSchema,
    approverId: numberSchema,
})