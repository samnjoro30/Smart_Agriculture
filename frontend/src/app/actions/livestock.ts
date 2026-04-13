'use server';

import { revalidatePath } from 'next/cache';

export async function archiveAnimal(formData: {
  tag: string;
  reason: string;
  notes: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/livestock/${formData.tag}/release`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // If you have auth, add your token here
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          reason: formData.reason,
          notes: formData.notes,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update animal in FastAPI');
    }

    // This tells Next.js to refresh the data on the livestock page
    revalidatePath('/dashboard/animals');

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Server error occurred' };
  }
}
