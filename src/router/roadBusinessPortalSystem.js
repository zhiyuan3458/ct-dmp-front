/* 后台管理系统的路由 */
/* 主框，永远不变 */
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
const _import = require('./_import_' + process.env.NODE_ENV);

const index = _import('roadBusinessPortalSystem/index');

export const roadBusinessPortalRouters = [
  {
    path: '/roadBusinessPortalSystem',
    component: MainFrame,
    redirect: '/roadBusinessPortalSystem/index',
    children: [
      {
        path: 'index',
        component: index,
        name: '公路业务综合门户系统',
        meta: {
          subSystemId: '40286b8166563eb2016656856bb50000'
        }
      }
    ]
  }
];
