import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';
import type { CommonFilterDTO } from '$lib/dto/core/common/common-filter.dto';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { CandidatePersonalResponseDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-personal-details.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';
import { superValidate } from 'sveltekit-superforms';




export async function load({ params }) {


    // ============================================================
    // Superformed the data
    // ============================================================
    // const personalInfoForm = await superValidate(
    //     personalDetailResponse.data?.details as CandidatePersonalResponseDTO,
    //     _personalInfoResponseSchema,
    // );
}