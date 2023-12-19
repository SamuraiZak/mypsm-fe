import { mockContStudy } from '$lib/mocks/latihan/mockContStudy.js';

export async function load({ params }) {
    const data: IntContStudy[] = await mockContStudy;

    const currentApplication: IntContStudy | undefined = data.find(
        (exam) =>
            exam.id === Number(params.studyId) &&
            exam.candidateIdentityNumber === params.ic,
    );

    if (!currentApplication) throw new Error('Record not found');

    return {
        record: {
            data,
            currentApplication,
        },
    };
}
