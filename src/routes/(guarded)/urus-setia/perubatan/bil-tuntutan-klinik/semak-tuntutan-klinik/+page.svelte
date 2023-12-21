<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { goto } from '$app/navigation';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { senaraiTuntutan } from '$lib/mocks/urus-setia/perubatan/senarai-tuntutan';
    import { Button, Modal, Label, Input } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';

    export let disabled: boolean = true;
    let formModal = false;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semakan Tuntutan Klinik Wee"
        description="Sila semak maklumat tuntutan klinik panel"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perubatan/bil-tuntutan-klinik');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Klinik"></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <TextField
                    {disabled}
                    id="nama-klinik"
                    label={'Nama Klinik'}
                    value={'Klinik Wee'}
                ></TextField>
                <TextField
                    {disabled}
                    id="emel-klinik"
                    label={'Emel Klinik'}
                    value={'klinik.wee@gmail.com'}
                ></TextField>
                <LongTextField
                    {disabled}
                    id="alamat"
                    label={'Alamat'}
                    value={'ICOM Square'}
                ></LongTextField>
                <TextField
                    {disabled}
                    id="poskod"
                    label={'Poskod'}
                    value={'93250'}
                ></TextField>
                <TextField
                    {disabled}
                    id="bandar"
                    label={'Bandar'}
                    value={'Kuching'}
                ></TextField>
                <TextField
                    {disabled}
                    id="negeri"
                    label={'Negeri'}
                    value={'Perlis'}
                ></TextField>
                <TextField
                    {disabled}
                    id="no-tel"
                    label={'No. Telefon'}
                    value={'012-4234324'}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tuntutan"></StepperContentHeader>
        <StepperContentBody
            ><div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField id="bulan" label={'Bulan'} value={'Mei 2023'}
                    ></TextField>
                    <TextField
                        id="jumlah-tuntutan"
                        label={'Jumlah Tuntutan (RM)'}
                        value={'2,534'}
                    ></TextField>
                    <TextField
                        id="bilangan-tuntutan"
                        label={'Bilangan Tuntutan'}
                        value={'3'}
                    ></TextField>
                </div>
            </div>
            <div
                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
            >
                <p class="text-sm font-bold">Semua Tuntutan Klinik Wee</p>
                <p class="text-sm">
                    Senarai semua tuntutan yang dipilih dibawah
                </p>
            </div>
            <div
                class="flex h-fit w-full flex-col items-center justify-start gap-2"
            >
                <SectionHeader
                    title="Sahkan semua tuntutan yang dipilih dibawah"
                    ><FormButton type="sahkan"></FormButton></SectionHeader
                >
            </div>
            <div class="flex w-full flex-col gap-2.5">
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="flex w-full">
                        <div
                            class="flex w-1/3 flex-row items-start pt-4 text-sm"
                        >
                            <Checkbox />
                            <div class="font-bold">Senarai Tuntutan</div>
                        </div>
                    </div>
                </div>
                <div
                    class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                >
                    <div class="flex">
                        <div
                            class="flex w-1/3 flex-row items-start pt-4 text-sm"
                        >
                            <Checkbox />
                            <div class="font-bold">Tuntutan 1</div>
                        </div>
                    </div>
                    <div class="flex w-full flex-row gap-x-2.5">
                        <div class="w-1/3 space-y-2.5">
                            <TextField
                                labelType="top"
                                type="text"
                                id="namaKakitangan"
                                label="Nama Kakitangan"
                                value="Mohd Safwan Adam"
                            ></TextField>
                            <TextField
                                labelType="top"
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="111111-11-1111"
                            ></TextField>
                        </div>
                        <div class="w-2/3 space-y-2.5 space-y-2.5">
                            <DynamicTable tableItems={senaraiTuntutan}
                            ></DynamicTable>
                        </div>
                    </div>
                    <FormButton
                        type="tindakan"
                        addLabel="Tindakan"
                        onClick={() => {
                            formModal = true;
                        }}
                    />
                </div>
                <div
                    class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                >
                    <div class="flex">
                        <div
                            class="flex w-1/3 flex-row items-start pt-4 text-sm"
                        >
                            <Checkbox />
                            <div class="font-bold">Tuntutan 2</div>
                        </div>
                    </div>
                    <div class="flex w-full flex-row gap-x-2.5">
                        <div class="w-1/3 space-y-2.5">
                            <TextField
                                labelType="top"
                                type="text"
                                id="namaKakitangan"
                                label="Nama Kakitangan"
                                value="Mohd Safwan Adam"
                            ></TextField>
                            <TextField
                                labelType="top"
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="111111-11-1111"
                            ></TextField>
                        </div>
                        <div class="w-2/3 space-y-2.5 space-y-2.5">
                            <DynamicTable tableItems={senaraiTuntutan}
                            ></DynamicTable>
                        </div>
                    </div>
                    <FormButton
                        type="tindakan"
                        addLabel="Tindakan"
                        onClick={() => {
                            formModal = true;
                        }}
                    />
                </div>
                <div
                    class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5"
                >
                    <div class="flex">
                        <div
                            class="flex w-1/3 flex-row items-start pt-4 text-sm"
                        >
                            <Checkbox />
                            <div class="font-bold">Tuntutan 3</div>
                        </div>
                    </div>
                    <div class="flex w-full flex-row gap-x-2.5">
                        <div class="w-1/3 space-y-2.5">
                            <TextField
                                labelType="top"
                                type="text"
                                id="namaKakitangan"
                                label="Nama Kakitangan"
                                value="Mohd Safwan Adam"
                            ></TextField>
                            <TextField
                                labelType="top"
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="111111-11-1111"
                            ></TextField>
                        </div>
                        <div class="w-2/3 space-y-2.5 space-y-2.5">
                            <DynamicTable tableItems={senaraiTuntutan}
                            ></DynamicTable>
                        </div>
                    </div>
                    <FormButton
                    type="tindakan"
                    addLabel="Tindakan"
                    onClick={() => {
                        formModal = true;
                    }}
                    />
                </div>
            </div></StepperContentBody
        >

        <Modal
                    bind:open={formModal}
                    autoclose={false}
                    size="xl"
                    class="h-full w-full overflow-auto "
                >
                    <div class="space-y-50 w-full p-8 md:p-8  ">
                        <!-- formdiv -->
                        <form action="#" class="flex w-full flex-col gap-6">
                            <!-- form header -->
                            <div class="flex w-full flex-col gap-2">
                                <h3
                                    class="mb-2 text-xl font-medium text-gray-900"
                                >
                                    Tuntutan 1
                                </h3>

                                <p
                                    class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                                >
                                    ● Sila klik "OK" untuk menghantar pembatalan
                                    tututan ke Klinik Panel dan Kakitangan yang
                                    berkaitan.
                                </p>
                            </div>

                            <!-- form group (klinik) -->
                            <div>
                                <div class="flex w-full flex-col gap-2">
                                    <p class="text-sm font-bold  text-gray-900">Klinik</p>
                                    <div
                                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                                    >
                                        <LongTextField
                                            id="tindakanUlasan"
                                            label={'Tindakan/ Ulasan'}
                                            value={'Simpan ke klinik semula untuk membuat pembetulan'}
                                        ></LongTextField>
                                        <div
                                            class="flex max-h-full w-full flex-col items-start justify-start"
                                        >
                                            <SectionHeader>
                                                <TextIconButton
                                                    primary
                                                    label="OK"
                                                ></TextIconButton>
                                            </SectionHeader>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- form group (kakitangan) -->
                            <div>
                                <div class="flex w-full flex-col gap-2">
                                    <p class="text-sm font-bold  text-gray-900">Kakitangan</p>
                                    <div
                                        class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                                    >
                                        <LongTextField
                                            id="tindakanUlasan"
                                            label={'Tindakan/ Ulasan'}
                                            value={'Simpan ke kakitangan unyuk membuat pembayaran rawatan yang tidak ditanggung oleh LKIM..'}
                                        ></LongTextField>

                                        <TextField
                                            id="tindakanUlasan"
                                            label={'Jumlah Perlu Ditanggung oleh Kakitangan (RM) '}
                                            value={'RM955'}
                                        ></TextField>

                                        <div
                                            class="flex max-h-full w-full flex-col items-start justify-start"
                                        >
                                            <SectionHeader>
                                                <TextIconButton
                                                    primary
                                                    label="OK"
                                                ></TextIconButton>
                                            </SectionHeader>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- form group (maklumat rawatan) -->
                            <div>
                                <div class="flex w-full flex-col gap-2">
                                    <p class="text-sm font-bold text-blue-900">
                                        Maklumat Rawatan/Ubat
                                    </p>
                                </div>

                                <div
                                    class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                                >
                                    <!-- form row -->
                                    <div class="flex w-full flex-row gap-2">
                                        <!-- form label -->
                                        <div class="w-[220px] min-w-[220px]">
                                            <label for="" class="text-sm">
                                                Jenis Rawatan/Ubat yang
                                                Ditanggung oleh LKIM
                                            </label>
                                        </div>
                                        <!-- form field area -->
                                        <div class="flex w-full flex-col gap-2">
                                            <!-- form field row -->
                                            <div
                                                class="flex w-full flex-row gap-2"
                                            >
                                                <!-- checkbox -->
                                                <Checkbox></Checkbox>

                                                <!-- text field label -->
                                                <div
                                                    class=" flex flex-col justify-center items-center"
                                                >
                                                    <label
                                                        for=""
                                                        class="text-sm"
                                                    >
                                                        1.
                                                    </label>
                                                </div>

                                                <!-- textfield -->
                                                <TextField
                                                    id="tindakanUlasan"
                                                    label=""
                                                    value={'Pembedahan LASIK'}
                                                ></TextField>

                                                <!-- textfield -->
                                                <TextField
                                                    id="tindakanUlasan"
                                                    label=""
                                                    value={'RM5600.00'}
                                                ></TextField>
                                            </div>

                                             <!-- form field row -->
                                             <div
                                             class="flex w-full flex-row gap-2"
                                         >
                                             <!-- checkbox -->
                                             <Checkbox></Checkbox>

                                             <!-- text field label -->
                                             <div
                                                 class=" flex flex-col justify-center items-center"
                                             >
                                                 <label
                                                     for=""
                                                     class="text-sm"
                                                 >
                                                     2.
                                                 </label>
                                             </div>

                                             <!-- textfield -->
                                             <TextField
                                                 id="tindakanUlasan"
                                                 label=""
                                                 value={'Ubat Batuk'}
                                             ></TextField>

                                             <!-- textfield -->
                                             <TextField
                                                 id="tindakanUlasan"
                                                 label=""
                                                 value={'RM54.67'}
                                             ></TextField>
                                         </div>

                                        </div>
                                    </div>
                                    <TextField
                                        id="tindakanUlasan"
                                        label={'Jumlah Tanggungan oleh LKIM (RM)'}
                                        value={'RM955'}
                                    ></TextField>

                                    <div
                                        class="flex max-h-full w-full flex-col items-start justify-start"
                                    >
                                        <SectionHeader>
                                            <TextIconButton primary label="SAH">
                                                <SvgDoubleTick></SvgDoubleTick>
                                            </TextIconButton>
                                        </SectionHeader>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <!-- <form class="flex w-full flex-col space-y-6" action="#"> -->
                    </div>
                </Modal>

    </StepperContent>
</Stepper>
