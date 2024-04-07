import * as z from 'zod';

// shared between most lookup
export const LookupCommonSchema = z.object({
    id: z.number().optional(),
    code: z.string().optional(),
    description: z.string(),
});

// district
export const LookupDistrictSchema = z.object({
    id: z.number().optional(),
    code: z.string().optional(),
    description: z.string(),
    divisionCode: z.string(),
});

// meeting
export const LookupMeetingSchema = z.object({
    id: z.number().optional(),
    code: z.string().optional(),
    description: z.string(),
    module: z.string(),
    subModule: z.string(),
});

// relationship
export const LookupRelationshipSchema = z.object({
    id: z.number().optional(),
    code: z.string().optional(),
    description: z.string(),
    isFamily: z.boolean(),
});

// employment status
export const LookupEmploymentStatusSchema = z.object({
    id: z.number().optional(),
    code: z.string().optional(),
    occSectorCode: z.string().optional(),
    occSectorName: z.string(),
});

// grade
export const LookupGradeSchema = z.object({
    id: z.number().optional(),
    code: z.string().optional(),
    description: z.string(),
    ssmCode: z.string(),
    minimumSalary: z.number(),
    maximumSalary: z.number(),
    annualIncrementRate: z.number(),
});
