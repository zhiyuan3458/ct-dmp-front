import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取树
   * @author   yekuncai
   * @date     2019/3/15
   */
  getTree: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetaxmanagement/getTree`, obj),

  /**
   * 新增
   * @author   yekuncai
   * @date     2019/3/15
   */
  add: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetaxmanagement/add`, obj),

  /**
   * 编辑
   * @author   yekuncai
   * @date     2019/3/15
   */
  edit: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetaxmanagement/edit`, obj),

  /**
   * 保存
   * @author   yekuncai
   * @date     2019/3/15
   */
  save: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetaxmanagement/save`, obj),

  /**
   * 删除
   * @author   yekuncai
   * @date     2019/3/15
   */
  remove: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetaxmanagement/remove`, obj)

};
