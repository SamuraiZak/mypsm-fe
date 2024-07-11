<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { AllowanceCeremonyClothingRequestSchema } from '$lib/schemas/v2/mypsm/service-allowance/service-allowance.schema';
    import { _ceremonyClothingFormSubmit } from './+page';
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StatusPill from '$lib/components/status-pills/StatusPill.svelte';
    import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
    import type { AllowanceTypeDTO } from '$lib/dto/mypsm/allowance/allowance.dto';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomInput from '$lib/components/inputs/text-field/CustomInput.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';

    export let data: PageData;

    let currentAllowanceTypeCode: string = data.props.currentAllowanceType.code;

    let activeFormId: string = 'ceremonyClothingForm';

    // variable to store the files
    let files: FileList;

    function _handleAllowanceTypeChange(allowanceTypeCode: string) {
        switch (allowanceTypeCode) {
            case AllowanceTypeConstant.ceremonyClothing.code:
                activeFormId = 'ceremonyClothingForm';
                break;
            case AllowanceTypeConstant.winterClothing.code:
                activeFormId = 'winterClothingForm';
                break;
            default:
                activeFormId = 'ceremonyClothingForm';
                break;
        }
    }

    $: _handleAllowanceTypeChange(currentAllowanceTypeCode);

    // create form
    const {
        form: ceremonyClothingForm,
        errors: ceremonyClothingErrors,
        enhance: ceremonyClothingEnhance,
    } = superForm(data.forms.ceremonyClothingForm, {
        id: 'ceremonyClothingForm',
        SPA: true,
        validators: zodClient(AllowanceCeremonyClothingRequestSchema),
        onSubmit(input) {
            _ceremonyClothingFormSubmit($ceremonyClothingForm, files);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Borang Permohonan {activeFormId}">
        <StatusPill slot="status" status="Baru"></StatusPill>
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/v2/service-allowance/application');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper activeIndex={1}>
        <!-- maklumat permohonan -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Pemohon"
            ></StepperContentHeader>
            <StepperContentBody></StepperContentBody>
        </StepperContent>

        <!-- butiran permohonan -->
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan">
                <TextIconButton
                    form={activeFormId}
                    type="draft"
                    label="Simpan"
                    icon="save"
                ></TextIconButton>
                <TextIconButton
                    form={activeFormId}
                    type="primary"
                    label="Hantar"
                    icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col items-start justify-start p-4">
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2 divide-y lg:w-1/2"
                    >
                        <CustomSelectField
                            id="allowanceType"
                            label={'Jenis Elaun'}
                            bind:val={currentAllowanceTypeCode}
                            options={data.props.allowanceTypeOption}
                        ></CustomSelectField>
                    </div>

                    {#if activeFormId == 'ceremonyClothingForm'}
                        <form
                            id="ceremonyClothingForm"
                            method="POST"
                            use:ceremonyClothingEnhance
                            class="flex w-full flex-col items-start justify-start gap-2 divide-y lg:w-1/2"
                        >
                            <div
                                class="flex w-full flex-col items-start justify-start py-4"
                            >
                                <CustomTextField
                                    id="reason"
                                    type="textarea"
                                    label={'Tujuan Permohonan'}
                                    errors={$ceremonyClothingErrors.reason}
                                    bind:val={$ceremonyClothingForm.reason}
                                ></CustomTextField>
                            </div>

                            <div
                                class="flex w-full flex-col items-start justify-center gap-1 py-4"
                            >
                                <p
                                    class="w-full text-wrap text-base font-medium text-slate-700"
                                >
                                    Pernah mendapat kemudahan ini dalam tiga (3)
                                    tahun?
                                </p>
                                <div class="flex w-full flex-col pl-8">
                                    <CustomRadioBoolean
                                        label="Bayaran Pakaian Istiadat"
                                        disabled={false}
                                    ></CustomRadioBoolean>

                                    <CustomTextField
                                        id="reason"
                                        type="number"
                                        label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                        errors={$ceremonyClothingErrors.reason}
                                        bind:val={$ceremonyClothingForm.reason}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        label="Bantuan Bayaran Black Tie"
                                        disabled={false}
                                    ></CustomRadioBoolean>
                                    <CustomTextField
                                        id="reason"
                                        type="number"
                                        label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                        errors={$ceremonyClothingErrors.reason}
                                        bind:val={$ceremonyClothingForm.reason}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        label="Bayaran Pakaian Menghadiri Upacara Rasmi"
                                        disabled={false}
                                    ></CustomRadioBoolean>
                                    <CustomTextField
                                        id="reason"
                                        type="number"
                                        label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                        errors={$ceremonyClothingErrors.reason}
                                        bind:val={$ceremonyClothingForm.reason}
                                    ></CustomTextField>
                                </div>
                                <p
                                    class="w-full text-wrap text-base font-normal text-slate-500"
                                >
                                    (<span class="font-medium">Nota:</span> Pegawai
                                    yang telah diberi Bayaran Pakaian Istiadat tidak
                                    layak menuntut Bayaran Pakaian Menghadiri Upacara
                                    Rasmi dalam tempoh tiga (3) tahun yang sama)
                                </p>
                            </div>
                            <div
                                class="mt-4 flex w-full flex-col items-start justify-center gap-1 py-4"
                            >
                                <p
                                    class="w-full text-wrap text-base font-medium text-slate-700"
                                >
                                    Jumlah Tuntutan
                                </p>
                                <div class="flex w-full flex-col pl-8">
                                    <CustomTextField
                                        id="reason"
                                        type="number"
                                        label={'Sendiri'}
                                        errors={$ceremonyClothingErrors.reason}
                                        bind:val={$ceremonyClothingForm.reason}
                                    ></CustomTextField>
                                    <CustomTextField
                                        id="reason"
                                        type="number"
                                        label={'Pasangan'}
                                        errors={$ceremonyClothingErrors.reason}
                                        bind:val={$ceremonyClothingForm.reason}
                                    ></CustomTextField>
                                </div>
                            </div>

                            <div
                                class="flex w-full flex-col items-start justify-start gap-4 py-4 text-slate-500"
                            >
                                <p
                                    class="w-full text-wrap text-base font-medium text-slate-500"
                                >
                                    *Nota:
                                </p>

                                <div
                                    class="flex w-full flex-col items-start justify-start"
                                >
                                    <p
                                        class="w-full text-wrap text-base font-normal text-slate-500"
                                    >
                                        1. Kadar bagi Bayaran Istiadat, Bantuan
                                        Bayaran Pakaian Black Tie dan Bayaran
                                        Menghadiri Upacara Rasmi adalah seperti
                                        berikut:
                                    </p>
                                    <table class="w-full border">
                                        <thead>
                                            <tr>
                                                <th class="border p-1">
                                                    <p
                                                        class="text-base font-medium"
                                                    >
                                                        Bil.
                                                    </p>
                                                </th>
                                                <th class="border p-1">
                                                    <p
                                                        class="text-base font-medium"
                                                    >
                                                        Jenis Pakaian
                                                    </p>
                                                </th>
                                                <th class="border p-1">
                                                    <p
                                                        class="text-base font-medium"
                                                    >
                                                        Kadar Bayaran (RM)
                                                    </p>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        1.
                                                    </p>
                                                </td>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        Bayaran Pakaian Istiadat
                                                    </p>
                                                </td>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        1,500.00
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        2.
                                                    </p>
                                                </td>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        Bantuan Bayaran Pakaian
                                                        Black Tie
                                                    </p>
                                                </td>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        1,000.00
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        3.
                                                    </p>
                                                </td>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        Bayaran Pakaian
                                                        Menghadiri Upacara Rasmi
                                                    </p>
                                                </td>
                                                <td class="border p-1">
                                                    <p
                                                        class="text-center text-base font-normal"
                                                    >
                                                        650.00 (pegawai)
                                                        <br />
                                                        450.00 (pasangan)
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    class="flex w-full flex-col items-start justify-start"
                                >
                                    <p
                                        class="w-full text-wrap text-base font-normal text-slate-500"
                                    >
                                        2. Kemudahan ini adalah tertakluk kepada
                                        syarat seperti berikut:
                                    </p>
                                    <ul class="w-full list-disc pl-10">
                                        <li
                                            class="pl-2 text-base text-slate-500"
                                        >
                                            Kemudahan bayaran pakaian ini diberi
                                            setiap tiga (3) tahun sekali
                                        </li>
                                        <li
                                            class="pl-2 text-base text-slate-500"
                                        >
                                            Pegawai yang telah diberi Bayaran
                                            Pakaian Istiadat tidak layak
                                            menuntut Bayaran Pakaian Menghadiri
                                            Upacara Rasmi dalam tempoh tiga (3)
                                            tahun yang sama;
                                        </li>
                                        <li
                                            class="pl-2 text-base text-slate-500"
                                        >
                                            Tuntutan bayaran balik hendaklah
                                            disokong dengan resit; dan
                                        </li>
                                        <li
                                            class="pl-2 text-base text-slate-500"
                                        >
                                            Tuntutan bayaran balik Pakaian
                                            Menghadiri Upacara Rasmi hendaklah
                                            disokong dengan maklumat mengenai
                                            jemputan upacara rasmi atau surat
                                            arahan bertugas di Parlimen atau
                                            Dewan Undangan Negeri.
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    class="flex w-full flex-col items-start justify-start"
                                >
                                    <p
                                        class="w-full text-wrap text-base font-normal text-slate-500"
                                    >
                                        3. Penggunaan kemudahan ini hendaklah
                                        dicatatkan dalam Buku Perkhidmatan
                                        pegawai.
                                    </p>
                                </div>
                            </div>
                        </form>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
