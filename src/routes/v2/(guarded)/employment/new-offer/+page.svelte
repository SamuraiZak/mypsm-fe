<script lang="ts">
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { NewOfferMeetingListResponseDTO } from '$lib/dto/mypsm/employment/new-offer/new-offer-request-response.dto';
    import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { NewOfferServices } from '$lib/services/implementation/mypsm/employment/new-offer/new-offer.service';
    import { error } from '@sveltejs/kit';
    import { getErrorToast } from '$lib/helpers/core/toast.helper';

    export let data: LayoutData;
    let rowData: NewOfferMeetingListResponseDTO;

    // Table list - New Offer Meeting
    let newOfferMeetingBatchListTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.responses.newOfferMeetingListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.responses.newOfferMeetingListResponse.data
                ?.dataList as NewOfferMeetingListResponseDTO[]) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId'],
        dictionary: [
            {
                english: 'meetingNo',
                malay: 'Nombor Mesyuarat',
            },
            {
                english: 'totalEmployee',
                malay: 'Kakitangan Terlibat',
            },
        ],
        url: 'employment/new_offer/list',
        id: 'newOfferMeetingBatchListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.roles.isEmploymentSecretaryRole,
        },
    };

    const checkIfFail = async (id: number, status: string) => {
        const idRequestBody: commonIdRequestDTO = {
            id: Number(id),
        };

        const newOfferFullDetailViewResponse: CommonResponseDTO =
            await NewOfferServices.getNewOfferFullDetail(idRequestBody);

        if (newOfferFullDetailViewResponse.status === 'error') {
            getErrorToast(
                'Harap Maklum. Tiada maklumat dijumpai pada masa ini. Sila laporkan kepada admin sistem.',
            );
            error(500, {
                message: newOfferFullDetailViewResponse.message as string,
            });
        }
        let route = '';

        if (rowData.status === 'Draf') {
            route = `./new-offer/add-new-offer/edit-new-batch-${id}`;
        } else {
            route = `./new-offer/${id}-${status}`;
        }
        goto(route);
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Tawaran Baru Dalam Perkhidmatan"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DataTable
                title="Senarai Rekod Mesyuarat Tawaran Baru"
                bind:tableData={newOfferMeetingBatchListTable}
                bind:passData={rowData}
                detailActions={() => {
                    checkIfFail(rowData.applicationId, rowData.status);
                }}
                addActions={() => {
                    goto('./new-offer/add-new-offer');
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Mesyuarat"
                        bind:inputValue={newOfferMeetingBatchListTable.param
                            .filter.meetingName}
                    ></FilterTextField>
                    <FilterDateField
                        label="Tarikh Mesyuarat"
                        bind:inputValue={newOfferMeetingBatchListTable.param
                            .filter.meetingDate}
                    ></FilterDateField>
                    <FilterSelectField
                        label="Status"
                        options={data.selectionOptions.statusLookup}
                        bind:inputValue={newOfferMeetingBatchListTable.param
                            .filter.status}
                    ></FilterSelectField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>

<Toaster />
