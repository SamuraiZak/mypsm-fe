import { mockExamAppls } from '$lib/mocks/latihan/mockExamAppls';
import { mockExams } from '$lib/mocks/latihan/mockExams';

export async function load() {
    const examsAvailable: IntExams[] = await mockExams;
    const records: IntExamAppl[] = await mockExamAppls;

    const examTakenByCurrentEmp: IntExamAppl[] = records.filter(
        (exam) => exam.candidateEmpNumber === '00001',
    );

    return {
        records: {
            examsAvailable,
            examTakenByCurrentEmp,
        },
    };
}
