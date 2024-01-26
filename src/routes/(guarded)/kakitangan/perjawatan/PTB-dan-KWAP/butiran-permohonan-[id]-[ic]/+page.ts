
import { mockPTBdanKWAP } from '$lib/mocks/perjawatan/PTB-dan-KWAP/ptb-dan-kwap.js';
import type { PensionPersonalDetailResponse, Employee } from '$lib/view-models/mypsm/perjawatan/pension/pension-personal-detail-response.view-model';
import type { PensionPersonalDetailRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-personal-detail-request.view-model.js';
import type { DetailPensionDetailRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-pension-detail-request.view-model.js';
import type { DetailPensionDetailResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-pension-detail-response.view-model.js';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service.js';


export async function load({ params }) {
    const data: PtbAndKwap[] = mockPTBdanKWAP;

    // const record: PtbAndKwap | undefined = data.find(
    //     (record) =>
    //         record.noPekerja === params.id &&
    //         record.noKadPengenalan === params.ic,
    // );

    // if (!record) throw new Error('Record not found');
    const requestBody:PensionPersonalDetailRequest ={
        id: 1,
    };

    const response : PensionPersonalDetailResponse =
    await EmployeeService.PensionPersonalDetail(requestBody);
    const employeelist: Employee = response.data.employee

    // comst requestBody: DetailPensionDetailRequest ={
    //     is :1
    // };


    return { employeelist };
}

