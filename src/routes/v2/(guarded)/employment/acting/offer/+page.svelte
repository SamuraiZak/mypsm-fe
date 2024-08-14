<script lang="ts">
    import { goto } from "$app/navigation";
    import TextIconButton from "$lib/components/button/TextIconButton.svelte";


</script>

<section class="flex w-full flex-col items-center justify-center">
    <div class="flex h-1/4 w-full flex-row items-center justify-between p-10">
        <!-- leading -->
        <div class="flex w-full flex-col items-start justify-center">
            <p class="text-lg font-semibold text-black">Urusan Pemangkuan</p>
            <p class="text-md font-normal text-black">
                Carian Tawaran Memangku
            </p>
        </div>
        <div class="flex flex-row items-center justify-end gap-2">
            <TextIconButton
                icon="previous"
                label="Kembali"
                type="draft"
                onClick={() => {
                    goto('/v2/employment/acting/dashboard')
                }}
            />
        </div>
    </div>
</section>