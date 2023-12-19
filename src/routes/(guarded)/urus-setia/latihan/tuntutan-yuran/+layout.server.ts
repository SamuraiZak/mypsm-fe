import { mockStudyAllowance } from '$lib/mocks/latihan/mockStudyAllowance';

export async function load() {
    const studyAllowanceRecords: IntStudyAllowance[] = await mockStudyAllowance;

    return {
        records: {
            studyAllowanceRecords,
        },
    };
}
