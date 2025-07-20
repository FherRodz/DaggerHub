// import { getAccessToken } from '@auth0/nextjs-auth0/';
import type { Bundle } from '../../types/bundle';

const getBundles = async (): Promise<Bundle[]> => {
  // const accessToken = await getAccessToken();
  const res = await fetch('http://localhost:4000/getBundles', {
    // headers: {
    //   Authorization: `Bearer ${accessToken}`, //NOTE: Uncomment if your API requires authentication
    // },
  });
  const json = await res.json();
  const data: Bundle[] = json.res;
  return data;
};

export default getBundles;