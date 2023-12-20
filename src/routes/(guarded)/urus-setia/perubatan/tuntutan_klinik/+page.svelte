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
    import { Button, Modal, Label, Input,} from 'flowbite-svelte';
    import { Badge } from 'flowbite-svelte';
    import {  Radio, Tooltip } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { greds } from '$lib/mocks/gred/gred.js';
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import { currencyFormatter } from '$lib/service/services';

    let formModal = false;
    let open = false;
     let color;
     let selectedGred: string = greds[0].value;
    export let disabled: boolean = true;
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
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="flex w-full">
                        <div
                            class="flex w-1/3 flex-row items-start pt-4 text-sm"
                        >
                            <Checkbox />
                            <div class="font-bold">Tuntutan 1</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                type="text"
                                id="namaKakitangan"
                                label="Nama Kakitangan"
                                value="Mohd Safwan Adam"
                            ></TextField>
                            <TextField
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="111111-11-1111"
                            ></TextField>
                        </div>
                        <div class="space-y-2.5">
                            <TextField
                                type="text"
                                id="namaPesakit"
                                label="Nama Pesakit"
                                value="Mohd Safwan Adam"
                            ></TextField>
                            <TextField
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="111111-11-1111"
                            ></TextField>
                        </div>
                    </div>
                    <Button on:click={() => {color = 'blue'; formModal = true;}}>Primary modal</Button>
                </div>
                <Modal bind:open={formModal} autoclose={false} size="xl" class="w-full h-full">
                    <div class="p-8 md:p-8 space-y-50 w-full">
                    <form class="w-full flex flex-col space-y-6" action="#">
                       <h3 class="mb-2 text-xl font-medium text-gray-900">Tuntutan 1</h3>

                       <p
                       class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                   >
                       ● Sila klik "OK" untuk menghantar pembatalan tututan ke Klinik Panel dan Kakitangan yang berkaitan.
                   </p>
                       <div class="flex w-full flex-col gap-2">
                        <p class="text-sm font-bold">Klinik</p>
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >
                            <LongTextField
                                id="tindakanUlasan"
                                label={'Tindakan/ Ulasan'}
                                value={'Simpan ke klinik semula untuk membuat pembetulan'}
                            ></LongTextField>
                            <div
                        class ="flex max-h-full w-full flex-col items-start justify-start"
                        >
                        <SectionHeader>
                           <TextIconButton primary label="OK">
                         </TextIconButton>
                         </SectionHeader>
                            </div>
                        </div>

                    </div>

                   <div>
                    <div class="flex w-full flex-col gap-2">
                        <p class="text-sm font-bold">Kakitangan</p>
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
                                label={'Jumlah Perlu Ditanggung oleh Kakitangan (RM)'}
                                value={'RM955'}
                            ></TextField>

                            <div
                        class ="flex max-h-full w-full flex-col items-start justify-start"
                        >
                        <SectionHeader>
                           <TextIconButton primary label="OK">
                         </TextIconButton>
                         </SectionHeader>
                            </div>

                        </div>

                        <div class="flex w-full flex-col gap-2">
                            <p class="text-sm font-bold">Maklumat Rawatan/Ubat</p>
                        </div>
                    </div>

                    <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
            >
                <SectionHeader title="Pergerakan Gaji Baru"></SectionHeader>


                    </div>

                    <p class="text-sm font-bold">Kakitangan</p>
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >

                            <TextField
                                id="tindakanUlasan"
                                label={'Jumlah Tanggungan oleh LKIM (RM)'}
                                value={'RM955'}
                            ></TextField>
                        </div>

                        <div
                        class ="flex max-h-full w-full flex-col items-start justify-start"
                        >
                        <SectionHeader>
                           <TextIconButton primary label="SAH">
                    <SvgDoubleTick></SvgDoubleTick>
                         </TextIconButton>
                         </SectionHeader>
                    </div>

                </form>
                        </div>
                      </Modal>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="flex w-full">
                        <div
                            class="flex w-1/3 flex-row items-start pt-4 text-sm"
                        >
                            <Checkbox />
                            <div class="font-bold">Tuntutan 2</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                type="text"
                                id="namaKakitangan"
                                label="Nama Kakitangan"
                                value="Jackson"
                            ></TextField>
                            <TextField
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="222222-22-2222"
                            ></TextField>
                        </div>
                        <div class="space-y-2.5">
                            <TextField
                                type="text"
                                id="namaPesakit"
                                label="Nama Pesakit"
                                value="Jackson"
                            ></TextField>
                            <TextField
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="222222-22-2222"
                            ></TextField>
                        </div>
                    </div>
                    <FormButton
                        type="tindakan"
                        addLabel="Tindakan"
                        onClick={() => {
                            goto('');
                        }}
                    />
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="flex w-full">
                        <div
                            class="flex w-1/3 flex-row items-start pt-4 text-sm"
                        >
                            <Checkbox />
                            <div class="font-bold">Tuntutan 3</div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                type="text"
                                id="namaKakitangan"
                                label="Nama Kakitangan"
                                value="Senah Binti Adam"
                            ></TextField>
                            <TextField
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="333333-33-3333"
                            ></TextField>
                        </div>
                        <div class="space-y-2.5">
                            <TextField
                                type="text"
                                id="namaPesakit"
                                label="Nama Pesakit"
                                value="Ali Bin Abu"
                            ></TextField>
                            <TextField
                                type="text"
                                id="noKP"
                                label="No. Kad Pengenalan"
                                value="121212-12-1212"
                            ></TextField>
                        </div>
                    </div>
                    <FormButton
                        type="tindakan"
                        addLabel="Tindakan"
                        onClick={() => {
                            goto('');
                        }}
                    />
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
