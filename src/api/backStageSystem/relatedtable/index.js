import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {
  /**
   * 关联表信息保存或更新
   * @author   chenguang
   * @date     2018/10/27
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtable/save`, obj),

  /**
   * 添加关联表
   * @author   chenguang
   * @date     2018/11/27
   * @return
   */
  add: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtable/add`, obj),

  /**
   * 编辑关联表
   * @author   chenguang
   * @date     2018/11/27
   * @return
   */
  edit: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtable/edit`, obj),

  /**
   * 移除关联表信息
   * @author   chenguang
   * @date     2018/11/27
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtable/remove`, obj),

  /**
   * 查看关联表详细信息
   * @author   chenguang
   * @date     2018/11/27
   */
  showDetail: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtabledetail/show`, obj),

  /**
   * 编辑关联表详细信息
   * @author   chenguang
   * @date     2018/11/27
   */
  editDetail: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtabledetail/edit`, obj),

  /**
   * 移除关联表详细信息
   * @author   chenguang
   * @date     2018/11/27
   */
  removeDetail: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtabledetail/remove`, obj),

  /**
   * 关联表详细信息保存或更新
   * @author   chenguang
   * @date     2018/10/27
   */
  saveDetail: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtabledetail/save`, obj),

  /**
   * 添加详细信息
   * @author   chenguang
   * @date     2018/11/27
   */
  addDetail: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtabledetail/add`, obj),

  /**
   * 获取列表信息
   * @author   chenguang
   * @date     2018/11/27
   */
  list: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtabledetail/listJson`, obj),

  /**
   * 获取关联表树
   * @author   chenguang
   * @date     2018/11/27
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/relatedtable/getTree`, obj)
};
