import type { _resultInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type PTBRolesRelatedDTO = z.infer<typeof _resultInfoSchema>;