'use client';

import { getAccessToken } from '@auth0/nextjs-auth0/';

export type Bundle = {
  id: string;
  name: string;
  description: string;
  userId: string;
  username: string;
};

const getBundles = async (): Promise<Bundle[]> => {
  const accessToken = await getAccessToken();
  const res = await fetch('http://localhost:4000/getBundles', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  const data: Bundle[] = json.res;
  return data;
};

export default getBundles;