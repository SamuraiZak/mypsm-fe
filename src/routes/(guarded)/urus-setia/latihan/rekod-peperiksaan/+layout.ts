import { mockExamAppls } from '$lib/mocks/latihan/mockExamAppls';
import { mockExams } from '$lib/mocks/latihan/mockExams';

export async function load() {
    const examsAvailable: IntExams[] = await mockExams;
    const examTakenRecords: IntExamAppl[] = await mockExamAppls;
    const perhidmatanExamRecords: IntExamAppl[] = examTakenRecords.filter(
        (exam) => exam.exam.examType === 'Perkhidmatan',
    );
    const pslExamRecords: IntExamAppl[] = examTakenRecords.filter(
        (exam) => exam.exam.examType === 'Peningkatan Secara Lantikan (PSL)',
    );

    return {
        records: {
            examsAvailable,
            examTakenRecords,
            perhidmatanExamRecords,
            pslExamRecords,
        },
    };
}
