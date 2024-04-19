<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { ClinicPanelClaimList } from '$lib/dto/mypsm/perubatan/clinic-panel-claim-list.dto';
    import { zod } from 'sveltekit-superforms/adapters';
    import type { PageData } from './$types';
    import { _editAllocations } from '$lib/schemas/mypsm/medical/medical-schema';
    import { _submit } from './+page';
    import { Toaster } from 'svelte-french-toast';
    import Alert from 'flowbite-svelte/Alert.svelte';

    export let data: PageData;
    let rowData: ClinicPanelClaimList;
    let readOnly: boolean = true;

    let claimListTable: TableSettingDTO = {
        param: data.param,
        meta: data.clinicPanelClaimListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.clinicPanelClaimList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama',
            },
        ],
        url:
            data.currentRoleCode == UserRoleConstant.klinikPanel.code
                ? 'medical/clinic/claims/list_by_clinic'
                : 'medical/clinic/claims/list',
        id: 'clinicPanelClaimsTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    const { form, enhance } = superForm(data.allocationForm, {
        SPA: true,
        taintedMessage: false,
        id: 'allocationForm',
        validators: zod(_editAllocations),
        resetForm: false,
        async onSubmit() {
            const res = await _submit($form);

            if (res?.response.status == 'success') {
                readOnly = true;
            }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Bil Tuntutan Klinik Panel">
        {#if data.currentRoleCode == UserRoleConstant.klinikPanel.code}
            <TextIconButton
                label="Tambah Bil Tuntutan"
                icon="add"
                onClick={() => goto('/klinik-panel/bil-tuntutan-klinik/baru')}
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerubatan.code}
            <div
                class="flex w-full flex-col items-end justify-start gap-3 rounded-md border border-ios-activeColors-activeBlue-light p-5"
            >
                <Alert class="flex w-full flex-row justify-between items-center" color="blue">
                    <p class="font-medium text-lg">
                        Tetapan
                    </p>
                    {#if readOnly}
                        <TextIconButton
                            label="Kemaskini"
                            type="neutral"
                            onClick={() => {
                                readOnly = false;
                            }}
                        />
                    {:else}
                        <div class="flex flex-row items-end gap-2.5">
                            <TextIconButton
                                label="Batal"
                                icon="cancel"
                                type="neutral"
                                onClick={() => {
                                    readOnly = true;
                                }}
                            />
                            <TextIconButton
                                label="Simpan"
                                icon="check"
                                form="allocationForm"
                            />
                        </div>
                    {/if}
                </Alert>
                <form
                    class="grid w-full grid-cols-2 justify-start gap-5"
                    id="allocationForm"
                    method="POST"
                    use:enhance
                >
                    <CustomTextField
                        label="Peruntukkan Tahun Semasa (RM)"
                        id="currentAllocation"
                        disabled={readOnly}
                        type="number"
                        bind:val={$form.currentAllocation}
                    />
                    <CustomTextField
                        label="Baki Peruntukkan Tahun Semasa (RM)"
                        id="remainingAllocation"
                        disabled={readOnly}
                        type="number"
                        bind:val={$form.remainingAllocation}
                    />
                    <CustomTextField
                        label="Peruntukkan Tahun Baru (RM)"
                        id="newAllocation"
                        disabled={readOnly}
                        type="number"
                        bind:val={$form.newAllocation}
                    />
                    <CustomTextField
                        label="Tahun"
                        id="year"
                        disabled
                        type="number"
                        bind:val={$form.year}
                    />
                </form>
            </div>
        {/if}
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Bil Tuntutan"
                bind:tableData={claimListTable}
                bind:passData={rowData}
                detailActions={() => {
                    goto(
                        '/klinik-panel/bil-tuntutan-klinik/butiran/' +
                            rowData.id,
                    );
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Kod Klinik"
                        bind:inputValue={claimListTable.param.filter.clinicCode}
                    />
                    <FilterTextField
                        label="Nama Klinik"
                        bind:inputValue={claimListTable.param.filter.name}
                    />
                    <!-- <FilterTextField
                        label="Status"
                        bind:inputValue={claimListTable.param
                            .filter.status}
                    /> -->
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
<Toaster />
