'use server';

import { redirect } from 'next/navigation';
import { getAuthorizedUser } from '../../../../backend/domain/auth';
import UserProfile from './components/User';
import { getFullUser } from '../../../../backend/infrastructure/user';

const UserPage = async () => {
  const user = await getAuthorizedUser();
  if (user.isErr()) {
    redirect('/auth');
  }
  const fullUser = await getFullUser(user.value.id);
  if (fullUser.isErr()) {
    redirect('/404');
  }

  return <UserProfile user={fullUser.value} />;
};

export default UserPage;
