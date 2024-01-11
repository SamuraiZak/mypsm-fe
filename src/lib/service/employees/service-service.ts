import type { PtbService } from '$lib/interfaces/ptbAndKwap/ptbService';
// import { mockCurrentService } from "$lib/mocks/database/mockCurrentService";

export async function getCurrentService(): Promise<PtbService> {
    // const response = await mockCurrentService;
    const response = {
        currentGrade: 'E32',
        position: 'Akauntan',
        placement: 'LKIM Puchong',
        educationLevel: 'Diploma',
        pensionBenefit: 'true',
        kwspNumber: '123456789',
        socsoNumber: '123456789',
        taxNumber: '123456789',
        bankName: 'Maybank Berhad',
        accountNumber: '182673091012',
        programme: 'Tiada',
        entitledLeaves: '32',
    };

    return response;
}
