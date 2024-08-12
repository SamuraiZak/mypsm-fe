<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan Baru">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => {
                goto('/v2/employment/acting');
            }}
        />
        <TextIconButton
            icon="add"
            label="Seterusnya"
            type="primary"
            onClick={() => {}}
        />
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden"
>
    <div
        class="flex h-full w-full flex-col items-start justify-start gap-5 p-5"
    >
        <!-- section for settings -->
        <div
            class="flex h-full w-full flex-col items-start justify-start rounded border border-slate-100"
        >
            <div
                class="flex h-10 w-full flex-row items-center justify-start bg-slate-100 px-4"
            >
                <p class="text-md font-medium">Butiran Pemangkuan</p>
            </div>
        </div>
        <!-- section for settings -->
        <div
            class="flex h-full w-full flex-col items-start justify-start rounded border border-slate-100"
        >
            <div
                class="flex h-10 w-full flex-row items-center justify-start bg-slate-100 px-4"
            >
                <p class="text-md font-medium">
                    Pemilihan Kakitangan Sebagai Calon Pemangkuan
                </p>
            </div>
        </div>
    </div>
</section>
