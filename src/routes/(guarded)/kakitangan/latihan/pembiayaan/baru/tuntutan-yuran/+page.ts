/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockExams } from '$lib/mocks/latihan/mockExams.js';
import { mockStudyAllowance } from '$lib/mocks/latihan/mockStudyAllowance.js';
import { fail } from '@sveltejs/kit';

export async function load() {
    const data: IntStudyAllowance[] = await mockStudyAllowance;

    // Assuming 'employeeNumber' is the field you want to increment
    const nextEmployeeNumber: number = getNextExamNumber(data);

    const newStudyAllowanceApplication = {
        id: nextEmployeeNumber, // Use the next available ID
        candidate: '',
        candidateEmpNumber: '',
        candidateIdentityNumber: '',
        candidateGred: '',
        courseName: '',
        courseLevel: '',
        instituteName: '',
        instituteCenter: '',
        courseApplicationDate: '',
        courseStartDate: '',
        courseEndDate: '',
        coursePeriod: '',
        threeYearLnptAverage: '',
        claimSemester: '',
        finalResult: '',
        claimAmount: '',
        status: '',
    };
    return {
        record: {
            data,
            newStudyAllowanceApplication,
        },
    };
}

function getNextExamNumber(existingData: IntStudyAllowance[]) {
    // Assuming 'id' is a field representing the exam number
    const existingIds: number[] = existingData.map(
        (exam: IntStudyAllowance) => exam.id,
    );

    // Find the maximum ID and increment it for the next available ID
    const maxId: number = Math.max(...existingIds);
    return maxId !== -Infinity ? maxId + 1 : 1; // If no records, start with ID 1
}
