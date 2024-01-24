/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockExams } from '$lib/mocks/latihan/mockExams.js';
import { mockStudyAllowance } from '$lib/mocks/latihan/mockStudyAllowance.js';
import {
    getErrorToast,
    getPromiseToast,
} from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Stepper Lesson Info
const option = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const number = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah mempunyai nombor.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperLessonInfo = z.object({
    eduLevel: option,
    courseName: textField,
    iptaName: textField,
    institutions: textField,
    studyDuration: number,
    totalClaim: number,
    finalResult: textField,
    dateAdmission: date.refine((data) => data >= new Date(), {
        message: 'Tidak boleh kurang atau pada tarikh semasa',
    }),
    expectedEndDate: date.refine((data) => data >= new Date(), {
        message: 'Tidak boleh kurang atau pada tarikh semasa',
    }),
    claimSemester: option,
});

export const _submitFormStepperLessonInfo = async (formData: object) => {
    const stepperLessonInfo = await superValidate(formData, _stepperLessonInfo);

    if (!stepperLessonInfo.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperLessonInfo);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperLessonInfo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });
    getPromiseToast(responsePromise);
    return { stepperLessonInfo };
};

export async function load() {
    const stepperLessonInfo = await superValidate(_stepperLessonInfo);
    
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
        stepperLessonInfo,
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
