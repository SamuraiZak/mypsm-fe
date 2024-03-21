import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant"
import type { RadioDTO } from "$lib/dto/core/radio/radio.dto"

export const load = async ({ params }) => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    const lookup = await getLookup()



    let rowData = [
        {
            label: 'Elaun Kasih Sayang',
            yearOfServices: 10,
            currentAmount: 110,
            dayOnPension: 30,
            total: 550,
        },
        {
            label: 'Elaun Cinta Kasih',
            yearOfServices: 5,
            currentAmount: 350,
            dayOnPension: 31,
            total: 550,
        },
        {
            label: 'Elaun Kuarters Kasih',
            yearOfServices: 8,
            currentAmount: 850,
            dayOnPension: 29,
            total: 1100,
        },
    ]

    let specialDeductionHeading = [
        {name: "Nama Tolakan"},
        {name: "Jumlah Tolakan (RM)"}
    ]
    let specialDeduction = [
        {
            label: 'Koop Kerajaan Sarawak',
            totalDeduct: 30,
        },
        {
            label: 'Takafaul Sarawak',
            totalDeduct: 150,
        },
        {
            label: 'Baitumal Sarawak',
            totalDeduct: 80,
        },
    ]
    return {
        currentRoleCode,
        lookup,
        rowData,
        specialDeduction,
        specialDeductionHeading,
    }
}

const getLookup = async () => {
    const retirementBenefit: RadioDTO[] = [
        { name: "KWSP", value: 1 },
        { name: "Pencen", value: 2 },
    ]

    return {
        retirementBenefit,
    }
}