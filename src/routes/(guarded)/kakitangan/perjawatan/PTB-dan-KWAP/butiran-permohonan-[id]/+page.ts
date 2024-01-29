import { EmployeeService } from '$lib/services/implementations/mypsm/employee/employee-services.service.js';
import type { DetailPensionDetailRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-pension-detail-request.view-model.js';
import type {
    DetailPensionDetail,
    DetailPensionDetailResponse,
} from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-pension-detail-response.view-model.js';
import type {
    PensionDetailSalaryResponse,
    Salary,
} from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-salary-response.view-model';
import type { PensionDetailServiceRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-service-request.view-model.js';
import type {
    PensionDetailServiceResponse,
    Service,
} from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-service-response.view-model';
import type { PensionPersonalDetailRequest } from '$lib/view-models/mypsm/perjawatan/pension/pension-personal-detail-request.view-model.js';
import type {
    Employee,
    PensionPersonalDetailResponse,
} from '$lib/view-models/mypsm/perjawatan/pension/pension-personal-detail-response.view-model';

export async function load({ params }) {
    // const record: PtbAndKwap | undefined = data.find(
    //     (record) =>
    //         record.noPekerja === params.id &&
    //         record.noKadPengenalan === params.ic,
    // );

    // if (!record) throw new Error('Record not found');

    // maklumat Kakitangan
    const pensionPersonalRequestBody: PensionPersonalDetailRequest = {
        id: Number(params.id),
    };

    const pensionPersonalResponse: PensionPersonalDetailResponse =
        await EmployeeService.PensionPersonalDetail(pensionPersonalRequestBody);
    const PensionEmployeelistPersonal: Employee =
        pensionPersonalResponse.data.employee;

    // maklumat PTB dan KWAP
    const detailPensionDetailresponse: DetailPensionDetailResponse =
        await EmployeeService.DetailPensionDetail(pensionPersonalRequestBody);
    const detailPensionDetailList: DetailPensionDetail =
        detailPensionDetailresponse.data.pensionDetail;

    // maklumat Perkhidmatan
    const pensionDetailServiceresponse: PensionDetailServiceResponse =
        await EmployeeService.PensionDetailService(pensionPersonalRequestBody);
    const pensionDetailServiceList: Service =
        pensionDetailServiceresponse.data.service;

    // maklumat Gaji
    const pensionDetailSalaryesponse: PensionDetailSalaryResponse =
        await EmployeeService.PensionDetailSalary(pensionPersonalRequestBody);
    const pensionDetailSalaryList: Salary =
        pensionDetailSalaryesponse.data.salary;

    return {
        PensionEmployeelistPersonal,
        detailPensionDetailList,
        pensionDetailServiceList,
        pensionDetailSalaryList,
    };
}
