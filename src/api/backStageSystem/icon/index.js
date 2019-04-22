import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取图标树形信息
   * @author   chenminxin
   * @date     2018/10/2
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/icon/getTree`, obj),
  /**
   * 获取图标列表
   * @author   chenguang
   * @date     2018/10/4
   */
  listJson: (obj) => postHttp(`${prifix.backstage}/sys/bs/icon/listJson`, obj),
  /**
   * 重新生成图标
   * @author   lvzhiyuan
   * @date     2018/10/13
   */
  generateIcons: (obj) => postHttp(`${prifix.backstage}/sys/bs/icon/reGenerate`, obj)
};
