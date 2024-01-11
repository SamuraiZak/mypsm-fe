import { mockEmployees } from '$lib/mocks/database/mockEmployees';

export async function getEmployees(): Promise<IntEmployees[]> {
    const response: IntEmployees[] = await mockEmployees;

    return response;
}
