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
import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Stepper Evaluate Confirmation
const optionEvaluateConfirmation = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

const textFieldEvaluateConfirmation = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperEvaluateConfirmation = z.object({
    actionRemark: textFieldEvaluateConfirmation,
    resultOption: optionEvaluateConfirmation,
});

export const _submitFormStepperEvaluateConfirmation = async (
    formData: object,
) => {
    const stepperEvaluateConfirmation = await superValidate(
        formData,
        _stepperEvaluateConfirmation,
    );

    if (!stepperEvaluateConfirmation.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperEvaluateConfirmation);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperEvaluateConfirmation),
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
    return { stepperEvaluateConfirmation };
};

// Stepper Assessment Certification PBN
const optionAssessmentCertificationPBN = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

const textFieldAssessmentCertificationPBN = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperAssessmentCertificationPBN = z.object({
    actionRemark: textFieldAssessmentCertificationPBN,
    resultOption: optionAssessmentCertificationPBN,
});

export const _submitFormStepperAssessmentCertificationPBN = async (
    formData: object,
) => {
    const stepperAssessmentCertificationPBN = await superValidate(
        formData,
        _stepperAssessmentCertificationPBN,
    );

    if (!stepperAssessmentCertificationPBN.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperAssessmentCertificationPBN);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperAssessmentCertificationPBN),
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
    return { stepperAssessmentCertificationPBN };
};

// Stepper Contract Staff Employment Meeting Results Information
const optionCSEMRI = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const textFieldCSEMRI = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperContractStaffEmploymentMeetingResultsInformation =
    z.object({
        actionRemarkCSEMRI: textFieldCSEMRI,
        meetingsDropdown: textFieldCSEMRI,
        meetingDate: date.refine((data) => data <= new Date(), {
            message: 'Tidak boleh lebih daripada tarikh semasa',
        }),
        resultOptionCSEMRI: optionCSEMRI,
    });

export const _submitFormStepperContractStaffEmploymentMeetingResultsInformation =
    async (formData: object) => {
        const stepperContractStaffEmploymentMeetingResultsInformation =
            await superValidate(
                formData,
                _stepperContractStaffEmploymentMeetingResultsInformation,
            );

        if (!stepperContractStaffEmploymentMeetingResultsInformation.valid) {
            toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
                style: 'background: #333; color: #fff;',
            });
            return fail(
                400,
                stepperContractStaffEmploymentMeetingResultsInformation,
            );
        }
        const responsePromise = fetch(
            'https://jsonplaceholder.typicode.com/posts',
            {
                method: 'POST',
                body: JSON.stringify(
                    _stepperContractStaffEmploymentMeetingResultsInformation,
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
        return { stepperContractStaffEmploymentMeetingResultsInformation };
    };

// Stepper Set Supporter Approver
const resultOption = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperSetSupporterApprover = z.object({
    supporterNameDropdown: resultOption,
    approverNameDropdown: resultOption,
});

export const _submitFormStepperSetSupporterApprover = async (
    formData: object,
) => {
    const stepperSetSupporterApprover = await superValidate(
        formData,
        _stepperSetSupporterApprover,
    );

    if (!stepperSetSupporterApprover.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperSetSupporterApprover);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperSetSupporterApprover),
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
    return { stepperSetSupporterApprover };
};

// Stepper Confirmation New Contract
const optionCNCA = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

const textFieldCNCA = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperConfirmationNewContractAgreement = z.object({
    actionRemarkCNCA: textFieldCNCA,
    resultOptionCNCA: optionCNCA,
});

export const _submitFormStepperConfirmationNewContractAgreement = async (
    formData: object,
) => {
    const stepperConfirmationNewContractAgreement = await superValidate(
        formData,
        _stepperConfirmationNewContractAgreement,
    );

    if (!stepperConfirmationNewContractAgreement.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperConfirmationNewContractAgreement);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperConfirmationNewContractAgreement),
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
    return { stepperConfirmationNewContractAgreement };
};

export async function load({ params }) {
    const stepperEvaluateConfirmation = await superValidate(
        _stepperEvaluateConfirmation,
    );

    const stepperAssessmentCertificationPBN = await superValidate(
        _stepperAssessmentCertificationPBN,
    );

    const stepperContractStaffEmploymentMeetingResultsInformation =
        await superValidate(
            _stepperContractStaffEmploymentMeetingResultsInformation,
        );

    const stepperSetSupporterApprover = await superValidate(
        _stepperSetSupporterApprover,
    );

    const stepperConfirmationNewContractAgreement = await superValidate(
        _stepperConfirmationNewContractAgreement,
    );

    const data: IntEmployees[] = await getEmployees();

    const currentEmployee: IntEmployees | undefined = data.find(
        (staff) =>
            staff.employeeNumber === params.id &&
            staff.identityDocumentNumber === params.ic,
    );

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
        stepperEvaluateConfirmation,
        stepperAssessmentCertificationPBN,
        stepperContractStaffEmploymentMeetingResultsInformation,
        stepperSetSupporterApprover,
        stepperConfirmationNewContractAgreement,
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
