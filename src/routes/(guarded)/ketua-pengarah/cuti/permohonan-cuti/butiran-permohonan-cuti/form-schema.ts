// =================================================================
// ============ FORM SCHEMA FOR ALL FORM VALIDATION ================
// =================================================================
import { z } from 'zod';

const dateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .min(new Date(), {
        message: 'Tarikh tidak boleh kurang dari tarikh semasa.',
    });

const globalDateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    });

export const permohonanCutiMaklumatKakitangan = z.object({
    noPekerja: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    nama: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    noKadPengenalan: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    gred: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    penempatan: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    kumpulan: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
});

export const maklumatGantian = z.object({
    namaPengganti: z.enum(['1', '2', '3'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }),
    tarikhMulaSetengah: z.enum(['1', '2',], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhTamatSetengah: z.enum(['1', '2'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhMula: dateScheme,
    tarikhTamat: dateScheme,
    cutiGantianTerakhir: dateScheme,
});

export const overtimeSchema = z.object({
    officialTask: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    placement: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    startTime: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah diisi.',
        })
        .trim(),
    endTime: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah diisi.',
        })
        .trim(),
    totalTime: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(1, {
            message: 'Sila nyatakan jumlah jam.',
        })
        .max(30, {
            message: 'Sila nyatakan jumlah jam.',
        })
        .trim(),
    date: globalDateScheme,
})

export const publicHolidayTask = z.object({
    officialTask: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    placement: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    startTime: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah diisi.',
        })
        .trim(),
    endTime: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah diisi.',
        })
        .trim(),
    totalTime: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(1, {
            message: 'Sila nyatakan jumlah jam.',
        })
        .max(30, {
            message: 'Sila nyatakan jumlah jam.',
        })
        .trim(),
    holidayCategory: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }),
    date: globalDateScheme,
})

export const cutiTanpaRecord = z.object({
    ctrCategory: z.enum(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }),
    tujuanPermohonan: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    tarikhMulaSetengah: z.enum(['1', '2',], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhTamatSetengah: z.enum(['1', '2'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    totalDay: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(1, {
            message: 'Sila nyatakan jumlah hari.',
        })
        .max(30, {
            message: 'Sila nyatakan jumlah hari yang betul.',
        })
        .trim(),
    tarikhMula: globalDateScheme,
    tarikhTamat: globalDateScheme,
});

export const globalCuti = z.object({
    tujuanPermohonan: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    tarikhMulaSetengah: z.enum(['1', '2',], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhTamatSetengah: z.enum(['1', '2'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    totalDay: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(1, {
            message: 'Sila nyatakan jumlah hari.',
        })
        .max(30, {
            message: 'Sila nyatakan jumlah hari yang betul.',
        })
        .trim(),
    tarikhMula: globalDateScheme,
    tarikhTamat: globalDateScheme,
});

export const cutiBersalinAwal = z.object({
    tujuanPermohonan: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    tarikhMulaSetengah: z.enum(['1', '2',], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhTamatSetengah: z.enum(['1', '2'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhMula: globalDateScheme,
    tarikhTamat: globalDateScheme,
    tarikhDijangkaBersalin: dateScheme,
});

export const cutiBersalinPegawai = z.object({
    tujuanPermohonan: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    address: z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim(),
    tarikhMulaSetengah: z.enum(['1', '2',], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhTamatSetengah: z.enum(['1', '2'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhMula: globalDateScheme,
    tarikhTamat: globalDateScheme,
    tarikhDijangkaBersalin: dateScheme,
});

export const reusableDateSchema = z.object({
    tarikhMulaSetengah: z.enum(['1', '2',], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhTamatSetengah: z.enum(['1', '2'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }).optional(),
    tarikhMula: dateScheme,
    tarikhTamat: dateScheme,
});
