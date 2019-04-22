import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取细目管理树信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  getTree: (obj) => postHttp(`${prifix.plan}/pm/tm/indicator/getTree`, obj),

  /**
   * 获取细目管理列表
   * @author   yekuncai
   * @date     2018/10/22
   */
  listJson: (obj) => postHttp(`${prifix.plan}/pm/tm/indicator/listJson`, obj),

  /**
   * 新增细目管理
   * @author   yekuncai
   * @date     2018/10/22
   */
  add: (obj) => postHttp(`${prifix.plan}/pm/tm/indicator/add`, obj),

  /**
   * 编辑细目管理
   * @author   yekuncai
   * @date     2018/10/22
   */
  edit: (obj) => postHttp(`${prifix.plan}/pm/tm/indicator/edit`, obj),

  /**
   * 编辑细目管理
   * @author   yekuncai
   * @date     2018/10/22
   */
  detail: (obj) => postHttp(`${prifix.plan}/pm/tm/indicator/detail`, obj),

  /**
   * 查看细目管理
   * @author   yekuncai
   * @date     2018/10/22
   */
  show: (obj) => postHttp(`${prifix.plan}/pm/tm/indicator/show`, obj),

  /**
   * 保存细目管理
   * @author   yekuncai
   * @date     2018/10/22
   */
  save: (obj) => postHttp(`${prifix.plan}/pm/tm/indicator/save`, obj),

  /**
   * 删除细目管理
   * @author   yekuncai
   * @date     2018/10/22
   */
  remove: (obj) => postHttp(`${prifix.plan}/pm/tm/indicator/remove`, obj)
};
