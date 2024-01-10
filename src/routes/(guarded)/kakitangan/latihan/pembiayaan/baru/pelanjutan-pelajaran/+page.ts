/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockContStudy } from '$lib/mocks/latihan/mockContStudy.js';
import { fail } from '@sveltejs/kit';

export async function load() {
    const data: IntContStudy[] = await mockContStudy;

    // Assuming 'employeeNumber' is the field you want to increment
    const nextEmployeeNumber: number = getNextExamNumber(data);

    const newContStudyApplication = {
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
        coursePeriod: '',
        courseEndDate: '',
        studyTypes: [],
        applicationTypes: [],
        status: '',
    };
    return {
        record: {
            data,
            newContStudyApplication,
        },
    };
}

function getNextExamNumber(existingData: IntContStudy[]) {
    // Assuming 'id' is a field representing the exam number
    const existingIds: number[] = existingData.map(
        (exam: IntContStudy) => exam.id,
    );

    // Find the maximum ID and increment it for the next available ID
    const maxId: number = Math.max(...existingIds);
    return maxId !== -Infinity ? maxId + 1 : 1; // If no records, start with ID 1
}
