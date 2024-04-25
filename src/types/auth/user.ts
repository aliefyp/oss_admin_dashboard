import { Data } from "./login";

export type UserData = Pick<Data, 'userId' | 'email' | 'roleId' | 'roleName' | 'roleGroup' | 'regions' | 'status' | 'serviceTypes'>;