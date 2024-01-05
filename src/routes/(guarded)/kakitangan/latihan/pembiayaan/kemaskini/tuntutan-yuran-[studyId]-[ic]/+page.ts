import { mockStudyAllowance } from '$lib/mocks/latihan/mockStudyAllowance.js';

export async function load({ params }) {
    const data: IntStudyAllowance[] = await mockStudyAllowance;

    const currentStudyAllowanceApplication: IntStudyAllowance | undefined =
        data.find(
            (allowance) =>
                allowance.id === Number(params.studyId) &&
                allowance.candidateIdentityNumber === params.ic,
        );

    if (!currentStudyAllowanceApplication) throw new Error('Record not found');

    return {
        record: {
            data,
            currentStudyAllowanceApplication,
        },
    };
}
