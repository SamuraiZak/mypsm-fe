import type { CommonListRequestDTO } from '../common/common-list-request.dto';
import type { Meta } from '../common/common-response.dto';

export interface TableConfigDTO {
    columns: TableColumnDTO[];
    rows: TableRowDTO[] | null;
    param: CommonListRequestDTO;
    meta: Meta;
    selectedData: TableRowDTO[];
    exportData: TableRowDTO[];
    url: string;
    id: string;
    option?: {
        checkbox?: boolean;
        detail?: boolean;
        edit?: boolean;
        select?: boolean;
        add?: boolean;
        export?: {
            pdf?: boolean;
            excel?: boolean;
        };
    };
}

export interface TableColumnDTO {
    key: string;
    name: string;
}

export interface TableRowDTO {
    [key: string]: any;
}
