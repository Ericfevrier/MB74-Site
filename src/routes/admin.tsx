import { AdminApp } from '../components/admin/AdminApp';

export function meta() {
  return [{ title: 'Admin | Motor Boat 74' }, { name: 'robots', content: 'noindex, nofollow' }];
}

export default function Admin() {
  return <AdminApp />;
}
