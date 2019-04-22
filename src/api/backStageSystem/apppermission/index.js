import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {
  /**
   * 权限保存或更新
   * @author   chenguang
   * @date     2018/10/20
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/apppermission/save`, obj),

  /**
   * 获取权限树
   * @author   chenguang
   * @date     2018/10/18
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/apppermission/getTree`, obj)
};
