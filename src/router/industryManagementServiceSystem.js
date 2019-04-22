/* 后台管理系统的路由 */
/* 主框，永远不变 */
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
const _import = require('./_import_' + process.env.NODE_ENV);

const index = _import('industryManagementServiceSystem/index');

export const industryManagementServiceRouters = [
  {
    path: '/industryManagementServiceSystem',
    component: MainFrame,
    redirect: '/industryManagementServiceSystem/index',
    children: [
      {
        path: 'index',
        component: index,
        name: '行业管理服务系统',
        meta: {
          subSystemId: '40286b816656a379016657a1957b0057'
        }
      }
    ]
  }
];
