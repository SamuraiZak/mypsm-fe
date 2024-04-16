// import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
// import { RoleConstant } from '$lib/constants/core/role.constant';
// import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
// import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
// import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
// import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
// import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
// import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js'
// import type { PersonalDetail } from '$lib/dto/mypsm/pinjaman/personal-detail.dto';
// import type { CandidatePersonalResponseDTO } from '$lib/dto/mypsm/profile/personal-detail.dto';
// import { getErrorToast } from '$lib/helpers/core/toast.helper';
// import { _personalDetail } from '$lib/schemas/mypsm/loan/loan-application';
// import { LoanServices } from '$lib/services/implementation/mypsm/pinjaman/loan.service';
// import { superValidate } from 'sveltekit-superforms';
// import { zod } from 'sveltekit-superforms/adapters';


// export async function load({ }) {

//     //==================================================
//     //=============== Load Function ====================
//     //================================================== 
//     const personalDetailResponse: CommonResponseDTO =
//     await LoanServices.getProfilePersonalDetails();


//     const loanDetailResponse: CommonResponseDTO =
//     await LoanServices.getLoanDetails();

//     const vehicleDetailResponse: CommonResponseDTO =
//     await LoanServices.getVehicleDetails();





//     const personalDetail = await superValidate(personalDetailResponse.data?.details as PersonalDetail, zod(
//         _personalDetail))
//         ;

//     return {
//         personalDetailResponse,
//         loanDetailResponse,
//         vehicleDetailResponse,

//         personalDetail,

//     }











// }