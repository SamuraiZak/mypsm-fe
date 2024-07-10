export interface ModuleDTO {
    moduleName: string;
    url: string;
    color?: string;
    child: ModuleDTO[];
}
