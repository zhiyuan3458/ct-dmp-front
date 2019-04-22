import Vue from 'vue';
import Router from 'vue-router';
import MainFrame from '@/pages/mainFrame/mainFrame';
import Login from '@/pages/login';
import { roadMaintenanceSystemRouter } from './roadMaintenanceSystem';
import { tradeystemRouters } from './tradeSystem';
import { industryManagementServiceRouters } from '@/router/industryManagementServiceSystem';
import { intelligentMaintenanceManagementRouters } from '@/router/intelligentMaintenanceManagementSystem';
import { integrityPlanManagementRouters } from '@/router/integrityPlanManagementSystem';
import { roadNetworkAssetManagementRouters } from '@/router/roadNetworkAssetManagementSystem';
import { roadBusinessPortalRouters } from '@/router/roadBusinessPortalSystem';
import { backStageRouters } from './backStageSystem';
const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router);
const errorRoutes = [
  {
    path: '*',
    redirect: '/mainFrame/404'
  }
];
const routes = [
  {
    path: '/mainFrame',
    name: 'MainFrame',
    component: MainFrame,
    meta: {
      title: 'mainFrame'
    },
    children: [
      {
        path: '404',
        component: _import('errorPage/404')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'login'
    }
  }
].concat(roadMaintenanceSystemRouter, tradeystemRouters, backStageRouters, industryManagementServiceRouters, intelligentMaintenanceManagementRouters, integrityPlanManagementRouters, roadNetworkAssetManagementRouters, roadBusinessPortalRouters, errorRoutes);

export default new Router({
  mode: 'history',
  routes: routes
});
