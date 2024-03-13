import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";
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

    
    let secretariatSurcajViewResponse: CommonResponseDTO;
    let secretariatSurcajViewTable = [];

    let surcajViewResponse: CommonResponseDTO;
    let surcajViewTable = [];
    



    secretariatSurcajViewResponse = await IntegrityServices.getSurcajListDetails(param);
    secretariatSurcajViewTable = secretariatSurcajViewResponse.data?.dataList ?? [];

    surcajViewResponse = await IntegrityServices.getSecretariatSurcajListDetails(param);
    surcajViewTable = surcajViewResponse.data?.dataList ?? [];

    return { param,surcajViewTable,secretariatSurcajViewTable };
};