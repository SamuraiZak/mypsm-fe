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
// ============= Urus Setia 
// ========================
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