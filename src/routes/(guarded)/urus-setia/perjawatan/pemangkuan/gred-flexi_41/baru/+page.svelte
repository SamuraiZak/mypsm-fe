<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockActingIndividual } from '$lib/mocks/database/mockActingIndividual';
    import { mockActingBatch } from '$lib/mocks/database/mockActingBatch';
    import { currentActingBatchId } from '$lib/stores/pemangkuan/pemangkuanStores';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    let excludedKeys = [
        'id',
        'birthStateId',
        'raceId',
        'religionId',
        'mailStateId',
        'homeStateId',
        'alternativeName',
        'isMalaysian',
        'identityDocumentType',
        'email',
        'homeNumber',
        'mobileNumber',
        'birthDate',
        'birthPlace',
        'isExPoliceOrSoldier',
        'homeAddress',
        'mailAddress',
        'mailPostcode',
        'mailCity',
    ];

    let tempData: any = {};

    let selectedEmployee: IntEmployees[] = [];

    function pushSelected(data: any) {
        let tempSelected = selectedEmployee;
        if (!tempSelected.includes(data)) {
            tempSelected.push(data);
            selectedEmployee = tempSelected;
        }
    }

    function popSelected(data: any) {
        let tempSelected = selectedEmployee;
        tempSelected = tempSelected.filter((item) => item !== data);

        selectedEmployee = tempSelected;
    }

    function pushNewCandidate() {
        let lastBatchIndex = mockActingBatch.length - 1;
        let lastBatchId = mockActingBatch[lastBatchIndex].batchId;
        let newBatchId = lastBatchId + 1;
        console.log('length is', lastBatchIndex);
        console.log('last is', lastBatchId);
        console.log('new is', newBatchId);
        console.log(mockActingBatch[0]);
        selectedEmployee.forEach((item) => {
            let employeeDetails = mockEmployees.filter(
                (item) => item.employeeNumber == item.employeeNumber,
            );
            let newCandidateId: number =
                mockActingIndividual[mockActingIndividual.length - 1]
                    .candidateId + 1;
            let tempCandidate: IntActingIndividual = {
                candidateId: newCandidateId,
                batchId: newBatchId,
                employeeId: item.id,
                employeeName: item.name,
                employeeIDNumber: item.identityDocumentNumber,
                actingGrade: '',
                actingPosition: '',
                qualifierMeetingName: '',
                qualifierMeetingDate: '',
                qualifierMeetingResult: '',
                qualifierMeetingResultApproval: '',
                qualifierMeetingResultApprover: '',
                qualifierMeetingResultSupport: '',
                qualifierMeetingResultSupporter: '',
                interviewDate: '',
                interviewTime: '',
                interviewVenue: '',
                interviewMarks: '',
                interviewResult: '',
                promotionMeetingName: '',
                promotionMeetingDate: '',
                promotionMeetingResult: '',
                suggestedReportingDate: '',
                suggestedPlacement: '',
                postponementApplication: false,
                postponementReason: '',
                postponementResult: '',
                requestedReportingDate: '',
                requestedPlacement: '',
                decidedReportingDate: '',
                decidedPlacement: '',
                finalResultApproval: '',
                finalResultApprover: '',
                finalResultSupport: '',
                finalResultSupporter: '',
            };

            mockActingIndividual.push(tempCandidate);
        });

        let newActingBatch = {
            batchId: newBatchId,
            type: 'Gred Flexi 41',
            date: '29/09/2023',
            candidateCount: mockActingIndividual.filter(
                (item) => item.batchId == newBatchId,
            ).length,
            status: 'Sedang Diproses',
        };

        mockActingBatch.push(newActingBatch);

        currentActingBatchId.set(newBatchId);
    }
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred Flexi 41 - Baru"
        description="Sila pilih kakitangan yang layak sebagai calon pemangkuan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Batal"
            onClick={() => {
                goto('/urus-setia/perjawatan/pemangkuan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
        <TextIconButton
            label="Seterusnya"
            primary
            onClick={() => {
                pushNewCandidate();
                goto('/urus-setia/perjawatan/pemangkuan/gred-flexi_41/butiran');
            }}
        >
            <SvgArrowRight></SvgArrowRight>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <CustomTab>
        <!-- Senarai Semua Kakitangan -->
        <CustomTabContent title="Senarai Semua Kakitangan">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="Nama"></FilterTextInput>
                        <FilterTextInput label="No. K/P"></FilterTextInput>
                    </div>
                </CustomCardBody>
            </CustomCard>

            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <!-- <ImpactTable
                    bind:passData={tempData}
                    tableItems={mockEmployees}
                    excludeCol={excludedKeys}
                    withRowSelection
                    selectAdd
                    onSelect={() => {
                        // let tempSelected = selectedEmployee;
                        // tempSelected.push(tempData);
                        // selectedEmployee = tempSelected;
                        pushSelected(tempData);
                    }}
                ></ImpactTable> -->

                <DynamicTable
                    bind:passData={tempData}
                    tableItems={mockEmployees}
                    withRowSelection
                    selectAdd
                    onSelect={() => {
                        pushSelected(tempData);
                    }}
                    columnKeys={[
                        'employeeNumber',
                        'name',
                        'identityDocumentNumber',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Senarai Kakitangan Yang Dipilih -->
        <CustomTabContent title="Senarai Kakitangan Yang DIpilih">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <ImpactTable
                    bind:passData={tempData}
                    tableItems={selectedEmployee}
                    excludeCol={excludedKeys}
                    withRowSelection
                    onSelect={() => {
                        // selectedEmployee.push(tempData);
                        popSelected(tempData);
                    }}
                ></ImpactTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
