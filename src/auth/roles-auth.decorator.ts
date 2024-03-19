import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'asan_0707';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);