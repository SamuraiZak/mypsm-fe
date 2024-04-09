import type { _serviceInfoSchema} from '$lib/schemas/mypsm/employment/PTB-KWAP/schema';
import type { z } from 'zod';

export type PTBServiceDTO = z.infer<typeof _serviceInfoSchema>;