import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {
  /**
   * 菜单保存或更新
   * @author   chenguang
   * @date     2018/10/4
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/appmenu/save`, obj),

  /**
   * 菜单新增
   * @author   chenguang
   * @date     2018/10/4
   */
  add: (obj) => postHttp(`${prifix.backstage}/sys/bs/appmenu/add`, obj),

  /**
   * 菜单编辑
   * @author   chenguang
   * @date     2018/11/2
   */
  edit: (obj) => postHttp(`${prifix.backstage}/sys/bs/appmenu/edit`, obj),

  /**
   * 获取菜单树
   * @author   chenguang
   * @date     2018/10/4
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/appmenu/getTree`, obj),

  /**
   * 删除菜单信息
   * @author   chenguang
   * @date     2018/10/6
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/appmenu/remove`, obj),

  /**
   * 根据name和code获取对于菜单实体的url
   * @author   yekuncai
   * @date     2018/12/7
   */
  getUrl: (obj) => postHttp(`${prifix.backstage}/sys/bs/appmenu/getUrl`, obj)
};
