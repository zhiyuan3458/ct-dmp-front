import { postHttp, getHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {
  /**
   * 获取数据字典树形信息
   * @author   chenguang
   * @date     2018/10/2
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/dictionary/getTree`, obj),

  /**
   * 数据字典查看
   * @author   chenguang
   * @date     2018/10/16
   */
  show: (obj) => getHttp(`${prifix.backstage}/sys/bs/dictionary/show`, obj),

  /**
   * 数据字典编辑
   * @author   chenguang
   * @date     2018/10/16
   */
  edit: (obj) => getHttp(`${prifix.backstage}/sys/bs/dictionary/edit`, obj),

  /**
   * 数据字典新增
   * @author   chenguang
   * @date     2018/10/2
   */
  add: (obj) => getHttp(`${prifix.backstage}/sys/bs/dictionary/add`, obj),

  /**
   *  数据字典列表获取
   * @author   chenguang
   * @date     2018/9/26
   * @return
   */
  listJson: (obj) => postHttp(`${prifix.backstage}/sys/bs/dictionary/listJson`, obj),

  /**
   * 数据字典保存或更新
   * @author   chenguang
   * @date     2018/10/2
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/dictionary/save`, obj),

  /**
   * 删除数据字典树信息
   * @author   chenguang
   * @date     2018/9/29
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/dictionary/remove`, obj)
};
