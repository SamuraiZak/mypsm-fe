import { mockProsiding } from '$lib/mocks/integriti/prosiding/mockProsiding';

export async function load() {
    const prosidingRecord: IntProsiding[] = await mockProsiding.filter(
        (prosiding) => prosiding.isAppealed === true,
    );

    return {
        records: {
            prosidingRecord,
        },
    };
}
