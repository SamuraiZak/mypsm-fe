import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';

export async function load({ params }) {
    const currentEmployee: IntSalaryMovementRecord | undefined =
        mockSalaryMovementRecord.find(
            (staff) =>
                staff.employeeNumber == params.id &&
                staff.identityDocumentNumber == params.ic,
        );

    if (!currentEmployee) throw new Error('Record not found');

    return {
        currentEmployee,
    };
}
