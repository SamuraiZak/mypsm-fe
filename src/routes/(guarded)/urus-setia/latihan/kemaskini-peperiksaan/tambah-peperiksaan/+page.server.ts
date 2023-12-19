/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockExams } from '$lib/mocks/latihan/mockExams.js';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

export async function load() {
    const data: IntExams[] = await mockExams;

    // Assuming 'employeeNumber' is the field you want to increment
    const nextEmployeeNumber: number = getNextExamNumber(data);

    const newExam = {
        id: nextEmployeeNumber, // Use the next available ID
        examTitle: '',
        examType: '',
        examApplicationOpenDate: '',
        examApplicationCloseDate: '',
        examDate: '',
        examLocation: '',
    };
    return {
        record: {
            data,
            newExam,
        },
    };
}

function getNextExamNumber(existingData: IntExams[]) {
    // Assuming 'id' is a field representing the exam number
    const existingIds: number[] = existingData.map((exam: IntExams) => exam.id);

    // Find the maximum ID and increment it for the next available ID
    const maxId: number = Math.max(...existingIds);
    return maxId !== -Infinity ? maxId + 1 : 1; // If no records, start with ID 1
}
// z validation schema for the exam form fields
const examFormSchema = z.object({
    examType: z.string({ required_error: 'Jenis latihan perlu dipilih.' }),
    examTitle: z
        .string({ required_error: 'Tajuk latihan tidak boleh kosong.' })
        .min(4, { message: 'Tajuk hendaklah lebih daripada 4 karakter.' })
        .max(64, { message: 'Tajuk tidak boleh melebihi 64 karakter.' })
        .trim(),
    applOpenDate: z.string({
        required_error: 'Tarikh tidak boleh dibiar kosong',
    }),
    applCloseDate: z.string({
        required_error: 'Tarikh tidak boleh dibiar kosong',
    }),
    examDate: z.string({ required_error: 'Tarikh tidak boleh dibiar kosong' }),
    // examDate: z.date().min(new Date(), {
    //     message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    // }),
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
            console.log(err.flatten());
            const { fieldErrors: errors } = err.flatten();
            const { ...rest } = formData;
            return {
                data: rest,
                errors,
            };
        }
    },
};
