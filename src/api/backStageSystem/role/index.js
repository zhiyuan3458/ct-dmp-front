import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {
  /**
   * 角色保存或更新
   * @author   chenguang
   * @date     2018/10/1
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/role/save`, obj),

  /**
   * 角色新增
   * @author   chenguang
   * @date     2018/9/26
   * @param id 角色Id
   * @return
   */
  add: (obj) => postHttp(`${prifix.backstage}/sys/bs/role/add`, obj),

  /**
   * 角色编辑
   * @author   chenguang
   * @date     2018/11/6
   */
  edit: (obj) => postHttp(`${prifix.backstage}/sys/bs/role/edit`, obj),

  /**
   * 删除角色
   * @author   chenguang
   * @date     2018/11/6
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/role/remove`, obj),

  /**
   * 获取角色树
   * @author   chenguang
   * @date     2018/10/1
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/role/getTree`, obj),

  /**
   * 获取当前用户所在部门的角色树
   * @author   yekuncai
   * @date     2018/12/4
   */
  getRoleTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/role/getRoleTree`, obj)
};

/**
 * 获取当前用户所在部门的角色树
 * @author   yekuncai
 * @date     2018/12/4
 */
export const getRoleTree = (obj) => postHttp(`${prifix.backstage}/sys/bs/role/getRoleTree`, obj);
