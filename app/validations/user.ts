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

export const updateUsersSchema = z.object({
  id: z.string({ required_error: 'ID is required' }),
  name: z
    .string()
    .min(6, { message: 'Name must be at least 6 characters long' })
    .max(40, { message: 'Name must be at most 40 characters long' })
    .optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.date().optional(),
});
