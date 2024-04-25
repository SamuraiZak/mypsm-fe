// =========================================================================
// z validation schema and submit function for the calon lantikan baru form fields

import { z } from 'zod';

// =========================================================================
export const shortTextSchema = z
    .string({
        required_error: 'Medan ini tidak boleh kosong.',
        invalid_type_error: 'Medan ini tidak boleh kosong.',
    })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
export const nricSchema = z.coerce
    .string()
    .min(12, {
        message: 'NRIC hendaklah lebih daripada 12 karakter.',
    })
    .max(12, {
        message: 'NRIC tidak boleh melebihi 12 karakter.',
    })
    .trim();

export const requiredTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini tidak boleh kosong.',
    })
    .trim();
export const codeSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah lebih daripada 1 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
export const longTextSchema = z
    .string({
        required_error: 'Medan ini tidak boleh kosong.',
        invalid_type_error: 'Medan ini tidak boleh kosong.',
    })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const dateSchema = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

export const minDateSchema = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .min(new Date(), {
        message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    });

export const maxDateSchema = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .max(new Date(), {
        message: 'Tarikh lepas tidak boleh lebih dari tarikh semasa.',
    });

export const booleanSchema = z.boolean({
    required_error: 'Sila tetapkan pilihan anda.',
    invalid_type_error: 'Medan ini haruslah jenis boolean.',
});

export const numberSchema = z.coerce
    .number({
        required_error: 'Medan ini hendaklah diisi.',
        invalid_type_error: 'Sila pastikan medan ini ditaip dengan angka',
    })
    .refine((x) => x >= 0, { message: 'Medan ini tidak boleh dibiar kosong.' });

export const numberIdSchema = z.coerce.number({
    required_error: 'Tidak tepat.',
    invalid_type_error: 'Sila pastikan ID ditaip dengan angka',
}).min(1, {message:"Sila tetapkan pilihan"});

export const dateStringSchema = z.coerce
    .string({ required_error: 'Tarikh tidak boleh kosong' })
    .refine((value) => (value === 'null' ? null : value));

export const requiredDateStringSchema = z.coerce
    .string({
        required_error: 'Pastikan tarikh adalah betul.',
    })
    .min(1, { message: 'Tarikh tidak boleh kosong' });

export const numberToStringSchema = z.coerce
    .string({
        required_error: 'Pastikan tarikh adalah betul.',
    })
    .min(1, { message: 'Tarikh tidak boleh kosong' });

export const numberSchem0 = z.coerce.number({
    required_error: 'Medan ini hendaklah diisi.',
    invalid_type_error: 'Sila pastikan medan ini ditaip dengan angka',
});
