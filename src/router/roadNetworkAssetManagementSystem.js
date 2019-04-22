/* 后台管理系统的路由 */
/* 主框，永远不变 */
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
const _import = require('./_import_' + process.env.NODE_ENV);

const index = _import('roadNetworkAssetManagementSystem/index');
const bridge = _import('roadNetworkAssetManagementSystem/bridge/rightPanel');
const tunnel = _import('roadNetworkAssetManagementSystem/tunnel/rightPanel');
const culvert = _import('roadNetworkAssetManagementSystem/culvert/rightPanel');
const safetyFacilities = _import('roadNetworkAssetManagementSystem/safetyfacilities/rightPanel');
const greening = _import('roadNetworkAssetManagementSystem/greening/rightPanel');
const slope = _import('roadNetworkAssetManagementSystem/slope/rightPanel');
const section = _import('roadNetworkAssetManagementSystem/section/rightPanel');
const observatory = _import('roadNetworkAssetManagementSystem/observatory/rightPanel');
const roadGreening = _import('roadNetworkAssetManagementSystem/roadgreening/rightPanel');
const roadLand = _import('roadNetworkAssetManagementSystem/roadland/rightPanel');
const roadlaw = _import('roadNetworkAssetManagementSystem/roadlaw/rightPanel');
const roadStandard = _import('roadNetworkAssetManagementSystem/roadstandard/rightPanel');
const servicefacilities = _import('roadNetworkAssetManagementSystem/servicefacilities/rightPanel');
export const roadNetworkAssetManagementRouters = [
  {
    path: '/roadNetworkAssetManagementSystem',
    component: MainFrame,
    redirect: '/roadNetworkAssetManagementSystem/index',
    children: [
      {
        path: 'index',
        component: index,
        name: '路网资产管理系统',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'bridge',
        component: bridge,
        name: '桥梁卡片',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'tunnel',
        component: tunnel,
        name: '隧道卡片',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'culvert',
        component: culvert,
        name: '涵洞卡片',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'safetyFacilities',
        component: safetyFacilities,
        name: '交安设施',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'greening',
        component: greening,
        name: '绿化信息',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'slope',
        component: slope,
        name: '边坡路基挡墙',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'section',
        component: section,
        name: '区间路段',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'observatory',
        component: observatory,
        name: '观测站',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'roadGreening',
        component: roadGreening,
        name: '公路绿化',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'roadLand',
        component: roadLand,
        name: '公路用地',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'roadlaw',
        component: roadlaw,
        name: '公路法律法规',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'roadStandard',
        component: roadStandard,
        name: '公路规范标准',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      },
      {
        path: 'servicefacilities',
        component: servicefacilities,
        name: '公路服务设施',
        meta: {
          subSystemId: '40286b816656a379016656d14a990006'
        }
      }
    ]
  }
];
