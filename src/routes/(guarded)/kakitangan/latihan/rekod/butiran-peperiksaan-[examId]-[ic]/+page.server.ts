import { mockExamAppls } from '$lib/mocks/latihan/mockExamAppls.js';

export async function load({ params }) {
    const data: IntExamAppl[] = await mockExamAppls;

    const currentExam: IntExamAppl | undefined = data.find(
        (exam) =>
            exam.id === Number(params.examId) &&
            exam.candidateIdentityNumber === params.ic,
    );

    if (!currentExam) throw new Error('Record not found');

    return {
        record: {
            data,
            currentExam,
        },
    };
}
