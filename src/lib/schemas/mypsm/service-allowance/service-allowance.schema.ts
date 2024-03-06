// =====================================================================
// Service Allowance Schema
// =====================================================================

import * as z from "zod";

export const _allowanceFamilyDetailSchema = z.object({
    name: z.string(),
    age: z.number(),
    relationshipCode: z.string(),
});

export const _addTambangMengunjungiWilayahAsalSchemaSchema = z.object({
    allowanceTypeCode: z.string(),
    applyCode: z.string(),
    stateCode: z.string(),
    familyDetail: z.array(_allowanceFamilyDetailSchema),
});

