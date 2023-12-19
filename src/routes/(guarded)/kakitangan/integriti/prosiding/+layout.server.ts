import { mockProsiding } from '$lib/mocks/integriti/prosiding/mockProsiding';

export async function load() {
    const prosidingRecord: IntProsiding[] = await mockProsiding;
    const prosidingChargesRecord: IntProsiding[] = await mockProsiding.filter(
        (prosiding) =>
            prosiding.disciplinaryProceedingType === 'charges' &&
            prosiding.employeeNumber === '00001',
    );
    const prosidingSuspensionRecord: IntProsiding[] =
        await mockProsiding.filter(
            (prosiding) =>
                prosiding.disciplinaryProceedingType === 'suspension' &&
                prosiding.employeeNumber === '00001',
        );

    return {
        records: {
            prosidingRecord,
            prosidingChargesRecord,
            prosidingSuspensionRecord,
        },
    };
}
