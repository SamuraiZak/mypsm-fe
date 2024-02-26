<script lang="ts">
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import CustomTextField from '$lib/components/input/TextField.svelte';
    // import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    // import TextField from '$lib/components/input/TextField.svelte';
    // import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { Badge } from 'flowbite-svelte';
    // import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto } from '$app/navigation';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    // import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    
    // export let data: PageData;

    export let disabled = true;

    // const options: RadioOption[] = [
    //     {
    //         value: 'sah',
    //         label: 'Sah',
    //     },
    //     {
    //         value: 'tidakSah',
    //         label: 'Tidak Sah',
    //     },
    // ];

    // const approveOptions: RadioOption[] = [
    //     {
    //         value: 'true',
    //         label: 'Lulus',
    //     },
    //     {
    //         value: 'false',
    //         label: 'Tidak Lulus',
    //     },
    // ];

    //Verification Retirement Application
    
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Persaraan Pilihan 0282378L"
        ><TextIconButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perjawatan/persaraan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Perakuan Dari Unit Integriti"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Unit Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <CustomTextField
                        {disabled}
                        id="name"
                        label={'Nama'}
                        val={'Hafiz Bin Ahmad'}
                    ></CustomTextField>
                    <CustomTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Review'}
                        val={'Dokumen-dokumen telah disemak'}
                    ></CustomTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Result</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
            ><TextIconButton
                type=primary
                label="Simpan"
                form="FormStepperVerificationRetirementApplication"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    
                        <CustomTextField
                            id="actionRemark"
                            label="Tindakan / Ulasan"
                            val=""
                        />
                        
                        <!-- <RadioSingle
                            {options}
                            name="resultOption"
                            bind:userSelected={$verificationRetirementApplicationForm.resultOption}
                        ></RadioSingle> -->
                      
                    
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Penyokong & Pelulus"
            ><TextIconButton
                type=primary
                label="Simpan"
                form="FormStepperSupporterApprover"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><form
                
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <!-- <DropdownSelect
                          
                            dropdownType="label-left-full"
                            id="supporter1Option"
                            label="Nama Penyokong #1"
                            bind:val={$supporterApproverForm.supporter1Option}
                        
                        ></DropdownSelect> -->
                       
                    </div>
                    <div>
                        <!-- <DropdownSelect
                            hasError={$supporterApproverErrors.supporter2Option
                                ? true
                                : false}
                            dropdownType="label-left-full"
                            id="supporter2Option"
                            label="Nama Penyokong #1"
                            bind:val={$supporterApproverForm.supporter2Option}
                            options={data.employeeListLookup}
                        ></DropdownSelect> -->
                        
                    </div>
                    <div>
                        <!-- <DropdownSelect
                            hasError={$supporterApproverErrors.approverOption
                                ? true
                                : false}
                            dropdownType="label-left-full"
                            id="approverOption"
                            label="Nama Pelulus"
                            bind:val={$supporterApproverForm.approverOption}
                            options={data.employeeListLookup}
                        ></DropdownSelect> -->
                        
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Status Sokongan dan Kelulusan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Penyokong #1</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <CustomTextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        val={'Ismail Bin Ramdan'}
                    ></CustomTextField>
                    <CustomTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        val={'Layak disokong'}
                    ></CustomTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SOKONG</Badge>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Penyokong #2</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <CustomTextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        val={'Nurhamzah Binti Jamaludin'}
                    ></CustomTextField>
                    <CustomTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        val={'Layak disokong'}
                    ></CustomTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SOKONG</Badge>
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Pelulus</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                >
                    <CustomTextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        val={'Ramdan Bin Ismail'}
                    ></CustomTextField>
                    <CustomTextField
                        {disabled}
                        id="tindakanReview"
                        label={'Tindakan/ Ulasan'}
                        val={'Setuju diluluskan'}
                    ></CustomTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">LULUS</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kelulusan Permohonan Persaraan"
            ><TextIconButton
                type=primary
                label="Simpan"
                form="FormStepperRetirementApplicationApproval"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <CustomTextField
                           
                            id="actionRemark"
                            label="Tindakan / Ulasan"
                           val=""
                        />
                        <!-- <RadioSingle
                        options={approveOptions}
                            name="resultOptionRAA"
                            bind:userSelected={$retirementApplicationApprovalForm.resultOptionRAA}
                        ></RadioSingle>
                       -->

                        <p class="text-sm">
                            Nota: Notifikasi akan dihantar ke kakitangan untuk
                            mengisi borang persaraan
                        </p>
                    </div>
                </div>
            
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Dokumen Persaraan"
            ><TextIconButton
                type=primary
                label="Simpan"
                form="FormStepperVerificationRetirementDocuments"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">
                        Dokumen Persaraan Kakitangan
                    </p>
                    <p class="text-sm">Fail-fail yang dimuat naik:</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <!-- <li>
                            <DownloadAttachment
                                fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="JPA.BP.SPPP.B01a-Maklumat Pesara.pdf"
                            />
                        </li> -->
                    </ul>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Pengesahan Urus Setia</p>
                    <div>
                        <CustomTextField
                            id="actionRemarkVRD"
                            label="Tindakan / Ulasan"
                           val=""
                        />
                       
                        <!-- <RadioSingle
                            {options}
                            name="resultOptionVRD"
                            bind:userSelected={$verificationRetirementDocumentsForm.resultOptionVRD}
                        ></RadioSingle> -->
                      
                    </div>
                </div>
           </StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Penghantaran Permohonan"
            ><TextIconButton
                type=primary
                label="Simpan"
                form="FormStepperUpdateApplicationDeliveryInformation"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Cetak Surat Iringan</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <!-- <li>
                            <DownloadAttachment fileName="Surat Iringan" />
                        </li> -->
                    </ul>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">
                        Maklumat Penghantaran Permohonan
                    </p>
                    <div>
                        <CustomTextField
                            id="actionRemarkUADI"
                            label="Tindakan / Ulasan"
                           val=""
                        />
                       
                        <!-- <RadioSingle
                            {options}
                            name="resultOptionUADI"
                            bind:userSelected={$updateApplicationDeliveryInformationForm.resultOptionUADI}
                        ></RadioSingle> -->
                      
                    </div>
                </div>
           </StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
