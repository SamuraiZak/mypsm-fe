import type { CommonListRequestDTO } from '../common/common-list-request.dto';
import type { Meta } from '../common/common-response.dto';

export interface TableDTO {
    param: CommonListRequestDTO;
    meta: Meta;
    data: object[];
    selectedData?: object[];
    hiddenData?: string[];
    printData?: object[];
}
