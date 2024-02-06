import { getErrorToast, getLoadingToast, getPromiseToast, getServerErrorToast, getSuccessToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
import api from '$lib/services/core/ky.service';
import type { ListSalaryMovementFilterDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { SalaryMovementListDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement.dto';
import { SalaryServices } from '$lib/services/implementations/mypsm/salary/salary.service';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { showLoadingOverlay } from '$lib/stores/globalState';
import { EmployeeServices } from '$lib/services/implementations/mypsm/employee/employee.service';
import type { CommonEmployeeDTO } from '$lib/dto/mypsm/common/employee/employee.dto';
import type { AddSalaryMovementRequestDTO } from '$lib/dto/mypsm/salary/salary-movement/add-salary-movement-request.dto';
import toast from 'svelte-french-toast';
import { goto } from '$app/navigation';
// import { showLoadingOverlay } from '$lib/stores/globalState';

// Annual Salary Increment
const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const numberScheme = z.union([z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}), z.number()]).transform((x) => Number(x)).pipe(z.number({
    required_error: "Medan ini tidak boleh dibiar kosong.",
    invalid_type_error: "Hanya nombor sahaja dibenarkan. Contoh (500.40)",
    description: "Hanya nombor sahaja dibenarkan. Contoh (500.40)"
}))

const option = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
}).max(new Date(), {
    message: 'Tarikh lepas tidak boleh lebih dari tarikh semasa.',
});

export const _annualSalaryIncrement = z.object({
    meetingName: option,
    meetingDate: date,
    salaryMovementMonth: numberScheme,
    specialAid: numberScheme.default(0),
    specialRaiseType: z.string().default(''),
    specialRaise: numberScheme.default(0),
    employees: z.array(z.object({ employeeId: numberScheme }))
}).partial();

export const _submitFormAnnualSalaryIncrement = async (formData: object) => {
    const annualSalaryIncrement = await superValidate(
        formData,
        _annualSalaryIncrement,
    );
    
    console.log(annualSalaryIncrement)
    if (!annualSalaryIncrement.valid) {
        getErrorToast();
        console.log(annualSalaryIncrement)
        return fail(400, annualSalaryIncrement);
    }

    //start by rendering loading toast
    getLoadingToast();

    //add salary movement
    const response: CommonResponseDTO = await SalaryServices.addSalaryMovement(
        annualSalaryIncrement.data as AddSalaryMovementRequestDTO,
    ).finally(() => toast.dismiss());
    console.log(response)

    if (response.status !== 'success') {
        getServerErrorToast();
    }
    getSuccessToast().finally(() =>
        setTimeout(() => { 
            goto('../gaji/pergerakan-gaji/butiran-'+response.data?.details.meetingId)
        }, 2000),
    );
    
    return { annualSalaryIncrement };
};

//Async
export async function load() {

    showLoadingOverlay.set(true)
    // validate form
    const annualSalaryIncrement = await superValidate(_annualSalaryIncrement);


    const filter: ListSalaryMovementFilterDTO = {
        month: 1,
        year: 2024
    }
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: filter,
    };

    //param for employee list
    const employeeListParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 15,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {
            employeeNumber: "",
            name: "",
            identityCard: "",
            program: "",
            scheme: "",
            grade: "",
            position: ""
        }
    }

    const gredLists = undefined
    //  = gredResponse.data.map((element) => ({
    //     value: element.code,
    //     name: element.code,
    // }));
    const salaryMovementRecord: IntSalaryMovementRecord[] =
        mockSalaryMovementRecord;



    // get employeelist and display in table
    const employeeListResponse: CommonResponseDTO =
        await EmployeeServices.getEmployeeList(employeeListParam);
    const employeeList: CommonEmployeeDTO[] = employeeListResponse.data?.dataList as CommonEmployeeDTO[];




    const response: CommonResponseDTO = await SalaryServices.getSalaryMovementList(param)
    const salaryMovementList: SalaryMovementListDTO[] = response.data?.dataList as SalaryMovementListDTO[];

    setTimeout(() => showLoadingOverlay.set(false), 2500);
    return {
        records: {
            gredLists,
            salaryMovementRecord,
        },
        employeeList,
        annualSalaryIncrement,
        salaryMovementList,
    };
};
