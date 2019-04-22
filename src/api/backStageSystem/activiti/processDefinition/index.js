import { postHttp } from '../../../util';
import prifix from '../../../../common/js/urlPrifix';
export default {
  /**
   * 获取树信息
   * @author   yekuncai
   * @date     2018/10/10
   */
  getTree: (obj) => postHttp(`${prifix.activiti}/sys/ac/processdefinition/getTree`, obj),

  /**
   * 新增类型节点
   * @author   yekuncai
   * @date     2018/10/10
   */
  addCategory: (obj) => postHttp(`${prifix.activiti}/sys/ac/processdefinition/add`, obj),

  /**
   * 保存类型节点
   * @author   yekuncai
   * @date     2018/10/10
   */
  saveCategory: (obj) => postHttp(`${prifix.activiti}/sys/ac/processdefinition/save`, obj),

  /**
   * 删除类型节点
   * @author   yekuncai
   * @date     2018/10/10
   */
  removeCategory: (obj) => postHttp(`${prifix.activiti}/sys/ac/processdefinition/remove`, obj),

  /**
   * 保存或更新
   * @author   yekuncai
   * @date     2018/10/10
   */
  save: (obj) => postHttp(`${prifix.activiti}/sys/ac/model/save`, obj),

  /**
   * 新增
   * @author   yekuncai
   * @date     2018/10/10
   */
  add: (obj) => postHttp(`${prifix.activiti}/sys/ac/model/add`, obj),

  /**
   * 编辑
   * @author   yekuncai
   * @date     2018/10/10
   */
  edit: (obj) => postHttp(`${prifix.activiti}/sys/ac/model/edit`, obj),

  /**
   * 查看
   * @author   yekuncai
   * @date     2018/10/10
   */
  show: (obj) => postHttp(`${prifix.activiti}/sys/ac/model/show`, obj),

  /**
   * 流程定义列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  listJson: (obj) => postHttp(`${prifix.activiti}/sys/ac/model/listJson`, obj),

  /**
   * 删除
   * @author   yekuncai
   * @date     2018/10/10
   */
  remove: (obj) => postHttp(`${prifix.activiti}/sys/ac/model/remove`, obj),

  /**
   * 部署
   * @author   yekuncai
   * @date     2018/10/10
   */
  deploy: (obj) => postHttp(`${prifix.activiti}/sys/ac/model/deploy`, obj)
};
