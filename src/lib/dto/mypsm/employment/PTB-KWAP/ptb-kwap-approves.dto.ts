import type { _passerInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type PTBApproveDTO = z.infer<typeof _passerInfoSchema>;