import { mockFinalSalary } from '$lib/mocks/gaji/gaji-elaun/mockFinalSalary';

export async function load() {
    const finalSalaryRecord: IntFinalSalary[] = await mockFinalSalary;
    return {
        records: {
            finalSalaryRecord,
        },
    };
}
