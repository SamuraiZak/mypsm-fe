import {
    booleanSchema,
    numberSchema,
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

// ===========================
// ============= Kakitangan 
// ===========================
export const _addNewInterimApplicationSchema = z.object({
    interimId: z.number().optional(),
    gradeId: numberSchema.default(1),
    positionId: numberSchema,
    placementId: numberSchema,
    newPlacementId: numberSchema,
    referenceNumber: shortTextSchema,
    startDate: stringToMinDate,
    endDate: stringToMinDate,
    reason: shortTextSchema,
    isReadOnly: z.boolean().optional(),
})

export const _addInterimApprovalSchema = z.object({
    interimId: numberSchema,
    status: booleanSchema,
    remark: z.string(),
    name: z.string().optional(),
    statusDescription: z.string().optional(),
})
