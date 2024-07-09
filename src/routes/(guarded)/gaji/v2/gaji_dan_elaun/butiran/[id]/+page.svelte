<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomInput from '$lib/components/inputs/text-field/CustomInput.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import type { TableConfigDTO } from '$lib/dto/core/table/table-config.dto';
    import SimpleTable from '$lib/components/table/simple-table/SimpleTable.svelte';
    import type { PageData } from './$types';

    let sample: any = '';

    export let data: PageData;

    let generalTable: TableConfigDTO = {
        columns: [
            {
                key: 'employeeName',
                name: 'Nama',
            },
            {
                key: 'baseSalary',
                name: 'Gaji Pokok',
            },
            {
                key: 'allowance',
                name: 'Elaun',
            },
            {
                key: 'salaryDeduction',
                name: 'Potongan',
            },
            {
                key: 'status',
                name: 'Status',
            },
        ],
        rows: data.salaryAllowanceList,
        param: data.param,
        meta: data.salaryAllowanceListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        selectedData: [],
        exportData: [],
        url: 'salary/allowance/list',
        id: 'finalPayslipTable',
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Butiran Gaji dan Elaun Kakitangan"></ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper activeIndex={2}>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col items-start justify-start gap-2.5 px-2 py-3"
                >
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                    >
                        <CustomInput
                            bind:val={sample}
                            label="Nama Kakitangan"
                            vertical={false}
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="No. Pekerja"
                            vertical={false}
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="No. Kad Pengenalan"
                            vertical={false}
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="Gred"
                            vertical={false}
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="Penempatan"
                            vertical={false}
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="Kumpulan"
                            vertical={false}
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="Status Pelantikan Semasa"
                            vertical={false}
                        ></CustomInput>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Maklumat Gaji dan Elaun Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col items-start justify-start gap-2.5 px-2 py-3"
                >
                    <div
                        class="flex w-full flex-col justify-start gap-2.5 px-2 md:w-1/2"
                    >
                        <CustomInput
                            bind:val={sample}
                            label="Tangga Gaji"
                            vertical={false}
                            prefixText="RM"
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="Gaji Pokok"
                            vertical={false}
                            prefixText="RM"
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="ITKA"
                            vertical={false}
                            prefixText="RM"
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="ITP"
                            vertical={false}
                            prefixText="RM"
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="COLA"
                            vertical={false}
                            prefixText="RM"
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="Bulan Pergerakan Gaji"
                            vertical={false}
                        ></CustomInput>
                        <CustomInput
                            bind:val={sample}
                            label="Jumlah"
                            vertical={false}
                            prefixText="RM"
                        ></CustomInput>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Perubahan Gaji"></StepperContentHeader>
            <StepperContentBody paddingClass="p-0">
                <CustomTab>
                    <CustomTabContent title="Umum" paddingClass="p-4">
                        <div
                            class="flex h-full w-full flex-col items-center justify-start"
                        >
                            <SimpleTable tableData={generalTable}></SimpleTable>
                        </div>
                    </CustomTabContent>
                </CustomTab>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pengarah Khidmatan Pengurusan"
            ></StepperContentHeader>
            <StepperContentBody></StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
