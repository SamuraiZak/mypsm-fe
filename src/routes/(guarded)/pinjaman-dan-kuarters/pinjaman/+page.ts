import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { addLoan } from "$lib/dto/mypsm/pinjaman/add-loan.dto";
import { LoanServices } from "$lib/services/implementation/mypsm/pinjaman/loan.service";


export const load = async () => {

     // =============================
    // set mode
    // =============================

    let userMode: string = "kakitangan";

    const currentRoleCode: string = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode) ?? "";

    switch (currentRoleCode) {
        case UserRoleConstant.kakitangan.code:
            userMode = "kakitangan"
            break;

        case UserRoleConstant.pelulus.code:
            userMode = "pelulus";
            break;

        case UserRoleConstant.ketuaSeksyen.code:
            userMode = "ketua Seksyen";
            break;

        case UserRoleConstant.urusSetiaPentadbiran.code:
            userMode = "urusetia";
            break;

        default:
            break;
    }

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

    return{
        param,loanViewResponse,loanViewTable,userMode}

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


export const _applyLoan = async (loanType: string) => {
    
    let selectedType: addLoan = {
        loanType: loanType,
    }
   
    const response: CommonResponseDTO =
        await LoanServices.addLoan(selectedType);
 
    if (response.status == "success") {
        return { response }
    } else {
        new Error('Failed to create new application.')
    }
}