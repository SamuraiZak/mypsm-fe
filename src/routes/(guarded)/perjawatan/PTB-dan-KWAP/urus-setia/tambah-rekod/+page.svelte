<!-- Add your changes to the commented parts -->

<script lang="ts">
    import { goto } from '$app/navigation';

    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';

    import { onMount } from 'svelte';

    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    export let data: PageData;
    let stepperIndex = 0;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Permohonan Pemberian Taraf Berpencen"
        ><TextIconButton
            type="close"
            onClick={() => {
                goto('../PTB-dan-KWAP');
            }}
        /></ContentHeader
    >
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper bind:activeIndex={stepperIndex} dataId="#01" dataStatus="Draf">
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <!-- {#if editingCandidateList} -->
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
            </StepperContentBody>
            <!-- {:else} -->

            <!-- {/if} -->
        </StepperContent>

        <!-- Maklumat Perkhidmatan -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start p-10"
                >
                    <div class="flex w-full max-w-[500px] flex-col gap-2.5">
                        <b class="text-sm text-system-primary"
                            >Maklumat Perkhidmatan</b
                        >
                        <CustomTextField
                            id="gredSemasa"
                            label={'Gred Semasa'}
                            type="text"
                            val=""
                            placeholder=""
                        ></CustomTextField>
                       <CustomTextField 
                        id="jawatan" 
                        label={'Jawatan'} 
                        type="text"
                        val=''
                        placeholder= ''
                    ></CustomTextField>
                    
                    <CustomTextField
                        id="penempatan"
                        label={'Penempatan'}
                        type="text"
                        val=''
                        placeholder= ''
                    ></CustomTextField>
                     <!--
                    <TextField
                        disabled={!editable}
                        id="tarafPerkhidmatan"
                        label={'Taraf Perkhidmatan'}
                         type="text"
                        val=''
                        placeholder= ''
                    ></TextField>
                    <RadioSingle
                        disabled={!editable}
                        options={faedahPersaraanOptions}
                        legend={'Faedah Persaraan'}
                        bind:userSelected={isFaedahKWSP}
                    ></RadioSingle>
                    <TextField
                        disabled={!editable}
                        id="noKWSP"
                        label={'No. KWSP'}
                        value={currentService?.pensionBenefit}
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="noSOCSO"
                        label={'No. SOCSO'}
                        value={currentService?.kwspNumber}
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="noCukai"
                        label={'No. Cukai (LHDN)'}
                        value={currentService?.taxNumber}
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="bank"
                        label={'Bank'}
                        value={currentService?.bankName}
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="noAkaun"
                        label={'No. Akaun'}
                        value={currentService?.accountNumber}
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="program"
                        label={'Program'}
                        value={currentService?.programme}
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="kelayakanCuti"
                        label={'Kelayakan Cuti'}
                        value={currentService?.entitledLeaves}
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="mulaDilantikPerkhidmatanKerajaan"
                        label={'Mula Dilantik Perkhidmatan Kerajaan'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="mulaDilantikPerkhidmatanLKIM"
                        label={'Mula Dilantik Perkhidmatan LKIM'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="mulaDilantikPerkhidmatanSekarang"
                        label={'Mula Dilantik Perkhidmatan Sekarang'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="disahkanDalamJawatanPertamaLKIM"
                        label={'Disahkan Dalam Jawatan Pertama LKIM'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="disahkanDalamJawatanSemasaLKIM"
                        label={'Disahkan Dalam Jawatan Semasa LKIM'}
                        value=""
                    ></TextField>
                    <AccordianField
                        disabled={editable}
                        label="Sejarah Lantikan Jawatan LKIM (Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan)"
                        header={'maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM[0]'}
                    > -->

                        <!-- {#each maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM as val, i} -->

                        <!-- <label
                            for=""
                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {!editable
                                ? 'text-txt-tertiary'
                                : 'text-txt-primary'}
                                                    hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                            >{'i + 1'}. {'val'}</label
                        > -->
                        <!-- {/each} -->
                        <!-- </AccordianField>
                    <TextField
                        disabled={!editable}
                        id="tarikhKelulusanPercantumanPerkhidmatanLepas"
                        label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="pemangkuanSekarang"
                        label={'Pemangkuan Sekarang'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="tanggungKerjaSekarang"
                        label={'Tanggung Kerja Sekarang'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="skimPencen"
                        label={'Skim Pencen'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="kenaikanGajiAkhir"
                        label={'Kenaikan Gaji Akhir'}
                        value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="kenaikanPangkatAkhir"
                        label={'Kenaikan Pangkat Akhir'}
                        value=""
                    ></TextField>
                    <TextField disabled={!editable} id="bulanKGT" label={'Bulan KGT'} value=""
                    ></TextField>
                    <TextField
                        disabled={!editable}
                        id="tarikhBersara"
                        label={'Tarikh Bersara'}
                        value=""
                    ></TextField>
                    <b class="text-sm text-system-primary">Maklumat Gaji dan Elaun - Elaun</b>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                disabled={!editable}
                                id="tarikhBerkuatkuasa"
                                label={'Tarikh Berkuatkuasa'}
                                value={'maklumatGajiElaunData.tarikhBerkuatkuasa'}
                            ></TextField>
                            <TextField
                                disabled={!editable}
                                id="tanggaGaji"
                                label={'Tangga Gaji'}
                                value={CurrencyHelper.formatCurrency(3452)}
                            ></TextField>
                            <TextField
                                disabled={!editable}
                                id="gajiPokok"
                                label={'Gaji Pokok'}
                                value={CurrencyHelper.formatCurrency(3452)}
                            ></TextField>
                        </div>
                        <div class="space-y-2.5">
                            <TextField
                                hasTooltip={true}
                                toolTipID="type-itka"
                                disabled={!editable}
                                id="type-itka"
                                label={'ITKA'}
                                value=""
                            ></TextField>
                            <TextField
                                hasTooltip={true}
                                toolTipID="type-itp"
                                disabled={!editable}
                                id="itp"
                                label={'ITP'}
                                value=""
                            ></TextField>
                            <TextField
                                hasTooltip={true}
                                toolTipID="type-epw"
                                disabled={!editable}
                                id="epw"
                                label={'EPW'}
                                value=""
                            ></TextField>
                            <TextField
                                hasTooltip={true}
                                toolTipID="type-cola"
                                disabled={!editable}
                                id="cola"
                                label={'COLA'}
                                value=""
                            ></TextField> -->
                        <!-- Tooltip body -->
                        <!-- <Tooltip
                                type="dark"
                                triggeredBy="[id^='type-']"
                                on:show={assignContent}>"{tooltipContent}"</Tooltip
                            > -->
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Kemaskini Maklumat PTB dan KWAP -->
        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat PTB dan KWAP">
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="meetingResultForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
            </StepperContentBody>
        </StepperContent>

        <!-- Peranan -Peranan Berkaitan -->
        <StepperContent>
            <StepperContentHeader
                title="Masukkan Maklumat Peranan - Peranan Berkaitan"
            >
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="newEmploymentAssignApproverSupporterForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Masukkan nama Penyokong dan Pelulus (Jika Sah)"
                ></ContentHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
            </StepperContentBody>
        </StepperContent>

        <!-- Keputusan Daripada Peranan - Peranan Berkaitan -->
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Daripada Peranan - Peranan Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
