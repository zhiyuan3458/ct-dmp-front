import { postHttp } from '../../../util';
import prifix from '../../../../common/js/urlPrifix';
export default {
  /**
   * 获取树形信息
   * @author   yekuncai
   * @date     2018/10/16
   */
  getTree: (obj) => postHttp(`${prifix.activiti}/sys/ac/starter/getTree`, obj),

  /**
   * 编辑启动者设置
   * @author   yekuncai
   * @date     2018/10/16
   */
  starterEdit: (obj) => postHttp(`${prifix.activiti}/sys/ac/starter/edit`, obj),

  /**
   * 保存启动者设置
   * @author   yekuncai
   * @date     2018/10/10
   */
  saveStarter: (obj) => postHttp(`${prifix.activiti}/sys/ac/starter/save`, obj),

  /**
   * 保存
   * @author   yekuncai
   * @date     2018/10/10
   */
  flowChart: (obj) => postHttp(`${prifix.activiti}/sys/ac/nodesetting/flowChart`, obj),

  /**
   * 编辑节点设置
   * @author   yekuncai
   * @date     2018/10/10
   */
  nodeEdit: (obj) => postHttp(`${prifix.activiti}/sys/ac/nodesetting/edit`, obj),

  /**
   * 编辑节点设置
   * @author   yekuncai
   * @date     2018/10/10
   */
  saveNodeEdit: (obj) => postHttp(`${prifix.activiti}/sys/ac/nodesetting/save`, obj),

  /**
   * 编辑节点高级属性
   * @author   yekuncai
   * @date     2018/10/10
   */
  nodeSeniorEdit: (obj) => postHttp(`${prifix.activiti}/sys/ac/nodesenior/edit`, obj),

  /**
   * 保存节点高级属性
   * @author   yekuncai
   * @date     2018/10/10
   */
  saveNodeSenior: (obj) => postHttp(`${prifix.activiti}/sys/ac/nodesenior/save`, obj),

  /**
   * 编辑高级属性设置
   * @author   yekuncai
   * @date     2018/10/10
   */
  seniorSettingEdit: (obj) => postHttp(`${prifix.activiti}/sys/ac/seniorsetting/edit`, obj),

  /**
   * 编辑高级属性设置
   * @author   yekuncai
   * @date     2018/10/10
   */
  saveSeniorSetting: (obj) => postHttp(`${prifix.activiti}/sys/ac/seniorsetting/save`, obj)
};
