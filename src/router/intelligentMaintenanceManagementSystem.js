/* 后台管理系统的路由 */
/* 主框，永远不变 */
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
const _import = require('./_import_' + process.env.NODE_ENV);

const index = _import('intelligentMaintenanceManagementSystem/index');
const tunnelregularcheck = _import('intelligentMaintenanceManagementSystem/tunnelregularcheck/rightPanel');
const tunneloftencheck = _import('intelligentMaintenanceManagementSystem/tunneloftencheck/rightPanel');

const bridgeoftencheck = _import('intelligentMaintenanceManagementSystem/bridgeoftencheck/rightPanel');
const bridgeregularcheck = _import('intelligentMaintenanceManagementSystem/bridgeregularcheck/rightPanel');
const bridgeregularcomponent = _import('intelligentMaintenanceManagementSystem/bridgeregularcomponent/rightPanel');

const culvertoftencheck = _import('intelligentMaintenanceManagementSystem/culvertoftencheck/rightPanel');
const culvertregularcheck = _import('intelligentMaintenanceManagementSystem/culvertregularcheck/rightPanel');

const projectmanagement = _import('intelligentMaintenanceManagementSystem/projectmanagement/rightPanel');

const bitumenroaddamage = _import('intelligentMaintenanceManagementSystem/bitumenroaddamage/rightPanel');
const roadbeddamagecheck = _import('intelligentMaintenanceManagementSystem/roadbeddamagecheck/rightPanel');
const sandstonedamage = _import('intelligentMaintenanceManagementSystem/sandstonedamage/rightPanel');
const cementroaddamage = _import('intelligentMaintenanceManagementSystem/cementroaddamage/rightPanel');
const bridgetunneldamage = _import('intelligentMaintenanceManagementSystem/bridgetunneldamage/rightPanel');
const tcidamage = _import('intelligentMaintenanceManagementSystem/tcidamage/rightPanel');

const roadevaluationdetail = _import('intelligentMaintenanceManagementSystem/roadevaluationdetail/rightPanel');
const roadevaluationsummary = _import('intelligentMaintenanceManagementSystem/roadevaluationsummary/rightPanel');
const maintenancepatrol = _import('intelligentMaintenanceManagementSystem/maintenancepatrol/rightPanel');
const projectlinkmanagement = _import('intelligentMaintenanceManagementSystem/projectlinkmanagement/rightPanel');
const patrolrecord = _import('intelligentMaintenanceManagementSystem/patrolrecord/rightPanel');
const modulemanage = _import('intelligentMaintenanceManagementSystem/modulemanage/rightPanel');
const projectstoragelibrarymanagement = _import('intelligentMaintenanceManagementSystem/projectstoragelibrarymanagement/rightPanel');

const physicalquantity = _import('intelligentMaintenanceManagementSystem/physicalquantity/rightPanel');
const scoretable = _import('intelligentMaintenanceManagementSystem/scoretable/rightPanel');
export const intelligentMaintenanceManagementRouters = [
  {
    path: '/intelligentMaintenanceManagementSystem',
    component: MainFrame,
    redirect: '/intelligentMaintenanceManagementSystem/index',
    children: [
      {
        path: 'index',
        component: index,
        name: '智能化养护管理系统',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'bridgeoftencheck',
        component: bridgeoftencheck,
        name: '桥梁经常性检查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'bridgeregularcheck',
        component: bridgeregularcheck,
        name: '桥梁定期检查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'bridgeregularcomponent',
        component: bridgeregularcomponent,
        name: '桥梁定期检查组件',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'culvertoftencheck',
        component: culvertoftencheck,
        name: '涵洞经常检查列表',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'culvertregularcheck',
        component: culvertregularcheck,
        name: '涵洞定期检查列表',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'tunnelregularcheck',
        component: tunnelregularcheck,
        name: '隧道定期检查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'tunneloftencheck',
        component: tunneloftencheck,
        name: '隧道经常检查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'projectmanagement',
        component: projectmanagement,
        name: '项目管理',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'bitumenroaddamage',
        component: bitumenroaddamage,
        name: '沥青路面损坏调查表',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'roadbeddamagecheck',
        component: roadbeddamagecheck,
        name: '路基损坏调查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'sandstonedamage',
        component: sandstonedamage,
        name: '砂石路面损坏调查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'cementroaddamage',
        component: cementroaddamage,
        name: '水泥混凝土路面损坏调查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'bridgetunneldamage',
        component: bridgetunneldamage,
        name: '桥隧构造物损坏调查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'tcidamage',
        component: tcidamage,
        name: '沿路设施损坏调查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'roadevaluationdetail',
        component: roadevaluationdetail,
        name: '公路技术状况评定明细',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'roadevaluationsummary',
        component: roadevaluationsummary,
        name: '公路技术状况评定汇总',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'maintenancepatrol',
        component: maintenancepatrol,
        name: '养护巡查',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'projectlinkmanagement',
        component: projectlinkmanagement,
        name: '项目环节管理',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'patrolrecord',
        component: patrolrecord,
        name: '巡查日志',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'modulemanage',
        component: modulemanage,
        name: '模块管理',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'projectstoragelibrarymanagement',
        component: projectstoragelibrarymanagement,
        name: '项目储备库管理',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'physicalquantity',
        component: physicalquantity,
        name: '实物工程量表',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      },
      {
        path: 'scoretable',
        component: scoretable,
        name: '评分表',
        meta: {
          subSystemId: '5d32db3c0865475584f2327d6f5a1eff'
        }
      }
    ]
  }
];
