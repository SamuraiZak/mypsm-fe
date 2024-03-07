import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
    longTextSchema,
    maxDateSchema,
    minDateSchema,
    numberIdSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

const emailSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).email("Sila nyatakan format emel yang sah. ");
const identificationCardSchema = z.string().refine(x => /^[0-9]+$/.test(x) && x.length == 12,{
    message: "Sila nyatakan No. Kad Pengenalan dalam format yang dikehendaki."
});
const optionalNumberSchema = z.number().nullable().default(null);
const optionalTextSchema = z.string().nullable().default(null);
const optionalDate = z.coerce.date().nullable().default(null);
const optionalBoolean = z.boolean().nullable().default(null);
// ========================================
// ============= Urus Setia 
// ========================================
export const _addNewContractEmployeeSchema = z.object({
    name: shortTextSchema,
    email: z.string({
        invalid_type_error: "Medan ini tidak boleh dibiar kosong."
    }).email("Sila nyatakan format emel yang sah. "),
    identityDocumentNumber: z.string().refine(x => /^[0-9]+$/.test(x) && x.length == 12,
        {
            message: "Sila nyatakan No. Kad Pengenalan dalam format yang dikehendaki."
        }),
    startContract: minDateSchema,
    endContract: minDateSchema,
    wageRate: numberSchema.refine(x => x > 0, { message: "Medan ini tidak boleh dibiar kosong." }),
    designation: shortTextSchema,
    reportDutyDate: minDateSchema,
})

export const _editNewContractEmployeeSchema = z.object({
    genderId: numberSchema.refine(x => x > 0, { message: 'Medan ini tidak boleh dibiar kosong.' }),
    nationalityId: optionalNumberSchema,
    religionId: numberSchema.refine(x => x > 0, { message: 'Medan ini tidak boleh dibiar kosong.' }),
    raceId: numberSchema.refine(x => x > 0, { message: 'Medan ini tidak boleh dibiar kosong.' }),
    titleId: optionalNumberSchema,
    ethnicId: numberSchema.refine(x => x > 0, { message: 'Medan ini tidak boleh dibiar kosong.' }),
    maritalId: numberSchema.refine(x => x > 0, { message: 'Medan ini tidak boleh dibiar kosong.' }),
    birthCountryId: numberSchema.refine(x => x > 0, { message: 'Medan ini tidak boleh dibiar kosong.' }),
    birthStateId: numberSchema.refine(x => x > 0, { message: 'Medan ini tidak boleh dibiar kosong.' }),
    assetDeclarationStatusId: optionalNumberSchema,
    name: shortTextSchema,
    alternativeName: shortTextSchema,
    identityDocumentColor: shortTextSchema,
    identityDocumentNumber: identificationCardSchema,
    email: emailSchema,
    propertyDeclarationDate: optionalDate,
    birthDate: maxDateSchema,
    homeAddress: shortTextSchema,
    homeCountryId: optionalNumberSchema,
    homeStateId: optionalNumberSchema,
    homeCityId: optionalNumberSchema,
    homePostcode: optionalTextSchema,
    mailAddress: shortTextSchema,
    mailCountryId: optionalNumberSchema,
    mailStateId: optionalNumberSchema,
    mailCityId: optionalNumberSchema,
    mailPostcode: optionalTextSchema,
    isExPoliceOrSoldier: booleanSchema,
    isInternalRelationship: optionalBoolean,
    employeeNumber: optionalTextSchema,
    relationshipId: optionalNumberSchema,
})

export const _uploadDocSchema = z.object({
    document: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 1_000_000, 'Maximum 1 MB saiz muat naik.')
        .nullable(),
});