// a module to exports the load function that fetches data for the +page.svelte.

import { mockExams } from '$lib/mocks/latihan/mockExams.js';

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
