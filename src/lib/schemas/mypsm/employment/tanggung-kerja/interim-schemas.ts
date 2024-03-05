import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
    longTextSchema,
    minDateSchema,
    numberIdSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// ========================
// ============= Kakitangan 
// ========================
export const _addNewInterimApplicationSchema = z.object({
    gradeId: numberSchema.refine(x => x > 0, {message: "Sila tetapkan pilihan anda."}),
    positionId: numberSchema.refine(x => x > 0, {message: "Sila tetapkan pilihan anda."}),
    placementId: numberSchema.refine(x => x > 0, {message: "Sila tetapkan pilihan anda."}),
    newPlacementId: numberSchema.refine(x => x > 0, {message: "Sila tetapkan pilihan anda."}),
    referenceNumber: shortTextSchema,
    startDate: minDateSchema,
    endDate: minDateSchema,
    reason: shortTextSchema,
})
