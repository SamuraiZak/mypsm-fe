import { mockContStudy } from '$lib/mocks/latihan/mockContStudy';

export async function load() {
    const contStudyRecords: IntContStudy[] = await mockContStudy;

    return {
        records: {
            contStudyRecords,
        },
    };
}
