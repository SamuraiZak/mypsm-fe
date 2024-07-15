import type {
    AuditTrailDTO,
    AuditTrailFilterDTO,
} from '$lib/dto/core/admin/admin.dto.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto.js';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto.js';
import { LookupHelper } from '$lib/helpers/core/lookup.helper.js';
import { AdminServices } from '$lib/services/implementation/core/admin/admin.service.js';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service.js';

export async function load({ params }) {
    // fetch audit log
    let auditLog: AuditTrailDTO[] = [];

    const auditLogFilter: AuditTrailFilterDTO = {
        moduleId: null,
        employeeName: null,
        date: null,
    };

    const auditLogRequest: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: null,
        orderType: null,
        filter: auditLogFilter,
    };

    const auditLogResponse: CommonResponseDTO =
        await AdminServices.getAuditTrail(auditLogRequest);

    if (auditLogResponse.status == 'success') {
        auditLog = auditLogResponse.data?.dataList as AuditTrailDTO[];
    }

    // get module lookup
    let moduleDropdown: DropdownDTO[] = [];

    let moduleList: LookupDTO[] = [];

    const moduleListResponse = await LookupServices.getModuleEnums();

    if (moduleListResponse.status == 'success') {
        moduleList = moduleListResponse.data?.dataList as LookupDTO[];

        moduleDropdown = LookupHelper.toDropdownProperId(moduleList);
    }

    return {
        props: {
            auditLog,
            auditLogFilter,
            auditLogRequest,
            auditLogResponse,
            moduleDropdown,
        },
    };
}
