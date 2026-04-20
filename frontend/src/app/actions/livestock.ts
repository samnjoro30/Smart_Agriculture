'use server';

import { revalidatePath } from 'next/cache';

//import { cookies } from 'next/headers';
import { serverAPI } from '../API/serverAPI';

type ArchiveAnimalPayload = {
  tag: string;
  reason: string;
  notes?: string;
};

export async function archiveAnimal({
  tag,
  reason,
  notes,
}: ArchiveAnimalPayload) {
  try {
    await serverAPI.patch(`/livestock/${tag}/archive`, {
      reason,
      notes,
    });

    revalidatePath('/dashboard');

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: 'Failed to archive animal',
    };
  }
}
