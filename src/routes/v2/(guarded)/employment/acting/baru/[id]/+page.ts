import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service';

export const load = async ({ params }) => {
    const param = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: {
            program: "SEMUA", // 'TETAP' | 'PERCUBAAN' | 'SEMENTARA' | 'KONTRAK' | 'PROJEK' | 'SAMBILAN' | 'PINJAMAN' | 'LAIN-LAIN' | 'SEMUA',
            employeeNumber: null,
            name: null,
            identityCard: null,
            scheme: "",
            grade: null,
            position: null
        },
    };

    const actingEmployeeListResponse: CommonResponseDTO =
        await EmploymentActingServices.getActingEmployeeList(param);

    let actingEmployeeList: CommonEmployeeDTO[] = [];

    if (actingEmployeeListResponse.status == "success") {
        actingEmployeeList = actingEmployeeListResponse.data?.dataList as CommonEmployeeDTO[];
    }

    //lookup
    const gradeLookupResponse: CommonResponseDTO =
        await LookupServices.getServiceGradeEnums();

    const gradeLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsBothAreCode(gradeLookupResponse);

    let nullGrade: DropdownDTO = {
        value: null,
        name: "Semua"
    }

    gradeLookup.push(nullGrade)
    const positionLookupResponse: CommonResponseDTO =
        await LookupServices.getPositionEnums();

    const positionLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsValueIsDescription(positionLookupResponse)


    const actingTypes: string = params.id;
    return {
        actingEmployeeList,
        actingEmployeeListResponse,
        param,
        actingTypes,
        gradeLookup,
        positionLookup,
    };

};