import { mockProsiding } from '$lib/mocks/integriti/prosiding/mockProsiding';

export async function load() {
    const prosidingRecord: IntProsiding[] = await mockProsiding;
    const prosidingChargesRecord: IntProsiding[] = await mockProsiding.filter(
        (prosiding) => prosiding.disciplinaryProceedingType === 'charges',
    );
    const prosidingSuspensionRecord: IntProsiding[] =
        await mockProsiding.filter(
            (prosiding) =>
                prosiding.disciplinaryProceedingType === 'suspension',
        );

    return {
        records: {
            prosidingRecord,
            prosidingChargesRecord,
            prosidingSuspensionRecord,
        },
    };
}
