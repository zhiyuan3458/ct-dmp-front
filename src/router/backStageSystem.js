/* 后台管理系统的路由 */
/* 主框，永远不变 */
import MainFrame from '@/pages/mainFrame/mainFrame.vue';
const _import = require('./_import_' + process.env.NODE_ENV);

const index = _import('backStageSystem/index');
const role = _import('backStageSystem/role/rightPanel');
const dictionary = _import('backStageSystem/dictionary/rightPanel');
const user = _import('backStageSystem/user/rightPanel');
const menu = _import('backStageSystem/menu/rightPanel');
const dept = _import('backStageSystem/dept/rightPanel');
const icon = _import('backStageSystem/icon/rightPanel');
const search = _import('backStageSystem/search/rightPanel');
const permission = _import('backStageSystem/permission/rightPanel');
const relatedtable = _import('backStageSystem/relatedtable/rightPanel');
const processdefinition = _import('backStageSystem/activiti/processDefinition/rightPanel');
const processhistory = _import('backStageSystem/activiti/processHistory/rightPanel');
const processinstance = _import('backStageSystem/activiti/processInstance/rightPanel');
const processtask = _import('backStageSystem/activiti/processTask/rightPanel');
const todoTask = _import('backStageSystem/activiti/todoTask/rightPanel');
const extension = _import('backStageSystem/activiti/extension/rightPanel');
const station = _import('backStageSystem/station/rightPanel');
const desk = _import('backStageSystem/desk/rightPanel');
const leave = _import('backStageSystem/leave/rightPanel');
const notice = _import('backStageSystem/notice/rightPanel');
const organrelation = _import('backStageSystem/organrelation/rightPanel');
const facilitymanage = _import('backStageSystem/facilitymanage/rightPanel');
const appmenu = _import('backStageSystem/appmenu/rightPanel');
const apppermission = _import('backStageSystem/apppermission/rightPanel');
const cascademanagement = _import('backStageSystem/cascademanagement/rightPanel');
const weatherforecast = _import('backStageSystem/weatherforecast/rightPanel');
export const backStageRouters = [
  {
    path: '/backStageSystem',
    component: MainFrame,
    redirect: '/backStageSystem/index',
    children: [
      {
        path: 'index',
        component: index,
        name: '后台管理系统首页',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'role',
        component: role,
        name: '角色管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'dictionary',
        component: dictionary,
        name: '数据字典',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'users',
        component: user,
        name: '用户管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'menu',
        component: menu,
        name: '菜单管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'dept',
        component: dept,
        name: '部门管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'icon',
        component: icon,
        name: '图标管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'search',
        component: search,
        name: '全文检索',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'permission',
        component: permission,
        name: '功能权限管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'relatedtable',
        component: relatedtable,
        name: '关联表管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'processdefinition',
        component: processdefinition,
        name: '流程定义',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'processhistory',
        component: processhistory,
        name: '流程历史',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'processinstance',
        component: processinstance,
        name: '流程实例',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'processtask',
        component: processtask,
        name: '流程任务',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'todoTask',
        component: todoTask,
        name: '待办事项',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'extension',
        component: extension,
        name: '工作流扩展',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'desk',
        component: desk,
        name: '工作台',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'station',
        component: station,
        name: '系统标题管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'leave',
        component: leave,
        name: '测试',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'notice',
        component: notice,
        name: '测试1',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'organrelation',
        component: organrelation,
        name: '基础数据组织',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'facilitymanage',
        component: facilitymanage,
        name: '公路设施管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'appmenu',
        component: appmenu,
        name: 'app菜单管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'apppermission',
        component: apppermission,
        name: 'app权限管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'cascademanagement',
        component: cascademanagement,
        name: '级联管理',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      },
      {
        path: 'weatherforecast',
        component: weatherforecast,
        name: '天气预报',
        meta: {
          subSystemId: '4081a8ee65d630e20165d632603a0000'
        }
      }
    ]
  }
];
