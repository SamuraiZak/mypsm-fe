<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { Accordion, AccordionItem } from 'flowbite-svelte';

    export let data: PageData;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Rawatan">
        <TextIconButton
            label="Kembali"
            type="neutral"
            icon="cancel"
            onClick={() => goto('/klinik-panel/maklumat-bil-rawatan')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="Nama"
                    id="fullName"
                    disabled
                    bind:val={data.employeeDetail.fullName}
                />
                <CustomTextField
                    label="No. Pekerja"
                    id="employeeNumber"
                    placeholder=""
                    disabled
                    bind:val={data.employeeDetail.employeeNumber}
                />
                <CustomTextField
                    label="No. Kad Pengenalan"
                    id="identityCardNumber"
                    placeholder=""
                    disabled
                    bind:val={data.employeeDetail.identityCardNumber}
                />
                <CustomTextField
                    label="Gred"
                    id="grade"
                    placeholder=""
                    disabled
                    bind:val={data.employeeDetail.grade}
                />
                <CustomTextField
                    label="Penempatan"
                    id="placement"
                    placeholder=""
                    disabled
                    bind:val={data.employeeDetail.placement}
                />
                <CustomTextField
                    label="Kumpulan"
                    id="serviceGroup"
                    placeholder=""
                    disabled
                    bind:val={data.employeeDetail.serviceGroup}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Pesakit"
            ></StepperContentHeader>
            <StepperContentBody paddingClass="p-none">
                <div
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <Accordion>
                        {#each data.patientDetail as patients, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Pesakit {i + 1}</span
                                >
                                <CustomTextField
                                    label="Nama Pesakit"
                                    id="name"
                                    disabled
                                    bind:val={patients.name}
                                />
                                <CustomTextField
                                    label="No. Kad Pengenalan"
                                    id="identityDocumentCard"
                                    disabled
                                    bind:val={patients.identityDocumentCard}
                                />
                                <CustomSelectField
                                    label="Hubungan"
                                    id="relationshipId"
                                    disabled
                                    options={data.lookup.relationshipLookup}
                                    bind:val={patients.relationshipId}
                                />
                                <CustomSelectField
                                    label="Pejabat LKIM"
                                    id="placementId"
                                    disabled
                                    options={data.lookup.placementLookup}
                                    bind:val={patients.placementId}
                                />
                                <CustomTextField
                                    label="Tarikh"
                                    id="date"
                                    disabled
                                    bind:val={patients.date}
                                />
                            </AccordionItem>
                        {/each}
                    </Accordion>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Rawatan"
            ></StepperContentHeader>
            <StepperContentBody paddingClass="p-none">
                <div
                    class="flex w-full flex-col justify-start gap-2.5 p-3 pb-10"
                >
                    <Accordion>
                        {#each data.treatmentDetail as treatments, i}
                            <AccordionItem>
                                <span
                                    slot="header"
                                    class="text-sm text-ios-labelColors-link-light"
                                    >Pesakit {i + 1}</span
                                >
                                {#each treatments.treatmentList as treatmentList, i}
                                    <div
                                        class="flex w-full flex-col justify-start gap-2.5 rounded-md border p-3"
                                    >
                                        <CustomTextField
                                            label="Nama Pesakit"
                                            id="patientName"
                                            disabled
                                            bind:val={treatments.patientName}
                                        />
                                        <CustomTextField
                                            label="Jenis Rawatan"
                                            id="name"
                                            disabled
                                            bind:val={treatmentList.description}
                                        />
                                        <CustomTextField
                                            label="Jumlah (RM)"
                                            id="name"
                                            type="number"
                                            disabled
                                            bind:val={treatmentList.amount}
                                        />
                                    </div>
                                {/each}
                            </AccordionItem>
                        {/each}
                    </Accordion>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
