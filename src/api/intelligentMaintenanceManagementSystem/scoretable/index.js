import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 项目管理信息index树组件数据
   * @author   liangyi
   * @date 2018/1/23
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretable/getTree`, obj),

  /**
   * 新增项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretable/add`, obj),

  /**
   * 编辑项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretable/edit`, obj),

  /**
   * 查看项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretable/show`, obj),

  /**
   * 获取项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretable/listJson`, obj),

  /**
   * 保存项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretable/save`, obj),
  /**
   * 删除项目管理信息
   * @author   liangyi
   * @date     2018/1/23
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretable/remove`, obj),
  /**
   * 项目管理信息右侧树组件数据
   * @author   liangyi
   * @date 2018/2/21
   */
  getRightTree: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretable/getRightTree`, obj),
  /**
   * 评分表右侧评分数据
   * @author   liangyi
   * @date 2019/4/19
   */
  editDetail: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretableitem/edit`, obj),
  /**
   * 评分表右侧评分数据保存
   * @author   liangyi
   * @date 2019/4/19
   */
  saveDetail: (obj) => postHttp(`${prifix.maintenance}/mt/dt/scoretableitem/save`, obj)
};
