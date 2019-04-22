import { postHttp, getHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取系统树列表
   * @author   liangyi
   * @date     2018/10/23
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/desk/getTree`, obj),

  /**
   * 获取工作台列表数据
   * @author   liangyi
   * @date     2018/10/23
   */
  listJson: (obj) => postHttp(`${prifix.backstage}/sys/bs/desk/listJson`, obj),

  /**
   * 查看工作台信息
   * @author   liangyi
   * @date     2018/10/23
   */
  show: (obj) => getHttp(`${prifix.backstage}/sys/bs/desk/show`, obj),

  /**
   * 工作台保存或更新
   * @author   liangyi
   * @date     2018/10/23
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/desk/save`, obj),

  /**
   * 工作台新增
   * @author   liangyi
   * @date     2018/10/23
   */
  add: (obj) => getHttp(`${prifix.backstage}/sys/bs/desk/add`, obj),

  /**
   * 工作台编辑
   * @author   liangyi
   * @date     2018/10/23
   */
  edit: (obj) => getHttp(`${prifix.backstage}/sys/bs/desk/edit`, obj),

  /**
   * 删除工作台信息
   * @author   liangyi
   * @date     2018/10/23
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/desk/remove`, obj)
};
