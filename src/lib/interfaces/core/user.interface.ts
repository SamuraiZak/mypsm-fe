import type { IRole } from "./role.interface";

export interface IUser {
    id: string | number;
    email: string;
    userName: string;
    displayName: string;
    type: string;
    listUserRoles: IRole[];
}
