import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { EmploymentActingServices } from '$lib/services/implementation/mypsm/perjawatan/employment-acting.service';

export const load = async ({ params }) => {
    let actingEmployeeListResponse: CommonResponseDTO = {}
    let actingEmployeeList: CommonEmployeeDTO[] = [];
    const actingTypes: string = params.id;

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


    if (actingTypes !== "Flexi 41") {
        actingEmployeeListResponse =
            await EmploymentActingServices.getActingEmployeeList(param);
        if (actingEmployeeListResponse.status == "success") {
            actingEmployeeList = actingEmployeeListResponse.data?.dataList as CommonEmployeeDTO[];
        }
    } else {
        actingEmployeeListResponse =
            await EmploymentActingServices.getActingEmployee41List(param);
        if (actingEmployeeListResponse.status == "success") {
            actingEmployeeList = actingEmployeeListResponse.data?.dataList as CommonEmployeeDTO[];
        }
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
        LookupServices.setSelectOptionsActingGrade(positionLookupResponse)


    return {
        actingEmployeeList,
        actingEmployeeListResponse,
        param,
        actingTypes,
        gradeLookup,
        positionLookup,
    };

};