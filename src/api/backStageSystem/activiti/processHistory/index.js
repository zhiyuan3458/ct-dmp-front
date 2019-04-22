import { postHttp } from '../../../util';
import prifix from '../../../../common/js/urlPrifix';
export default {
  /**
   * 获取流程管理树形信息
   * @author   yekuncai
   * @date     2018/10/16
   */
  getTree: (obj) => postHttp(`${prifix.activiti}/sys/ac/processhistory/getTree`, obj),

  /**
   * 流程历史列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  listJson: (obj) => postHttp(`${prifix.activiti}/sys/ac/processhistory/listJson`, obj)
};

/**
 * 删除
 * @author   yekuncai
 * @date     2018/10/10
 */
export const remove = (obj) => postHttp(`${obj.url}`, obj);
