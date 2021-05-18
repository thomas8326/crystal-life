import { MainPath } from 'src/core/enums/main-path';
import Navigation from 'src/core/models/navigation';

export const CHARM_OPTIONS: any[] = [
  {
    key: 'CHARM_001',
    text: 'default-charm',
  },
];

export const DASHBOARD_NAVIGATION: Navigation[] = [
  {
    key: 'ALLOW_LIST',
    text: '權限列表',
    path: MainPath.AllowList,
  },
  {
    key: 'HAND_SIZE',
    text: '手圍',
    path: MainPath.HandSizeForm,
  },
  {
    key: 'SLIVER_PIPE',
    text: '銀圍',
    path: MainPath.SliverPipeForm,
  },
  {
    key: 'CRYSTAL',
    text: '水晶',
    path: MainPath.CrystalBeadForm,
  },
  {
    key: 'FLOWER',
    text: '花蓋',
    path: MainPath.FlowerCoverForm,
  },
  {
    key: 'CHARM',
    text: '吊飾',
    path: MainPath.CharmForm,
  },
];
