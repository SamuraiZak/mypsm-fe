// =========================================================================
// z validation schema and submit function for the new employment form fields
// =========================================================================

import { z } from 'zod';

const longTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

// New Employment - Supporter Result section
export const _supporterResultSchema = z.object({
    supporterRemark: longTextSchema,
    supporterResult: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Sila tetapkan pilihan anda.'
                    : defaultError,
        }),
    }),
});

export const _submitSupporterResultForm = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const supporterResultData = {
        supporterRemark: String(formData.get('supporterRemark')),
        supporterResult: String(formData.get('supporterResult')),
    };

    try {
        errorData = [];
        const result = supporterResultSchema.parse(supporterResultData);
        if (result) {
            errorData = [];
            toast.success('Berjaya disimpan!', {
                style: 'background: #333; color: #fff;',
            });
            setTimeout(() => goto('../../perjawatan/tawaran-baru'), 1500);
        }
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const { fieldErrors: errors } = error.flatten();
            errorData = errors;
            toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
                style: 'background: #333; color: #fff;',
            });
        }
    }
};
