import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
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
}).default(0))

const option = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

export const _annualSalaryIncrement = z.object({
    meetingTypeOption: option,
    meetingDate: date.refine((data) => data <= new Date(), {
        message: 'Tidak boleh lebih daripada tarikh semasa',
    }),
    salaryMovementMonth: option,
    gred: numberScheme,
    specialFiAid: numberScheme,
    specialFiAidText: numberScheme,
}).partial();

export const _submitFormAnnualSalaryIncrement = async (formData: object) => {
    const annualSalaryIncrement = await superValidate(
        formData,
        _annualSalaryIncrement,
    );

    if (!annualSalaryIncrement.valid) {
        getErrorToast();
        console.log(annualSalaryIncrement)
        return fail(400, annualSalaryIncrement);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_annualSalaryIncrement),
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
        pageSize: 5,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {
            "employeeNumber": "",
            "name": "",
            "identityCard": "",
            "program": "",
            "scheme": "",
            "grade": "",
            "position": ""
        }
    }
    // const getGredLookup: CommonListRequestDTO = {
    //     pageNum: 1,
    //     pageSize: 10,
    //     orderBy: 'createdAt',
    //     orderType: 'asc',
    //     filter: filter,
    // };



    // console.log(JSON.stringify(getGredLookup));

    // Gred lookup
    // const gredResponse: Response = await api
    //     .post('lookups/grades', {
    //         body: JSON.stringify(getGredLookup),
    //     })
    //     .json();

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
