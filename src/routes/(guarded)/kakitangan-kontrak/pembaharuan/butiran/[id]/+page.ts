import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant.js'
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js'
import type { RadioDTO } from '$lib/dto/core/radio/radio.dto.js'
import { zod } from 'sveltekit-superforms/adapters'

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const inputOption = getInputOption();


    return {
        currentRoleCode,
        inputOption,
    }
}

const getInputOption = () => {
    const verifyOption: RadioDTO[] = [
        { name: "Sah", value: true },
        { name: "Tidak Sah", value: false }
    ]
    const supportOption: RadioDTO[] = [
        { name: "Sokong", value: true },
        { name: "Tidak Sokong", value: false }
    ]
    const approveOption: RadioDTO[] = [
        { name: "Lulus", value: true },
        { name: "Tidak Lulus", value: false }
    ]

    const meetingNameOption: DropdownDTO[] = [
        { value: 'Mesyuarat 1/12', name: 'Mesyuarat 1/12' },
        { value: 'Mesyuarat 1/102', name: 'Mesyuarat 1/102' },
        { value: 'Mesyuarat 2/101', name: 'Mesyuarat 2/101' },
    ]

    return {
        verifyOption,
        meetingNameOption,
        supportOption,
        approveOption,
    }
}
