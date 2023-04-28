import { atom, selector } from 'recoil';

const getPermissions = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(['1', '2', '3']), 1000);
  });

export const rootStore = atom({
  key: 'root',
  default: {},
});

export const permissionStore = selector({
  key: 'permission',
  get: async () => {
    const list = await getPermissions();

    return list;
  },
});
