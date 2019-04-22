import { getHttp, postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {
  /**
   * 获取部门用户列表
   * @author   chenguang
   * @date     2018/10/4
   */
  listJson: (obj) => postHttp(`${prifix.backstage}/sys/bs/user/listJson`, obj),

  /**
   * 用户保存或更新
   * @author   yekuncai
   * @date     2018/10/22
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/user/save`, obj),

  /**
   * 新增用户
   * @author   yekuncai
   * @date     2018/10/22
   */
  add: (obj) => getHttp(`${prifix.backstage}/sys/bs/user/add`, obj),

  /**
   * 编辑用户
   * @author   yekuncai
   * @date     2018/10/22
   */
  edit: (obj) => getHttp(`${prifix.backstage}/sys/bs/user/edit`, obj),

  /**
   * 查看用户
   * @author   yekuncai
   * @date     2018/10/22
   */
  show: (obj) => getHttp(`${prifix.backstage}/sys/bs/user/show`, obj),

  /**
   * 删除用户
   * @author   yekuncai
   * @date     2018/10/22
   */
  remove: (obj) => getHttp(`${prifix.backstage}/sys/bs/user/remove`, obj),

  /**
   * 根据角色Id查询用户树
   * @author   chenguang
   * @date     2018/10/1
   * @param roleId 角色Id
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/user/getTree`, obj),

  /**
   * 重置密码
   * @author   chenguang
   * @date     2019/1/6
   */
  resetPwd: (obj) => postHttp(`${prifix.backstage}/sys/bs/user/resetPwd`, obj),

  /**
   * 修改密码
   * @author   chenguang
   * @date     2019/1/7
   */
  editPwd: (obj) => postHttp(`${prifix.backstage}/sys/bs/user/editPwd`, obj),

  /**
   * 上传用户头像
   * @author   chenguang
   * @date     2018/12/22
   */
  uploadAvator: (obj) => postHttp(`${prifix.upload}/sys/at/avator/upload`, obj),

  /**
   * 获取用户头像
   * @author   chenguang
   * @date     2018/12/22
   */
  getAvator: (obj) => postHttp(`${prifix.upload}/sys/at/avator/getAvator`, obj),

  /**
   * 根据当前用户id获取用户所在部门的所有用户
   * @author   chenguang
   * @date     2018/12/22
   */
  getUserTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/user/getUserTree`, obj)
};

/**
 * 根据当前用户id获取用户所在部门的所有用户
 * @author   yekuncai
 * @date     2018/12/4
 * @param roleId 角色Id
 */
export const getUserTree = (obj) => postHttp(`${prifix.backstage}/sys/bs/user/getUserTree`, obj);
