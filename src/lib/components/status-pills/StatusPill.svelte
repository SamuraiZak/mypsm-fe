<script lang="ts">
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';

    export let status: string =
        'baharu' || 'Draf' || 'sedang diproses' || 'selesai' || 'gagal';
</script>

<div
    class="flex h-6 min-h-6 flex-row items-center justify-center rounded-full {status.toLowerCase() ==
    'baharu'
        ? 'bg-blue-200 text-blue-700'
        : status.toLowerCase() == 'draf'
          ? 'bg-gray-200 text-gray-700'
          : status.toLowerCase() == 'sedang diproses'
            ? 'bg-slate-200 text-slate-700'
            : status.toLowerCase() == 'selesai'
              ? 'bg-lime-200 text-lime-700'
              : 'bg-red-200 text-red-700'} px-4"
>
    <p class="text-md font-medium leading-tight">{TextAppearanceHelper.toProper(status)}</p>
</div>
