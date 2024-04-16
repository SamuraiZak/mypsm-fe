import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { LoanServices } from "$lib/services/implementation/mypsm/pinjaman/loan.service";


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

    let loanViewResponse: CommonResponseDTO = {};
    let loanViewTable = [];


    loanViewResponse = await LoanServices.getLoanListDetails(param);
    loanViewTable = loanViewResponse.data?.dataList ?? [];

    return{param,loanViewResponse,loanViewTable}

};

export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await LoanServices.getLoanListDetails(param);
    return {
        props: {
            param,
            response,
        },
    };
}


