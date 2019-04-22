import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 桥梁卡片index树组件数据
   * @author   chenguang
   * @date     2018/11/16
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/bridge/getTree`, obj),

  /**
   * 新增桥梁
   * @author   chenguang
   * @date     2018/11/16
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/bridge/add`, obj),

  /**
   * 编辑桥梁卡片
   * @author   chenguang
   * @date     2018/11/16
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/bridge/edit`, obj),

  /**
   * 查看桥梁卡片
   * @author   chenguang
   * @date     2018/11/16
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/bridge/show`, obj),

  /**
   * 获取机构下的桥梁列表
   * @author   chenguang
   * @date     2018/11/16
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/bridge/listJson`, obj),

  /**
   * 保存桥梁卡片
   * @author   chenguang
   * @date     2018/11/16
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/bridge/save`, obj),

  /**
   * 移除桥梁卡片
   * @author   chenguang
   * @date     2018/11/16
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/bridge/remove`, obj)
};
