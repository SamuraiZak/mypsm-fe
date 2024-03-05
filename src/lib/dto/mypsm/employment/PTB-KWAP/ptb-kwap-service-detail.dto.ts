import type { _PTBInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type PTBServiceDTO = z.infer<typeof _PTBInfoSchema>;