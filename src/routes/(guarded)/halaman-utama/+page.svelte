<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import NotificationTile from '$lib/components/notification-tile/NotificationTile.svelte';

    const cards = [
    { moduleName: 'Account setting', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-blue-300 to-blue-500', icon: '/icons/account-setting.svg' },
    { moduleName: 'System settings', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-green-300 to-green-500', icon: '/icons/system-settings.svg' },
    { moduleName: 'Profile', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-pink-300 to-pink-500', icon: '/icons/profile.svg' },
    { moduleName: 'Employment', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-yellow-300 to-yellow-500', icon: '/icons/employment.svg' },
    { moduleName: 'Contract Employees', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-purple-300 to-purple-500', icon: '/icons/contract-employees.svg' },
    { moduleName: 'Integrity', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-indigo-300 to-indigo-500', icon: '/icons/integrity.svg' },
    { moduleName: 'Leave Management', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-red-300 to-red-500', icon: '/icons/leave-management.svg' },
    { moduleName: 'Performance', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-teal-300 to-teal-500', icon: '/icons/performance.svg' },
    { moduleName: 'Allowance', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-blue-200 to-blue-400', icon: '/icons/allowance.svg' },
    { moduleName: 'Loans and Quarters', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-orange-300 to-orange-500', icon: '/icons/loans-quarters.svg' },
    { moduleName: 'Salary', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-pink-200 to-pink-400', icon: '/icons/salary.svg' },
    { moduleName: 'Medical', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-green-200 to-green-400', icon: '/icons/medical.svg' },
    { moduleName: 'Training and Exams', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-red-200 to-red-400', icon: '/icons/training-exams.svg' },
    { moduleName: 'Service Records', submodules: ['Submodule 1', 'Submodule 2'], gradient: 'bg-gradient-to-b from-yellow-200 to-yellow-400', icon: '/icons/service-records.svg' },
  ];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Halaman Utama" />
</section>

<section
    class="flex h-full w-full flex-row items-start justify-start divide-x overflow-hidden"
>
    <!-- quick link panel -->
    <div
        class="flex h-full w-full flex-col items-center justify-start bg-white p-10"
    >
        <div class="flex w-full flex-col items-center justify-center">
            <h1 class="text-2xl w-full text-start font-medium tracking-widest">
                Halaman Utama
            </h1>
        </div>
        <div
            class="flex h-full w-full flex-col items-center justify-start bg-white"
        >
            <div class="flex h-9 w-full flex-row items-center justify-start">
                <p class="text-start text-md font-medium">Pautan Ringkas</p>
            </div>
            <div class="h-full w-full overflow-y-auto">
                <div class="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {#each cards as card}
                    <div class="overflow-hidden rounded-lg shadow-md min-w-[200px] bg-white">
                      <div class={`p-6 ${card.gradient} rounded-lg relative`}>
                        <h2 class="mb-4 text-xl font-bold text-white">
                          {card.moduleName}
                        </h2>
                        <ul>
                          {#each card.submodules as submodule}
                            <li class="mb-2 text-sm text-white">
                              {submodule}
                            </li>
                          {/each}
                        </ul>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
        </div>
    </div>

    <!-- notification panel -->
    <div class="flex h-full w-1/4 flex-col items-center justify-start divide-y">
        <!-- header -->
        <div class="flex h-10 w-full flex-row items-center justify-start">
            <!-- title -->
            <div
                class="flex h-full w-full flex-col items-start justify-center px-4"
            >
                <h1 class="text-md font-semibold">Notifikasi</h1>
            </div>
        </div>

        <!-- body -->
        <div
            class="flex h-full w-full flex-col items-center justify-start divide-y overflow-y-auto"
        >
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
            <NotificationTile></NotificationTile>
        </div>
    </div>
</section>
