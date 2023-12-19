/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockExams } from '$lib/mocks/latihan/mockExams.js';
import { fail } from '@sveltejs/kit';

export async function load() {
    const data: IntExams[] = await mockExams;

    // Assuming 'employeeNumber' is the field you want to increment
    const nextEmployeeNumber: number = getNextExamNumber(data);

    const newExam = {
        id: nextEmployeeNumber, // Use the next available ID
        examTitle: '',
        examType: '',
        examApplicationOpenDate: '',
        examApplicationCloseDate: '',
        examDate: '',
        examLocation: '',
    };
    return {
        record: {
            data,
            newExam,
        },
    };
}

function getNextExamNumber(existingData: IntExams[]) {
    // Assuming 'id' is a field representing the exam number
    const existingIds: number[] = existingData.map((exam: IntExams) => exam.id);

    // Find the maximum ID and increment it for the next available ID
    const maxId: number = Math.max(...existingIds);
    return maxId !== -Infinity ? maxId + 1 : 1; // If no records, start with ID 1
}

export const actions = {
    create: async ({ request }) => {
        await new Promise((fulfil) => setTimeout(fulfil, 1000));

        const data = await request.formData();

        try {
            console.log(data);
            //code
        } catch (err: unknown) {
            return fail(422, {
                //code
            });
        }
    },
};
