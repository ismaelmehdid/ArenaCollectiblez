'use server';

import { redirect } from 'next/navigation';
import { getAuthorizedUser } from '../../../backend/domain/auth';
import Scanning from './components/Scan';

const ScanPage = async () => {
  const user = await getAuthorizedUser();

  if (user.isErr()) {
    redirect('/auth');
  }

  return <Scanning user={user.value} />;
};

export default ScanPage;
