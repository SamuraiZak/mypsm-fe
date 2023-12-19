<script lang="ts">
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    
    export let fileName = '';
    export let handleDelete = () => {};
    export let childrenType = 'default';

</script>

{#if childrenType === 'default'}
    <label
        for=""
        class="flex h-8 w-full cursor-pointer flex-row items-center justify-between rounded-[3px] border border-solid bg-system-primaryTint px-2 py-1 text-[12px] text-system-primary hover:border-system-primary"
        ><div class="flex flex-row items-center">
            <svg
                fill="currentColor"
                class="mr-2 h-5 w-5 text-system-primary"
                viewBox="-64 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></g><g id="SVGRepo_iconCarrier"
                    ><path
                        d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
                    ></path></g
                ></svg
            >{fileName}
        </div>
        <button
            type="button"
            on:click={handleDelete}
            aria-label="Delete file"
            class="flex h-6 w-6 items-center justify-center text-system-danger"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    </label>
{:else if childrenType === 'grid'}
    <div class="flex flex-row">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="0 flex h-fit w-fit flex-col items-center justify-center gap-2.5 rounded-md bg-bgr-secondary p-2.5 text-sm hover:bg-bgr-tertiary"
        >
        {#if fileName.includes('.pdf')}
        <svg
        fill="#ffffff"
        class="mr-2 h-16 w-16 text-system-primary"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 4C4 3.44772 4.44772 3 5 3H14H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M20 8H15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11.5 13H11V17H11.5C12.6046 17 13.5 16.1046 13.5 15C13.5 13.8954 12.6046 13 11.5 13Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5 17V13L17.5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16 15H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 17L7 15.5M7 15.5L7 13L7.75 13C8.44036 13 9 13.5596 9 14.25V14.25C9 14.9404 8.44036 15.5 7.75 15.5H7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        {:else if  fileName.includes('.doc') || fileName.includes('.docx')}
        <svg
        fill="#ffffff"
        class="mr-2 h-16 w-16 text-system-primary"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 4C4 3.44772 4.44772 3 5 3H14H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M20 8H15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.5 13H7V17H7.5C8.60457 17 9.5 16.1046 9.5 15C9.5 13.8954 8.60457 13 7.5 13Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.5 13L17 13C16.4477 13 16 13.4477 16 14V16C16 16.5523 16.4477 17 17 17H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11.5 14C11.5 13.4477 11.9477 13 12.5 13H13C13.5523 13 14 13.4477 14 14V16C14 16.5523 13.5523 17 13 17H12.5C11.9477 17 11.5 16.5523 11.5 16V14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> 
        {:else if fileName.includes('.xls') || fileName.includes('.xlsx')}
        <svg
        fill="#ffffff"
        class="mr-2 h-16 w-16 text-system-primary"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 4C4 3.44772 4.44772 3 5 3H14H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M20 8H15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 16L10 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> <path d="M10 16L14 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path> </g></svg>
        {:else if fileName.includes('.png') || fileName.includes('.jpg') || fileName.includes('.jpeg')}
        <svg
                fill="currentColor"
                class="mr-2 h-16 w-16 text-system-primary"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V14.5858L7.79289 11.7929C8.18342 11.4024 8.81658 11.4024 9.20711 11.7929L13 15.5858L14.2929 14.2929C14.6834 13.9024 15.3166 13.9024 15.7071 14.2929L19 17.5858V4C19 3.44772 18.5523 3 18 3ZM5 20V17.4142L8.5 13.9142L12.2929 17.7071C12.6834 18.0976 13.3166 18.0976 13.7071 17.7071L15 16.4142L18.9269 20.3411L18.9367 20.3508C18.7946 20.7301 18.4288 21 18 21H6C5.44772 21 5 20.5523 5 20ZM6.41421 7H9V4.41421L6.41421 7ZM14.5 13C15.3284 13 16 12.3284 16 11.5C16 10.6716 15.3284 10 14.5 10C13.6716 10 13 10.6716 13 11.5C13 12.3284 13.6716 13 14.5 13Z" fill="currentColor"></path> </g></svg>
                {:else}
                <svg
                        fill="currentColor"
                        class="mr-2 h-16 w-16 text-system-primary"
                        viewBox="-64 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier"
                            ><path
                                d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
                            ></path></g
                        ></svg
                    >
        {/if}
        {#if fileName.length < 15}
                {fileName}
            {:else}
                {fileName.substring(0, 15) + '...'}
            {/if}
        </div>
        <div
            class=" flex h-fit w-fit flex-col items-center justify-center rounded-xl bg-bgr-primary"
        >
            <button class="text-system-danger" on:click={handleDelete}
                ><SvgMinusCircle size="22"></SvgMinusCircle></button
            >
        </div>
    </div>
{/if}
