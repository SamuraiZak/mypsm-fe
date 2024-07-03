<script lang="ts">
    export let title: string = 'Title';
</script>

<th class="border border-gray-400 p-1">
    <div class="flex h-full flex-row items-center justify-between">
        <p
            class=" w-full text-wrap text-center text-md font-medium leading-tight"
        >
            {title}
        </p>
        <button
            class="text flex flex-col items-center justify-center text-gray-600"
        >
            <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 9L12 3L18 9M18 15L12 21L6 15"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>
    </div>
</th>
