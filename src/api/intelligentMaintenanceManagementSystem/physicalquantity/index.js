import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 树
   * @author gongjuncheng
   * @date 2019/4/17
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/dt/physicalquantity/getTree`, obj),

  /**
   * 保存
   * @author gongjuncheng
   * @date 2019/4/17
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/dt/physicalquantity/save`, obj),

  /**
   * 修改
   * @author gongjuncheng
   * @date 2019/4/17
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/dt/physicalquantity/edit`, obj),

  /**
   * 增加
   * @author gongjuncheng
   * @date 2019/4/17
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/dt/physicalquantity/add`, obj),

  /**
   * 删除
   * @author gongjuncheng
   * @date 2019/4/17
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/dt/moduletree/remove`, obj)
};
