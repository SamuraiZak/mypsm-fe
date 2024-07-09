export interface CommonFilterDTO {
    // personal
    name?: string | null;
    icNumber?: string | null;
    employeeNumber?: string | null;

    // employment
    grade?: string | null;
    position?: string | null;

    // range
    month?: number | null;
    year?: number | null;

    // application
    status?: string | null;
}
