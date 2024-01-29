

import { mockPTBdanKWAP } from '$lib/mocks/perjawatan/PTB-dan-KWAP/ptb-dan-kwap.js';
import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service';
import type { PensionListSupportRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-support-request.model';
import type { PensionDetail, PensionListSupportResponse } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-support-response.model';

export async function load() {
    // const fetchedData: PtbAndKwap[] = mockPTBdanKWAP;
    const requestBody:PensionListSupportRequest ={
        pageNum: 1,
        pageSize: 10,
        orderBy: 'createdAt',
        orderType: 'asc',
        filter: {},

    };
    const response: PensionListSupportResponse =
    await EmployeeService.PensionListSupport(requestBody);
    const record :PensionDetail[] =response.data.pensionDetails

    return {
        // props: {
        //     lists: fetchedData.map((list) => ({
        //         noPekerja: list.noPekerja,
        //         namaPekerja: list.namaPekerja,
        //         noKadPengenalan: list.noKadPengenalan,
        //         kategori: list.kategori,
        //         tarikhMohon: list.tarikhMohon,
        //         status: 'KEMASKINI',
        //         tindakanUlasan: list.tindakanUlasan,
        //     })),
        // },
    };
}


