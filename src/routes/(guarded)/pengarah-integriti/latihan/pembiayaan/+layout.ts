import { mockContStudy } from '$lib/mocks/latihan/mockContStudy';

export async function load() {
    const contStudyData: IntContStudy[] = await mockContStudy;

    const contStudyRecords: IntContStudy[] = contStudyData.filter(
        (data) => data.status === 'SOKONG - Pengarah Bahagian/Negeri',
    );

    return {
        records: {
            contStudyRecords,
        },
    };
}
