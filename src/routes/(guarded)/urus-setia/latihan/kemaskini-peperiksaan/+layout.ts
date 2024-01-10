import { mockExams } from '$lib/mocks/latihan/mockExams';

export async function load() {
    const examsRecord: IntExams[] = await mockExams;

    return {
        records: {
            examsRecord,
        },
    };
}
