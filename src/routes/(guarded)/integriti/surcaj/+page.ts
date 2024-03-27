import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { IntegrityServices } from "$lib/services/implementation/mypsm/integriti/integrity.service";



export const load = async () => {

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            dataType: 1,
            staffName: "",
            staffNo: "",
            identityCard: "",
           applicationDate: null,
            grade: "",
            position: "",
            status: "" // status code from lookup | null | undefined;
        },
    };

    
    let directorSurcajViewResponse: CommonResponseDTO;
    let directorSurcajViewTable = [];

    let surcajViewResponse: CommonResponseDTO;
    let surcajViewTable = [];

    let employeeSurcajViewResponse: CommonResponseDTO;
    let employeeSurcajViewTable = [];
    

    directorSurcajViewResponse = await IntegrityServices.getSurcajListDetails(param);
    directorSurcajViewTable = directorSurcajViewResponse.data?.dataList ?? [];

    surcajViewResponse = await IntegrityServices.getDirectorSurcajListDetails(param);
    surcajViewTable = surcajViewResponse.data?.dataList ?? [];

    employeeSurcajViewResponse = await IntegrityServices.getEmployeeSurcajListDetails(param);
    employeeSurcajViewTable = employeeSurcajViewResponse.data?.dataList ?? [];

    return { param,surcajViewTable,directorSurcajViewTable,employeeSurcajViewTable };
};