import { goto } from '$app/navigation';
import toast from 'svelte-french-toast';
import { ZodError, z } from 'zod';

export async function load() {}
// =========================================================================
// z validation schema and submit function for the new employment form fields
// =========================================================================

const longTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

// New Employment - Approver Result section
export const _approverResultSchema = z.object({
    approverRemark: longTextSchema,
    approverResult: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Sila tetapkan pilihan anda.'
                    : defaultError,
        }),
    }),
});

export let _errorData: any;

export const _submitApproverResultForm = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);

    const approverResultData = {
        approverRemark: String(formData.get('approverRemark')),
        approverResult: String(formData.get('approverResult')),
    };

    try {
        // _errorData = [];
        const result = _approverResultSchema.parse(approverResultData);

        if (result) {
            // _errorData = [];
            toast.success('Berjaya disimpan!', {
                style: 'background: #333; color: #fff;',
            });
            setTimeout(() => goto('../penamatan-tanggung-kerja'), 1500);
            return result;
        }
        return result;
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const { fieldErrors: errors } = error.flatten();
            _errorData = errors;
            toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
                style: 'background: #333; color: #fff;',
            });
            console.log('PAGE.TS', _errorData);
            // return errors;
        }
    }
};
