import { mockEmploymentPositionHistories } from '$lib/mocks/database/employmentPositionHistories';
import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
import { mockEmployeeEducations } from '$lib/mocks/database/mockEmployeeEducations';
import { mockEmployeeExperience } from '$lib/mocks/database/mockEmployeeExperience';
import { mockEmployeeNextOfKins } from '$lib/mocks/database/mockEmployeeNextOfKins';
import { mockEmployeePartners } from '$lib/mocks/database/mockEmployeePartners';
import { mockEmployees } from '$lib/mocks/database/mockEmployees';
import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
import { mockLookupEmploymentStatus } from '$lib/mocks/database/mockLookupEmploymentStatus';
import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
import { mockLookupRaces } from '$lib/mocks/database/mockLookupRaces';
import { mockLookupReligions } from '$lib/mocks/database/mockLookupReligions';
import { mockLookupServiceTypes } from '$lib/mocks/database/mockLookupServiceTypes';
import { mockLookupStates } from '$lib/mocks/database/mockLookupStates';
import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
import { mockExamAppls } from '$lib/mocks/latihan/mockExamAppls.js';
import { getEmployees } from '$lib/service/employees/staff-service.js';
import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

export const load = async ({params}) => {
    const data: IntExamAppl[] = await mockExamAppls;

    const currentExam: IntExamAppl | undefined = data.find(
        (exam) =>
            exam.id === Number(params.examId) &&
            exam.candidateIdentityNumber === params.ic,
    );

    const employees: IntEmployees[] = await getEmployees();

    const currentEmployee: IntEmployees | undefined = employees.find(
        (staff) =>
            staff.employeeNumber == currentExam?.candidateEmpNumber &&
            staff.identityDocumentNumber == params.ic,
    );

    if (!currentEmployee) throw new Error('Record not found');

    const currentEmployeeRace = mockLookupRaces.find((race) => {
        return race.id === currentEmployee?.raceId;
    })!;
    const currentEmployeeReligion = mockLookupReligions.find((religion) => {
        return religion.id === currentEmployee?.religionId;
    })!;
    const currentEmployeeBirthState = mockLookupStates.find((state) => {
        return state.id === currentEmployee?.birthStateId;
    })!;
    const currentEmployeeServiceType = mockLookupServiceTypes.find(
        (serviceType) => {
            return (
                serviceType.id ===
                mockCurrentService.find((service) => {
                    return service.employeeId === currentEmployee?.id;
                })!.serviceTypeId
            );
        },
    )!;
    const currentEmployeeSpouse = mockEmployeePartners.find((spouse) => {
        return spouse.employeeId === currentEmployee?.id;
    })!;
    const currentEmployeeSpouseEmployeeInfo = mockEmployees.find((employee) => {
        return employee.name === currentEmployeeSpouse.name;
    });
    const currentEmployeeService = mockCurrentService.find((service) => {
        return service.employeeId === currentEmployee?.id;
    })!;
    const currentEmployeeGrade = mockLookupGrades.find((grade) => {
        return grade.id === currentEmployeeService.gradeId;
    })!;
    const currentEmployeePosition = mockLookupPositions.find((position) => {
        return position.id === currentEmployeeService.positionId;
    })!;
    const currentEmployeeStatus = mockLookupEmploymentStatus.find((status) => {
        return status.id === currentEmployeeService.employmentStatusId;
    })!;
    const currentEmployeePositionHistory =
        mockEmploymentPositionHistories.filter((positionHistory) => {
            return (
                positionHistory.currentServiceId ===
                currentEmployeeService.serviceTypeId
            );
        })!;
    const currentEmployeePensions = mockEmploymentPensions.find((pension) => {
        return pension.currentServiceId === currentEmployeeService.id;
    })!;
    const currentEmployeeEducations = mockEmployeeEducations.filter(
        (eudcation) => {
            return eudcation.employeeId === currentEmployee?.id;
        },
    )!;
    const currentEmployeeExperience = mockEmployeeExperience.filter(
        (experience) => {
            return experience.employeeId === currentEmployee?.id;
        },
    )!;
    const currentEmployeeNextOfKins = mockEmployeeNextOfKins.find(
        (nextOfKin) => {
            return nextOfKin.employeeId === currentEmployee?.id;
        },
    )!;

    const currentEmployeeUploadedDocuments = mockEmployeeDocumentLists.filter(
        (document) => {
            return document.employeeId === currentEmployee?.id;
        },
    )!;

    if (!currentExam) throw new Error('Record not found');

    const secretaryValidationForm = await superValidate(
        _secretaryValidationSchema
    )

    const secretaryExaminationResultForm = await superValidate(
        _secretaryExaminationResultSchema
    )

    return {
        record: {
            data,
            currentExam,
            currentEmployee,
            currentEmployeeRace,
            currentEmployeeReligion,
            currentEmployeeBirthState,
            currentEmployeeServiceType,
            currentEmployeeSpouse,
            currentEmployeeSpouseEmployeeInfo,
            currentEmployeeService,
            currentEmployeeGrade,
            currentEmployeePosition,
            currentEmployeeStatus,
            currentEmployeePositionHistory,
            currentEmployeePensions,
            currentEmployeeEducations,
            currentEmployeeExperience,
            currentEmployeeNextOfKins,
            currentEmployeeUploadedDocuments,
        },
        secretaryValidationForm,
        secretaryExaminationResultForm,
    };
}

//========================================
// New Examination Schema ================
//========================================
const generalSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda." })

export const _secretaryValidationSchema = z.object({
    secretaryRemark: generalSchema,
    secretaryResult: z.boolean().default(false),
})

export const _secretaryExaminationResultSchema = z.object({
    secretaryExaminationResult: generalSchema,
})

//========================================
// Form Validation Function ==============
//========================================
export const _submitSecretaryValidationForm = async (formData: Object) => {
    const secretaryValidationForm = await superValidate(formData, _secretaryValidationSchema);
    if (!secretaryValidationForm.valid) {
        getErrorToast();
        return fail(400, secretaryValidationForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(secretaryValidationForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { secretaryValidationForm }
}

export const _submitSecretaryExaminationResultForm = async (formData: Object) => {
    const secretaryExaminationResultForm = await superValidate(formData, _secretaryExaminationResultSchema);
    if (!secretaryExaminationResultForm.valid) {
        getErrorToast();
        return fail(400, secretaryExaminationResultForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(secretaryExaminationResultForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { secretaryExaminationResultForm }
}

