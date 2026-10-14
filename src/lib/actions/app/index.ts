'use server';

import { cookies } from 'next/headers';

import { WEB_APP_ROLE, WEB_APP_TOKEN } from '@/constant';
import { TEachMembershipCategory } from '@/types/apps/membership/index.type';
import { TEachResourcesCategory } from '@/types/apps/resources/index.type';
import { TEachTypesOfCharterCategory } from '@/types/apps/types-of-charter/index.type';

export async function clearSessionAndCookies() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(WEB_APP_TOKEN);
    cookieStore.delete(WEB_APP_ROLE);
    return { success: true };
  } catch (error) {
    console.error('Failed to clear session cookies:', error);
    return { success: false, error: String(error) };
  }
}

// Types Of Charter

export async function getCharterCategoryData(
  typesOfCharterCategoryId: string,
): Promise<TEachTypesOfCharterCategory | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_APP_BASE_URL}/api/v1/admin/types-of-charter-category/get/${typesOfCharterCategoryId}`,
      {
        method: 'GET',
      },
    );

    const data = await res.json();

    if (!res.ok) return null;

    return data?.data as TEachTypesOfCharterCategory;
  } catch {
    return null;
  }
}

// Membership

export async function getMembershipCategoryData(
  membershipCategoryId: string,
): Promise<TEachMembershipCategory | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_APP_BASE_URL}/api/v1/admin/membership-category/get/${membershipCategoryId}`,
      {
        method: 'GET',
      },
    );

    const data = await res.json();

    if (!res.ok) return null;

    return data?.data as TEachMembershipCategory;
  } catch {
    return null;
  }
}

// Resources

export async function getResourcesCategoryData(
  resourcesCategoryId: string,
): Promise<TEachResourcesCategory | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_APP_BASE_URL}/api/v1/admin/resources-category/get/${resourcesCategoryId}`,
      {
        method: 'GET',
      },
    );

    const data = await res.json();

    if (!res.ok) return null;

    return data?.data as TEachResourcesCategory;
  } catch {
    return null;
  }
}
