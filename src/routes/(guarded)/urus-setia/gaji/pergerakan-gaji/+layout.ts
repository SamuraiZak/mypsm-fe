import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';

export async function load() {
    const salaryMovementRecord: IntSalaryMovementRecord[] =
        await mockSalaryMovementRecord;
    return {
        records: {
            salaryMovementRecord,
        },
    };
}
