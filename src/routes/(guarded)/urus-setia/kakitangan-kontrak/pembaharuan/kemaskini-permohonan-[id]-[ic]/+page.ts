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

// Stepper Update New Appointment
const option = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperConfirmationNewContractAgreement = z.object({
    actionRemark: textField,
    resultOption: option,
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
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperConfirmationNewContractAgreement),
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
                    'Response Returned: ConfirmationNewContractAgreement-54',
                    json,
                );
            });
    }
    return { stepperConfirmationNewContractAgreement };
};

export async function load({ params }) {
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
