import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取树
   * @author   yekuncai
   * @date     2019/3/15
   */
  getTree: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetax/getTree`, obj),

  /**
   * 获取列表
   * @author   yekuncai
   * @date     2019/3/15
   */
  listJson: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetax/listJson`, obj),

  /**
   * 新增
   * @author   yekuncai
   * @date     2019/3/15
   */
  add: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetax/add`, obj),

  /**
   * 编辑
   * @author   yekuncai
   * @date     2019/3/15
   */
  edit: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetax/edit`, obj),

  /**
   * 查看
   * @author   yekuncai
   * @date     2019/3/15
   */
  show: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetax/show`, obj),

  /**
   * 保存
   * @author   yekuncai
   * @date     2019/3/15
   */
  save: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetax/save`, obj),

  /**
   * 删除
   * @author   yekuncai
   * @date     2019/3/15
   */
  remove: (obj) => postHttp(`${prifix.plan}/pm/po/carpurchasetax/remove`, obj)

};
