import type { CommonListRequestDTO } from '../common/common-list-request.dto';
import type { Meta } from '../common/common-response.dto';
import type { DictionaryDTO } from '../dictionary/dictionary.dto';

export interface TableDTO {
    param: CommonListRequestDTO;
    meta: Meta;
    data: object[];
    selectedData?: object[];
    hiddenData?: string[];
    printData?: object[];
}

export interface TableSettingDTO {
    param: CommonListRequestDTO;
    meta: Meta;
    data: object[];
    selectedData: object[];
    exportData: object[];
    hiddenColumn: string[];
    dictionary: DictionaryDTO[];
    url: string;
    id: string;
    option: {
        checkbox: boolean;
        detail: boolean;
        edit: boolean;
        select: boolean;
        filter: boolean;
    };
    controls: {
        add: boolean;
    };
}
