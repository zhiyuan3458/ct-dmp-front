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
   * 查看流程实例
   * @author   yekuncai
   * @date     2018/10/10
   */
  show: (obj) => postHttp(`${prifix.activiti}/sys/ac/processinstance/show`, obj),

  /**
   * 流程实例列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  listJson: (obj) => postHttp(`${prifix.activiti}/sys/ac/processinstance/listJson`, obj)
};
