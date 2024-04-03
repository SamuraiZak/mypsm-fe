import {
    booleanSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

const stringToMinDate = z.string({ required_error: 'Medan ini tidak boleh kosong.', invalid_type_error: 'Medan ini tidak boleh kosong.' }).refine((val) => {
    const convertedStringToDate = new Date(val);
    const currentDate = new Date();
    return convertedStringToDate > currentDate;
}, { message: "Tarikh tidak boleh kurang dari tarikh semasa." })

const stringToMaxDate = z.string({ required_error: 'Medan ini tidak boleh kosong.', invalid_type_error: 'Medan ini tidak boleh kosong.' }).refine((val) => {
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

const phoneSchema = z.string().refine(x => /^[0-9]+$/.test(x) && (x.length == 9 || x.length == 11 || x.length == 10),
    {
        message: "Sila nyatakan No. Telefon yang betul."
    });

const postcodeSchema = z.string().refine(x => /^[0-9]+$/.test(x) && x.length == 5, {
    message: "Sila nyatakan poskod yang betul."
});

const optionalNumberSchema = z.number().refine(x => x > 0, { message: "Sila tetapkan pilihan anda." }).nullable().default(null);
const optionalTextSchema = z.string().min(4, { message: "Medan hendaklah lebih dari 4 karakter." }).nullable().default(null);

export const _editClinicProfileSchema = z.object({
    clinicCode: shortTextSchema,
    clinicName: shortTextSchema,
    address: shortTextSchema,
    district: shortTextSchema,
    contactNumber: phoneSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    panelAppointedDate: shortTextSchema,
    panelContractEndDate: shortTextSchema,
})


// =================================================
// Permohonan Klinik Schema
// =================================================
export const _addClinicApplicationSchema = z.object({
    districtId: numberSchema,
    cityId: numberSchema,
    postcode: postcodeSchema,
    name: shortTextSchema,
    panelAppointedDate: stringToMinDate,
    panelContractEndDate: stringToMinDate,
    address: shortTextSchema,
    email: emailSchema,
    contactNumber: phoneSchema,
    bankName: shortTextSchema,
    bankAccount: shortTextSchema,
    foundationDate: stringToMaxDate,
    clinicType: shortTextSchema,
    ownershipStatus: shortTextSchema,
    registeredMedicalPractitioner: shortTextSchema,
    branchCount: numberSchema,
    clinicOfficeDistance: numberSchema,
    nearestClinicDistance: numberSchema,
    operationHours: shortTextSchema,
})

export const _addClinicContractSchema = z.object({
    id: numberSchema,
    panelAppointedDate: stringToMinDate.default(""),
    panelContractEndDate: stringToMinDate.default(""),
})

export const _clinicCommonResultSchema = z.object({
    id: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
})

export const _clinicSupporterApproverSchema = z.object({
    id: numberSchema,
    supporterName: shortTextSchema.default(""),
    approverName: shortTextSchema.default(""),
})