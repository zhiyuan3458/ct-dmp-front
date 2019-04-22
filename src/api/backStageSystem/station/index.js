import { postHttp, getHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {

  /**
   * 获取树信息
   * @author   yekuncai
   * @date     2018/10/30
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/station/getTree`, obj),

  /**
   * 获取系统标题
   * @author   yekuncai
   * @date     2018/10/30
   */
  getStation: (obj) => getHttp(`${prifix.backstage}/sys/bs/station/getstation`, obj),

  /**
   * 编辑
   * @author   yekuncai
   * @date     2018/10/30
   */
  edit: (obj) => getHttp(`${prifix.backstage}/sys/bs/station/edit`, obj),

  /**
   * 保存
   * @author   yekuncai
   * @date     2018/10/30
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/station/save`, obj)
};
