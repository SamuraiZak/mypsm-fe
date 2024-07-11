<script lang="ts">
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';

    export let status: string =
        'Baru' || 'Draf' || 'Sedang Diproses' || 'Selesai' || 'Gagal';
</script>

<div
    class="flex h-6 min-h-6 flex-row items-center justify-center rounded-full {status ==
    'Baru'
        ? 'bg-blue-200 text-blue-700'
        : status == 'Draf'
          ? 'bg-gray-200 text-gray-700'
          : status == 'Sedang Diproses'
            ? 'bg-slate-200 text-slate-700'
            : status == 'Selesai'
              ? 'bg-lime-200 text-lime-700'
              : 'bg-red-200 text-red-700'} px-2"
>
    <p class="text-md font-medium">{TextAppearanceHelper.toProper(status)}</p>
</div>
