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
import { getEmployees } from '$lib/service/employees/staff-service.js';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

//Stepper Charges Meeting Info
const dateChargesMeetingInfo = z.coerce
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

const optionChargesMeetingInfo = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperChargesMeetingInfo = z.object({
    meetingDate: dateChargesMeetingInfo.refine((date) => date.toLocaleDateString()),
    meetingsDropdown: optionChargesMeetingInfo,
});

export const _submitFormStepperChargesMeetingInfo = async (
    formData: object,
) => {
    const stepperChargesMeetingInfo = await superValidate(
        formData,
        _stepperChargesMeetingInfo,
    );

    if (!stepperChargesMeetingInfo.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperChargesMeetingInfo);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperChargesMeetingInfo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(
                    'Response Returned: StepperChargesMeetingInfo-54',
                    json,
                );
            });
    }
    return { stepperChargesMeetingInfo };
};

//Stepper Charges Meeting Info Determination Proceeding Punishment
const dateChargesMeetingInfoDeterminationProceedingPunishment = z.coerce
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

const optionChargesMeetingInfoDeterminationProceedingPunishment = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperChargesMeetingInfoDeterminationProceedingPunishment = z.object({
    meetingDate: dateChargesMeetingInfoDeterminationProceedingPunishment.refine((date) => date.toLocaleDateString()),
    meetingNumberDropdown: optionChargesMeetingInfoDeterminationProceedingPunishment,
    meetingNameDropdown: optionChargesMeetingInfoDeterminationProceedingPunishment,
    meetingResultOption: optionChargesMeetingInfoDeterminationProceedingPunishment,
});

export const _submitFormStepperChargesMeetingInfoDeterminationProceedingPunishment = async (
    formData: object,
) => {
    const stepperChargesMeetingInfoDeterminationProceedingPunishment = await superValidate(
        formData,
        _stepperChargesMeetingInfoDeterminationProceedingPunishment,
    );

    if (!stepperChargesMeetingInfoDeterminationProceedingPunishment.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperChargesMeetingInfoDeterminationProceedingPunishment);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperChargesMeetingInfoDeterminationProceedingPunishment),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(
                    'Response Returned: StepperChargesMeetingInfoDeterminationProceedingPunishment-54',
                    json,
                );
            });
    }
    return { stepperChargesMeetingInfoDeterminationProceedingPunishment };
};

//Stepper Suspension Meeting Info
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

export const _stepperSuspensionMeetingInfo = z.object({
    meetingDate: date.refine((date) => date.toLocaleDateString()),
    meetingNumberDropdown: date.refine((date) => date.toLocaleDateString()),
    meetingNameDropdown: option,
    meetingResultOption: option,
    suspensionTypeDropdown: option,
    startDateSuspensionInvestigation: option,
    startDateSuspensionSuspended: option,
});

export const _submitFormStepperSuspensionMeetingInfo = async (
    formData: object,
) => {
    const stepperSuspensionMeetingInfo = await superValidate(
        formData,
        _stepperSuspensionMeetingInfo,
    );

    if (!stepperSuspensionMeetingInfo.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperSuspensionMeetingInfo);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperSuspensionMeetingInfo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(
                    'Response Returned: StepperSuspensionMeetingInfo-54',
                    json,
                );
            });
    }
    return { stepperSuspensionMeetingInfo };
};

export async function load({ params }) {
    const stepperChargesMeetingInfo = await superValidate(
        _stepperChargesMeetingInfo,
    );
    const stepperChargesMeetingInfoDeterminationProceedingPunishment = await superValidate(
        _stepperChargesMeetingInfoDeterminationProceedingPunishment,
    );
    const stepperSuspensionMeetingInfo = await superValidate(
        _stepperSuspensionMeetingInfo,
    );

    const data: IntEmployees[] = await getEmployees();

    const currentEmployee: IntEmployees | undefined = data.find(
        (staff) =>
            staff.employeeNumber == params.id &&
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

    if (!currentEmployee) throw new Error('Record not found');

    return {
        stepperChargesMeetingInfo,
        stepperChargesMeetingInfoDeterminationProceedingPunishment,
        stepperSuspensionMeetingInfo,
        record: {
            data,
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
