import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 项目管理信息index树组件数据
   * @author   liangyi
   * @date 2018/1/23
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectmanagement/getTree`, obj),

  /**
   * 新增项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectmanagement/add`, obj),

  /**
   * 编辑项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectmanagement/edit`, obj),

  /**
   * 查看项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectmanagement/show`, obj),

  /**
   * 获取项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectmanagement/listJson`, obj),

  /**
   * 保存项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectmanagement/save`, obj),
  /**
   * 删除项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectmanagement/remove`, obj),
  /**
   * 项目管理信息右侧树组件数据
   * @author   liangyi
   * @date 2018/2/21
   */
  getRightTree: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectmanagement/getRightTree`, obj)
};
