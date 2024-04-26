import type {
    AuditTrailDTO,
    AuditTrailFilterDTO,
} from '$lib/dto/core/admin/admin.dto.js';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto.js';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto.js';
import { AdminServices } from '$lib/services/implementation/core/admin/admin.service.js';

export async function load({ params }) {
    // fetch audit log
    let auditLog: AuditTrailDTO[] = [];

    const auditLogFilter: AuditTrailFilterDTO = {
        module: 0,
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

    return {
        props: {
            auditLog,
            auditLogFilter,
            auditLogRequest,
            auditLogResponse,
        },
    };
}
