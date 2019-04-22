/**
 * 链接前缀
 * @author   chenguang
 * @date     2018/10/31
 */
const backstagePrifix = '/api/backstage';
const authorityPrifix = '/api/authority';
const uploadPrifix = '/api/upload';
const activitiPrifix = '/api/activiti';
const elasticsearchPrifix = '/api/elasticsearch';
const roadnetworkPrifix = '/api/roadnetwork';
const filePrifix = '/file';
const bpmPrifix = '/bpm';
const maintenancePrifix = '/api/maintenance';
const planPrifix = '/api/plan';
export default {
  backstage: backstagePrifix, // 后台微服务
  authority: authorityPrifix, // 认证微服务
  upload: uploadPrifix, // 上传微服务
  activiti: activitiPrifix, // 工作流微服务
  elasticsearch: elasticsearchPrifix, // 全文检索微服务
  roadnetwork: roadnetworkPrifix, // 路网资产服务
  file: filePrifix, // 文件服务器
  bpm: bpmPrifix, // 流程图
  maintenance: maintenancePrifix, // 智能养护系统
  plan: planPrifix // 综合养护系统
};

export function getPreBySystemName (code)
{
  let result;
  switch (code)
  {
    case 'backStageSystem':
      result = backstagePrifix;
      break;
    case 'roadNetworkAssetManagementSystem':
      result = roadnetworkPrifix;
      break;
    case 'roadBusinessPortalSystem':
      result = '';
      break;
    case 'integrityPlanManagementSystem':
      result = planPrifix;
      break;
    case 'intelligentMaintenanceManagementSystem':
      result = maintenancePrifix;
      break;
    case 'industryManagementServiceSystem':
      result = '';
      break;
    default: result = '';
  }
  return result;
}
