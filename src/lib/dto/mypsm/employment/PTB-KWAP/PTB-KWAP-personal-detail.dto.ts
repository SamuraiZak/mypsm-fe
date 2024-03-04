import type { _personalInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type PTBPersonalDTO = z.infer<typeof _personalInfoSchema>;