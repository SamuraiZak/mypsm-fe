import { mockFinalSalaryCert } from '$lib/mocks/gaji/gaji-elaun/mockFinalSalaryCert';

export async function load() {
    const finalSalaryCertRecord: IntFinalSalary[] = await mockFinalSalaryCert;

    return {
        records: {
            finalSalaryCertRecord,
        },
    };
}
