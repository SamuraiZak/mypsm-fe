import { mockSurcaj } from '$lib/mocks/integriti/surcaj/mockSurcaj';

export async function load() {
    const surcajRecord: IntSurcaj[] = await mockSurcaj;

    return {
        records: {
            surcajRecord,
        },
    };
}
