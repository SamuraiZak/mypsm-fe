// ===============================================================
// Common Response Constant
// ===============================================================

import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';

export class CommonResponseConstant {
    public static httpError: CommonResponseDTO = {
        status: 'error',
        message: 'Terdapat masalah semasa mengakses data.',
        data: {
            details: {},
            dataList: [],
        },
    };
}
