import type { LookupDTO } from '../lookup/lookup.dto';

export interface ModuleDTO {
    name: string;
    url: string;
    subModules?: ModuleDTO[];
    roles: LookupDTO[];
}
