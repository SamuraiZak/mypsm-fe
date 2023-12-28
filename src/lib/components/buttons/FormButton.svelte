<script>
    import { Button } from 'flowbite-svelte';
    import '../../components/buttons/GeneralButton.svelte';
    import GeneralButton from '../../components/buttons/GeneralButton.svelte';
    export let onClick = () => {};
    export let type = 'next';
    export let addLabel = 'Baru';
</script>

{#if type === 'next'}
    <GeneralButton
        buttonType="primary"
        pathD="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        label="Seterusnya"
        {onClick}
    />
{:else if type === 'back'}
    <GeneralButton
        buttonType="ghost"
        pathD="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        label="Kembali"
        {onClick}
    />
{:else if type === 'reset'}
    <GeneralButton
        buttonType="ghost"
        pathD="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        label="Set Semula"
        {onClick}
    />
{:else if type === 'send'}
    <GeneralButton
        buttonType="primary"
        pathD="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        label="Hantar"
        {onClick}
    />
{:else if type === 'update'}
    <GeneralButton
        buttonType="primary"
        pathD="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        label="Kemaskini"
        {onClick}
    />
{:else if type === 'save'}
    <GeneralButton
        buttonType="primary"
        pathD="M4.5 12.75l6 6 9-13.5"
        label="Simpan"
        {onClick}
    />
{:else if type === 'print'}
    <GeneralButton
        buttonType="primary"
        pathD="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
        label="Cetak"
        {onClick}
    />
{:else if type === 'close'}
    <GeneralButton
        buttonType="ghost"
        pathD="M6 18L18 6M6 6l12 12"
        label="Tutup"
        {onClick}
    />
{:else if type === 'cancel'}
    <GeneralButton
        buttonType="ghost"
        pathD="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        label="Batal"
        {onClick}
    />
{:else if type === 'done'}
    <GeneralButton
        buttonType="primary"
        pathD="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        label="Selesai"
        {onClick}
    />
{:else if type === 'new'}
    <GeneralButton
        buttonType="primary"
        pathD="M12 4.5v15m7.5-7.5h-15"
        label={addLabel}
        {onClick}
    />
{:else if type === 'new-application-outside'}
    <GeneralButton
        buttonType="primary"
        pathD="M12 4.5v15m7.5-7.5h-15"
        label="Permohonan Luar"
        {onClick}
    />
{:else if type === 'find'}
    <GeneralButton
        buttonType="primary"
        pathD="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        label="Cari"
        {onClick}
    />
{:else if type === 'generate-link'}
    <Button
        class="flex h-[32px] flex-row rounded-md border border-solid border-system-primary bg-system-primaryTint px-2.5 text-system-primary hover:bg-blue-600 hover:text-txt-blend focus:outline-none focus:ring-0"
        on:click={onClick}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mr-2 h-5 w-5"
        >
            <path
                d="M15.197 3.35462C16.8703 1.67483 19.4476 1.53865 20.9536 3.05046C22.4596 4.56228 22.3239 7.14956 20.6506 8.82935L18.2268 11.2626M10.0464 14C8.54044 12.4882 8.67609 9.90087 10.3494 8.22108L12.5 6.06212"
                stroke-linecap="round"
            ></path>
            <path
                d="M13.9536 10C15.4596 11.5118 15.3239 14.0991 13.6506 15.7789L11.2268 18.2121L8.80299 20.6454C7.12969 22.3252 4.55237 22.4613 3.0464 20.9495C1.54043 19.4377 1.67609 16.8504 3.34939 15.1706L5.77323 12.7373"
                stroke-linecap="round"
            ></path>
        </svg>
        <div class="text-xs">Jana Pautan</div></Button
    >
{:else if type === 'add'}
    <GeneralButton
        buttonType="ghost"
        pathD="M12 4.5v15m7.5-7.5h-15"
        label="Tambah"
        {onClick}
    />
{:else if type === 'add-supplier'}
    <GeneralButton
        buttonType="primary"
        pathD="M12 4.5v15m7.5-7.5h-15"
        label="Tambah Pembekal"
        {onClick}
    />
{:else if type === 'new-application'}
    <GeneralButton
        buttonType="primary"
        pathD="M12 4.5v15m7.5-7.5h-15"
        label="Permohonan Baru"
        {onClick}
    />
{:else if type === 'new-application-exit-quarters'}
    <GeneralButton
        buttonType="primary"
        pathD="M12 4.5v15m7.5-7.5h-15"
        label="Permohonan Keluar Kuarters"
        {onClick}
    />
{:else if type === 'approve'}
    <GeneralButton
        buttonType="primary"
        pathD="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
        label="Luluskan"
        {onClick}
    />
{:else if type === 'support'}
    <GeneralButton
        buttonType="green"
        pathD="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
        label="SOKONG"
        {onClick}
    />
{:else if type === 'not-support'}
    <GeneralButton
        buttonType="red"
        pathD="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        label="Tidak SOKONG"
        {onClick}
    />
{:else if type === 'simpan'}
    <GeneralButton
        buttonType="primary"
        pathD="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
        label="Simpan"
        {onClick}
    />
{:else if type === 'perakukan'}
    <GeneralButton
        buttonType="primary"
        pathD="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
        label="Perakukan"
        {onClick}
    />
{:else if type === 'sahkan'}
    <GeneralButton
        buttonType="primary"
        pathD="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
        label="Sahkan"
        {onClick}
    />
{:else if type === 'tindakan'}
    <GeneralButton
        buttonType="primary"
        pathD="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        label="Tindakan"
        {onClick}
    />
{:else if type === 'failed'}
    <GeneralButton
        buttonType="red"
        pathD="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        label="Tidak LULUS"
        {onClick}
    />
{:else if type === 'passed'}
    <GeneralButton
        buttonType="green"
        pathD="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
        label="LULUS"
        {onClick}
    />
{/if}
