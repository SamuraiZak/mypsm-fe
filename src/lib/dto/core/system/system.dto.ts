export interface ModuleDTO {
    moduleName: string;
    url: string;
    color?: string;
    child: ModuleDTO[];
}

export interface PageSlug{
    mode?: string;
    status?: string;
    id?: number;
}