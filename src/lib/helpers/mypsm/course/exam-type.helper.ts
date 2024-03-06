import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';

export const renameExamTypeKeyValue = async (response: CommonResponseDTO) => {
    // renaming the enums and ids to relevant names
    if (response.status === 'success' && response.data?.dataList) {
        const modifiedTableData = response.data.dataList.map((item) => ({
            ...item,
            examTypeId: item.examTypeId === 1 ? 'Perkhidmatan' : 'PSL',
        }));
        response.data.dataList = modifiedTableData;
    }
};
