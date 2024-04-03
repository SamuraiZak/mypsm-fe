import * as z from 'zod';

// grade edit
export const LookupGradeSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
    ssmCode: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
    minimumSalary: z.number(),
    maximumSalary: z.number(),
    annualIncrementRate: z.number(),
});

// department
export const LookupDepartmentSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
});

// employment status
export const LookupEmploymentStatusSchema = z.object({
    id: z.number().optional(),
    occSectorCode: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
    occSectorName: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
});

// placements
export const LookupPlacementSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
});

// position
export const LookupPositionSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
});

// programme
export const LookupProgramSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
});

// scheme
export const LookupSchemeSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
});

// sections
export const LookupSectionSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
    departmentCode: z.string(),
});

// service group
export const LookupServiceGroupSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
});

// service
export const LookupServiceTypeSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
});

// units
export const LookupUnitSchema = z.object({
    id: z.number().optional(),
    code: z.string(),
    description: z.string().min(1, {
        message: 'Ruangan ini tidak boleh dibiarkan kosong.',
    }),
    sectionCode: z.string(),
});
