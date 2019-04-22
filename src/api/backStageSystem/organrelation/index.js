import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {
  /**
   * 权限保存或更新
   * @author   chenguang
   * @date     2018/12/7
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/organrelation/save`, obj),

  /**
   * 获取基础数据组织树数据
   * @author   chenguang
   * @date     2018/12/7
   */
  getOrganrelationTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/organrelation/getOrganrelationTree`, obj),

  /**
   * 获取基础数据组织部门树
   * @author   chenguang
   * @date     2018/12/7
   */
  getTree: () => postHttp(`${prifix.backstage}/sys/bs/organrelation/getTree`)
};
