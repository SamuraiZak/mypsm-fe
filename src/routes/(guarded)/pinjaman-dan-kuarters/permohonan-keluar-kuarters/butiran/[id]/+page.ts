import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import { UserRoleConstant } from "$lib/constants/core/user-role.constant"
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto"
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto"
import type { DropdownDTO } from "$lib/dto/core/dropdown/dropdown.dto"
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto"
import { LookupServices } from "$lib/services/implementation/core/lookup/lookup.service"

export const load = async ({params}) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup();
    
    return {
        currentRoleCode,
        lookup,
    }
}

const getLookup = async () => {
    // -------------------------------------------------------
    const maritalLookupResponse: CommonResponseDTO =
        await LookupServices.getMaritalEnums();

    const maritalLookup: DropdownDTO[] =
        LookupServices.setSelectOptions(maritalLookupResponse)
    // -------------------------------------------------------
    const applicantType: DropdownDTO[] = [
        {name: "Kakitangan LKIM", value: 1},
        {name: "Agensi/Jabatan Luar", value: 2},
    ]
    // -------------------------------------------------------
    const servicesType: RadioDTO[] = [
        {name: "Persekutuan", value: 1},
        {name: "Negeri", value: 2},
    ]

    return {
        applicantType,
        maritalLookup,
        servicesType,
    }
}