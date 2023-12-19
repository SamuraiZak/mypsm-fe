import { SvelteComponentTyped } from 'svelte';

declare const __propDef: {
    props: {
        title: string | undefined;
        description: string | undefined;
        borderClass?: string | undefined;
    };
};

export type ContentHeaderProps = typeof __propDef.props;

export default class ContentHeader extends SvelteComponentTyped<ContentHeaderProps> {}
export {};
