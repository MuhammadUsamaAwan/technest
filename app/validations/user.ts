import { z } from 'zod';

import { DEFAULT_PAGE_SIZE } from '~/config/constants';

export const getUsersSchema = z.object({
  pageIndex: z.number().int().optional().default(0),
  pageSize: z.number().int().optional().default(DEFAULT_PAGE_SIZE),
  filterBy: z.enum(['name', 'email']).optional(),
  q: z.string().optional(),
  sortBy: z
    .enum(['name', 'email', 'emailVerified', 'createdAt', 'updatedAt', 'role', 'banned', 'banReason', 'banExpires'])
    .optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
});
