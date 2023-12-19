import { mockProsiding } from '$lib/mocks/integriti/prosiding/mockProsiding';

export async function load() {
    const prosidingRecord: IntProsiding[] = await mockProsiding.filter(
        (prosiding) =>
            prosiding.employeeNumber === '00001' &&
            prosiding.isAppealed === true,
    );

    return {
        records: {
            prosidingRecord,
        },
    };
}
