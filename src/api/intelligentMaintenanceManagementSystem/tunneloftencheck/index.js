import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取系统树列表
   * @author   gongjuncheng
   * @date     2019/1/3
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/tm/tunneloftencheck/getTree`, obj),

  /**
   * 获取工作台列表数据
   * @author   gongjuncheng
   * @date     2019/1/3
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/tm/tunneloftencheck/listJson`, obj),

  /**
   * 查看工作台信息
   * @author   gongjuncheng
   * @date     2019/1/3
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/tm/tunneloftencheck/show`, obj),

  /**
   * 工作台保存或更新
   * @author   gongjuncheng
   * @date     2019/1/3
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/tm/tunneloftencheck/save`, obj),

  /**
   * 工作台新增
   * @author   gongjuncheng
   * @date     2019/1/3
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/tm/tunneloftencheck/add`, obj),

  /**
   * 工作台编辑
   * @author   gongjuncheng
   * @date     2019/1/3
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/tm/tunneloftencheck/edit`, obj),

  /**
   * 删除工作台信息
   * @author   gongjuncheng
   * @date     2019/1/3
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/tm/tunneloftencheck/remove`, obj)
};
