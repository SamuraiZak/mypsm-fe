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

export interface NotificationDTO {
    id:          number;
    moduleName:  string;
    moduleURL:   string;
    description: string;
    isRead:      boolean;
}