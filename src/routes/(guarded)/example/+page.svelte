<script lang="ts">
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import { RoleConstant } from '$lib/constants/core/role.constant';
    import type { PageData } from './$types';

    export let data: PageData;

</script>

<!-- content header starts here -->
<ContentHeader borderClass="border-0" title="Example">
    <TextIconButton type="primary"><SvgCheck></SvgCheck></TextIconButton>
    <TextIconButton type="danger"><SvgCheck></SvgCheck></TextIconButton>
    <TextIconButton type="neutral"><SvgCheck></SvgCheck></TextIconButton>
</ContentHeader>
<!-- content header ends here -->
<hr class="h-px w-full" />
<!-- content sections starts here -->
<section
    class="flex h-full max-h-full w-full flex-col gap-2 overflow-hidden pb-2"
>
    <ContentHeader borderClass="border-0" title="This is example page"
        ><TextIconButton type="primary"><SvgCheck></SvgCheck></TextIconButton>
        <TextIconButton type="danger"><SvgCheck></SvgCheck></TextIconButton>
        <TextIconButton type="neutral"><SvgCheck></SvgCheck></TextIconButton>
    </ContentHeader>

    <!-- content starts here -->
    {#if data.props.currentRole == RoleConstant.kakitangan.code}
        <p>This is Kakitangan view</p>
    {/if}
    <!-- content ends here -->
</section>
<!-- content sections ends here -->
