<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { Badge } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';

    export let disabled: boolean = true;

    let errorData: any;
    let ulasan: string;
    let keputusan: any;

    const options: RadioOption[] = [
        {
            value: 'sah',
            label: 'Sah',
        },
        {
            value: 'tidakSah',
            label: 'Tidak Sah',
        },
    ];

    const supportOptions: RadioOption[] = [
        {
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];

    const submitForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const exampleFormData = {
            keputusan: String(formData.get('keputusan')),
            ulasan: String(formData.get('ulasan')),
        };

        const exampleFormSchema = z.object({
            // checkbox schema
            keputusan: z.enum(['sah', 'tidakSah'], {
                errorMap: (issue, { defaultError }) => ({
                    message:
                        issue.code === 'invalid_enum_value'
                            ? 'Sila tetapkan pilihan anda.'
                            : defaultError,
                }),
            }),
            // dateSelectorExample: dateScheme,
            ulasan: z
                .string({ required_error: 'Medan ini tidak boleh kosong.' })
                .min(4, {
                    message: 'Medan ini hendaklah lebih daripada 4 karakter.',
                })
                .max(124, {
                    message: 'Medan ini tidak boleh melebihi 124 karakter.',
                })
                .trim(),
        });

        try {
            const result = exampleFormSchema.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Persaraan Pilihan 0282378L"
        description="Maklumat-maklumat permohonan persaraan pilihan pekerja 0282378L"
        ><FormButton
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
                    <TextField
                        {disabled}
                        id="name"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Dokumen-dokumen telah disemak'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                form="applicationConfirmationFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                >
                    <form
                        id="applicationConfirmationFormValidation"
                        on:submit|preventDefault={submitForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <LongTextField
                            hasError={errorData?.ulasan}
                            name="ulasan"
                            label="Ulasan/Tindakan"
                            bind:value={ulasan}
                        />
                        {#if errorData?.ulasan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.ulasan[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="keputusan"
                            legend={''}
                            bind:userSelected={keputusan}
                        ></RadioSingle>
                        {#if errorData?.keputusan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.keputusan[0]}</span
                            >
                        {/if}
                    </form>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <!-- change to dropdown -->
    <StepperContent>
        <StepperContentHeader title="Penyokong & Pelulus"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div>
                    <TextField
                        id="namaPenyokong1"
                        label={'Nama Penyokong #1'}
                        value={'Ismail Bin Ramdan'}
                    ></TextField>
                </div>
                <div>
                    <TextField
                        id="namaPenyokong2"
                        label={'Nama Penyokong #2'}
                        value={'Nurhamzah Binti Jamaludin'}
                    ></TextField>
                </div>
                <div>
                    <TextField
                        id="namaPelulus"
                        label={'Nama Pelulus'}
                        value={'Ramdan Bin Ismail'}
                    ></TextField>
                </div>
            </div></StepperContentBody
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
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ismail Bin Ramdan'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak disokong'}
                    ></LongTextField>
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
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Nurhamzah Binti Jamaludin'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Layak disokong'}
                    ></LongTextField>
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
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Ramdan Bin Ismail'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="tindakanUlasan"
                        label={'Tindakan/ Ulasan'}
                        value={'Setuju diluluskan'}
                    ></LongTextField>
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
                primary
                label="Hantar"
                form="applicationApprovalFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="applicationApprovalFormValidation"
                on:submit|preventDefault={submitForm}
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2">
                    <div>
                        <LongTextField
                            id="tindakanUlasan"
                            label={'Tindakan/ Ulasan'}
                            value={'Memenuhi Kriteria'}
                        ></LongTextField>

                        <RadioSingle options={supportOptions} />
                        <p class="text-sm">
                            Nota: Notifikasi akan dihantar ke kakitangan untuk
                            mengisi borang persaraan
                        </p>
                    </div>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Dokumen Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                form="validateDocumentFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="validateDocumentFormValidation"
                on:submit|preventDefault={submitForm}
                class="flex w-full flex-col gap-2"
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
                        <li>
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
                        </li>
                    </ul>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Pengesahan Urus Setia</p>
                    <div>
                        <LongTextField
                            hasError={errorData?.ulasan}
                            name="ulasan"
                            label="Ulasan/Tindakan"
                            bind:value={ulasan}
                        />
                        {#if errorData?.ulasan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.ulasan[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="keputusan"
                            legend={''}
                            bind:userSelected={keputusan}
                        ></RadioSingle>
                        {#if errorData?.keputusan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.keputusan[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Penghantaran Permohonan"
            ><TextIconButton
                primary
                label="Hantar"
                form="updateApplicationFormValidation"
            /></StepperContentHeader
        >
        <StepperContentBody
            ><form
                id="updateApplicationFormValidation"
                on:submit|preventDefault={submitForm}
                class="flex w-full flex-col gap-2"
            >
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">Cetak Surat Iringan</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment fileName="Surat Iringan" />
                        </li>
                    </ul>
                </div>
                <div
                    class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                >
                    <p class="text-sm font-bold">
                        Maklumat Penghantaran Permohonan
                    </p>
                    <div>
                        <LongTextField
                            hasError={errorData?.ulasan}
                            name="ulasan"
                            label="Ulasan/Tindakan"
                            bind:value={ulasan}
                        />
                        {#if errorData?.ulasan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.ulasan[0]}</span
                            >
                        {/if}

                        <RadioSingle
                            disabled={false}
                            {options}
                            name="keputusan"
                            legend={''}
                            bind:userSelected={keputusan}
                        ></RadioSingle>
                        {#if errorData?.keputusan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.keputusan[0]}</span
                            >
                        {/if}
                    </div>
                </div>
            </form></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />