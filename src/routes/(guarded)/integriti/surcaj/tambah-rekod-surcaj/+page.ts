import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { PTBKWAPServices } from "$lib/services/implementation/mypsm/PTB-KWAP/PTB.service";
import { IntegrityServices } from "$lib/services/implementation/mypsm/integriti/integrity.service";



export const load = async () => {

    // const param: CommonListRequestDTO = {
    //     pageNum: 1,
    //     pageSize: 5,
    //     orderBy: null,
    //     orderType: null,
    //     filter: {
    //         grade: null,
    //         position: null,
    //         year: null,
    //         name: null,
    //     },
    // };
    // new table
    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "id",
        orderType: 1,
        filter: {
            grade: null,
            position: null,
            year: null,
            name: null,
        },
    };




    
    let addSurcajViewResponse: CommonResponseDTO = {};
    let addSurcajViewTable = [];


    addSurcajViewResponse = await IntegrityServices.getSurcajListAddDetails(param);
    addSurcajViewTable = addSurcajViewResponse.data?.dataList ?? [];



    return { param,addSurcajViewTable,addSurcajViewResponse };
};

export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await IntegrityServices.getSurcajListAddDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}