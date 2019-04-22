import { postHttp } from '../../../util';
import prifix from '../../../../common/js/urlPrifix';
export default {

  /**
   * 获取树信息
   * @author   yekuncai
   * @date     2018/10/10
   */
  getTree: (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/getTree`, obj),

  /**
   * 新增
   * @author   yekuncai
   * @date     2018/10/10
   */
  add: (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/add`, obj),

  /**
   * 待办事项列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  listJson: (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/listJson`, obj),

  /**
   * 获取业务对应的路由地址
   * @author   yekuncai
   * @date     2018/10/10
   */
  getRouter: (obj) => postHttp(`${obj.action}`, obj),

  /**
   * 获取流程节点信息
   * @author   yekuncai
   * @date     2018/10/10
   */
  getInfo: (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/getinfo`, obj),

  /**
   * 获取代办按钮
   * @author   yekuncai
   * @date     2018/10/10
   */
  transfer: (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/transfer`, obj),

  /**
   * 保存代办
   * @author   yekuncai
   * @date     2018/10/10
   */
  save: (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/save`, obj)
};

/**
 * 打开流程表单
 * @author   yekuncai
 * @date     2018/10/10
 */
export const open = (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/open`, obj);

/**
 * 关闭流程表单
 * @author   yekuncai
 * @date     2018/10/10
 */
export const close = (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/close`, obj);

/**
 * 获取流程表单信息
 * @author   yekuncai
 * @date     2018/10/10
 */
export const getActivitiInfo = (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/getactivitiinfo`, obj);

/**
 * 审批
 * @author   yekuncai
 * @date     2019/1/28
 */
export const audit = (obj) => postHttp(`${prifix.activiti}/sys/ac/processcore/${obj.type}`, obj);

/**
 * 保存流程状态
 * @author   yekuncai
 * @date     2019/1/28
 */
export const saveStatus = (obj) => postHttp(`${obj.action}`, obj);

/**
 * 查看任务审批意见
 * @author   yekuncai
 * @date     2019/1/28
 */
export const getComments = (obj) => postHttp(`${prifix.activiti}/sys/ac/processcore/getComments`, obj);

/**
 * 获取相应子系统模块的流程定义列表
 * @author   yekuncai
 * @date     2019/1/28
 */
export const getDefList = (obj) => postHttp(`${prifix.activiti}/sys/ac/todotask/getDefList`, obj);
