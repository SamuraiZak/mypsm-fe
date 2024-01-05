import { mockContStudy } from '$lib/mocks/latihan/mockContStudy';
import { mockStudyAllowance } from '$lib/mocks/latihan/mockStudyAllowance';

export async function load() {
    const contStudyData: IntContStudy[] = await mockContStudy;
    const studyAllowanceData: IntStudyAllowance[] = await mockStudyAllowance;

    const contStudyRecords: IntContStudy[] = contStudyData.filter(
        (data) => data.candidateEmpNumber === '00001',
    );
    const studyAllowanceRecords: IntStudyAllowance[] =
        studyAllowanceData.filter(
            (data) => data.candidateEmpNumber === '00001',
        );

    return {
        records: {
            contStudyRecords,
            studyAllowanceRecords,
        },
    };
}
