<script lang="ts">
    import { Label, Input, Modal } from 'flowbite-svelte';
    import GeneralButton from '$lib/components/buttons/GeneralButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { goto } from '$app/navigation';

    let meetingBatch: string = '';
    export let isOpen: boolean = false;
</script>

<Modal bind:open={isOpen} size="xs" autoclose={false} class="w-full">
    <div class="text-center">
        <form class="flex flex-col items-center space-y-6" action="#">
            <svg
                fill="#ffffff"
                width="64px"
                height="64px"
                viewBox="-153.6 -153.6 819.20 819.20"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                ><g
                    id="SVGRepo_bgCarrier"
                    stroke-width="0"
                    transform="translate(0,0), scale(1)"
                    ><rect
                        x="-153.6"
                        y="-153.6"
                        width="819.20"
                        height="819.20"
                        rx="409.6"
                        fill="#E2B203"
                    ></rect></g
                ><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="6.144"
                ></g><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"
                    ></path></g
                ></svg
            >
            <h3
                class="mb-4 text-xl font-semibold text-gray-900 dark:text-white"
            >
                Cetak Senarai Nama
            </h3>
            <p class="text-sm">
                Kumpulan dibawa ke mesyuarat ini akan direkodkan. Sila kemaskini
                keputusan di jadual hadapan
            </p>
            <span>
                <TextField
                    type="text"
                    onChange={() => {
                        console.log('Changed!');
                    }}
                    labelType="top"
                    label="Sila Tetapkan Nama Kumpulan Mesyuarat"
                    placeholder="Kumpulan #12"
                    textCenter={true}
                    bind:value={meetingBatch}
                ></TextField>
            </span>
            <div class="flex flex-row gap-x-4">
                <GeneralButton
                    buttonType={'labelOnly'}
                    label={'Cetak'}
                    onClick={() => {
                        goto('./kemaskini-keputusan-permohonan');
                    }}
                />
                <GeneralButton
                    buttonType={'labelOnlyAlt'}
                    label={'Kembali'}
                    on:click
                    onClick={() => {
                        isOpen = false;
                    }}
                />
            </div>
        </form>
    </div>
</Modal>
