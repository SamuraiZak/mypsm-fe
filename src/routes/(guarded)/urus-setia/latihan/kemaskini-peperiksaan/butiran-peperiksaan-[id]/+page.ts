import { mockExams } from '$lib/mocks/latihan/mockExams.js';
// import { z } from 'zod';

export async function load({ params }) {
    const data: IntExams[] = mockExams;

    const currentExam: IntExams | undefined = data.find(
        (exam) => exam.id === params.id,
    );

    if (!currentExam) throw new Error('Record not found');

    return {
        record: {
            data,
            currentExam,
        },
    };
}

// const dateScheme = z.coerce
//     .date({
//         errorMap: (issue, { defaultError }) => ({
//             message:
//                 issue.code === 'invalid_date'
//                     ? 'Tarikh tidak boleh dibiar kosong.'
//                     : defaultError,
//         }),
//     })
//     .min(new Date(), {
//         message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
//     });

// // z validation schema for the exam form fields=========================================================
// const examFormSchema = z.object({
//     examType: z.enum(['perkhidmatan', 'psl'], {
//         errorMap: (issue, { defaultError }) => ({
//             message:
//                 issue.code === 'invalid_enum_value'
//                     ? 'Jenis latihan perlu dipilih.'
//                     : defaultError,
//         }),
//     }),
//     examTitle: z
//         .string({ required_error: 'Tajuk latihan tidak boleh kosong.' })
//         .min(4, { message: 'Tajuk hendaklah lebih daripada 4 karakter.' })
//         .max(84, { message: 'Tajuk tidak boleh melebihi 84 karakter.' })
//         .trim(),
//     applOpenDate: dateScheme,
//     applCloseDate: dateScheme,
//     examDate: dateScheme,
//     examLocation: z
//         .string({ required_error: 'Lokasi tidak boleh kosong.' })
//         .min(4, { message: 'Lokasi hendaklah lebih daripada 4 karakter.' })
//         .max(124, { message: 'Lokasi tidak boleh melebihi 124 karakter.' })
//         .trim(),
// });

// export const actions = {
//     default: async ({ request }) => {
//         const formData = Object.fromEntries(await request.formData());

//         try {
//             const result = examFormSchema.parse(formData);
//             console.log('SUCCESS', result);
//         } catch (err) {
//             const { fieldErrors: errors } = (err as Error).flatten();
//             const { ...rest } = formData;
//             return {
//                 data: rest,
//                 errors,
//             };
//         }
//     },
// };
