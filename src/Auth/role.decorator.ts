import { SetMetadata } from "@nestjs/common";
import { role } from "./role.enum";


export const ROLES_KEY = 'roles';
export const Roles = (...roles:role[]) => SetMetadata(ROLES_KEY,roles);