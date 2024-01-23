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
import { mockProsiding } from '$lib/mocks/integriti/prosiding/mockProsiding.js';
import { getEmployees } from '$lib/service/employees/staff-service.js';
import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

//Meeting Result
const date = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .max(new Date(), {
        message: 'Tarikh lepas tidak boleh lebih dari tarikh semasa.',
    });

const option = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperMeetingResult = z.object({
    meetingDate: date.refine((date) => date.toLocaleDateString()),
    meetingNumberDropdown: option,
    meetingNameDropdown: option,
    meetingResultOption: option,
});

export const _submitFormStepperMeetingResult = async (formData: object) => {
    const stepperMeetingResult = await superValidate(
        formData,
        _stepperMeetingResult,
    );

    if (!stepperMeetingResult.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperMeetingResult);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperMeetingResult),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: StepperMeetingResult-54', json);
            });
    }
    return { stepperMeetingResult };
};

//Disciplinary Proceedings Meeting Info Result
const optionDisciplinaryProceedingsMeetingInfoResult = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperDisciplinaryProceedingsMeetingInfoResult = z.object({
    meetingNumberDropdown: option,
    meetingNameDropdown: option,
    meetingResultOption: option,
});

export const _submitFormStepperDisciplinaryProceedingsMeetingInfoResult =
    async (formData: object) => {
        const stepperDisciplinaryProceedingsMeetingInfoResult =
            await superValidate(
                formData,
                _stepperDisciplinaryProceedingsMeetingInfoResult,
            );

        if (!stepperDisciplinaryProceedingsMeetingInfoResult.valid) {
            toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
                style: 'background: #333; color: #fff;',
            });
            return fail(400, stepperDisciplinaryProceedingsMeetingInfoResult);
        }
        const responsePromise = fetch(
            'https://jsonplaceholder.typicode.com/posts',
            {
                method: 'POST',
                body: JSON.stringify(
                    _stepperDisciplinaryProceedingsMeetingInfoResult,
                ),
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
        return { stepperDisciplinaryProceedingsMeetingInfoResult };
    };

//Update Crime Offence Info
const optionUpdateCrimeOffenceInfot = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _updateCrimeOffenceInfo = z.object({
    meetingResultOption: optionUpdateCrimeOffenceInfot,
});

export const _submitFormUpdateCrimeOffenceInfo = async (formData: object) => {
    const updateCrimeOffenceInfo = await superValidate(
        formData,
        _updateCrimeOffenceInfo,
    );

    if (!updateCrimeOffenceInfo.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, updateCrimeOffenceInfo);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_updateCrimeOffenceInfo),
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
    return { updateCrimeOffenceInfo };
};

export async function load({ params }) {
    const stepperMeetingResult = await superValidate(_stepperMeetingResult);
    const stepperDisciplinaryProceedingsMeetingInfoResult = await superValidate(
        _stepperDisciplinaryProceedingsMeetingInfoResult,
    );
    const updateCrimeOffenceInfo = await superValidate(_updateCrimeOffenceInfo);

    const proceedingData: IntProsiding[] = await mockProsiding;

    const currentProceeding: IntProsiding | undefined = proceedingData.find(
        (proceeding) => proceeding.id === params.prosidingId,
    );

    if (!currentProceeding) throw new Error('Record not found');

    const data: IntEmployees[] = await getEmployees();

    const currentEmployee: IntEmployees | undefined = data.find(
        (staff) => staff.identityDocumentNumber == params.ic,
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

    if (!currentEmployee) throw new Error('Record not found');

    return {
        stepperMeetingResult,
        stepperDisciplinaryProceedingsMeetingInfoResult,
        updateCrimeOffenceInfo,
        record: {
            data,
            currentProceeding,
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
    };
}
