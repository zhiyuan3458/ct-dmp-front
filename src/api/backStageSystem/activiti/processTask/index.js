import { postHttp } from '../../../util';
import prifix from '../../../../common/js/urlPrifix';
export default {
  /**
   * 获取流程管理树形信息
   * @author   yekuncai
   * @date     2018/10/16
   */
  getTree: (obj) => postHttp(`${prifix.activiti}/sys/ac/processinstance/getTree`, obj),

  /**
   * 查看
   * @author   yekuncai
   * @date     2018/10/16
   */
  show: (obj) => postHttp(`${prifix.activiti}/sys/ac/processtask/show`, obj),

  /**
   * 保存
   * @author   yekuncai
   * @date     2018/10/10
   */
  save: (obj) => postHttp(`${prifix.activiti}/sys/ac/processtask/save`, obj),

  /**
   * 流程任务列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  listJson: (obj) => postHttp(`${prifix.activiti}/sys/ac/processtask/listJson`, obj),

  /**
   * 单个流程实例的任务列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  showList: (obj) => postHttp(`${prifix.activiti}/sys/ac/processtask/showlist`, obj),

  /**
   * 取回
   * @author   yekuncai
   * @date     2018/10/10
   */
  retrieve: (obj) => postHttp(`${prifix.activiti}/sys/ac/processcore/retrieve`, obj)
};
