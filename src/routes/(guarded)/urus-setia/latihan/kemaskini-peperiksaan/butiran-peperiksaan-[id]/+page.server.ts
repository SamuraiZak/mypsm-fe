import { mockExams } from '$lib/mocks/latihan/mockExams.js';
import { z } from 'zod';

export async function load({ params }) {
    const data: IntExams[] = await mockExams;

    const currentExam: IntExams | undefined = data.find(
        (exam) => exam.id === Number(params.id),
    );

    if (!currentExam) throw new Error('Record not found');

    return {
        record: {
            data,
            currentExam,
        },
    };
}

const examFormSchema = z.object({
    // 'exam-type-dropdown': z.string(),
    examTitle: z
        .string({ required_error: 'Jenis latihan perlu dipilih.' })
        .min(4, { message: 'Tajuk hendaklah lebih daripada 4 karakter.' })
        .max(64, { message: 'Tajuk tidak boleh melebihi 64 karakter.' })
        .trim(),
    applOpenDate: z.string(),
    applCloseDate: z.string(),
    examDate: z.string(),
    examLocation: z
        .string({ required_error: 'Lokasi tidak boleh kosong.' })
        .min(4, { message: 'Lokasi hendaklah lebih daripada 4 karakter.' })
        .max(124, { message: 'Lokasi tidak boleh melebihi 124 karakter.' })
        .trim(),
});

export const actions = {
    default: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = examFormSchema.parse(formData);
            console.log('SUCCESS', result);
        } catch (err) {
            console.log(err);
            const { fieldErrors: errors } = err.flatten();
            const { ...rest } = formData;
            return {
                data: rest,
                errors,
            };
        }
    },
};
