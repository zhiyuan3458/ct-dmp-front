import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {

  /**
   * 获取树信息
   * @author   yekuncai
   * @date     2019/4/9
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/weathercurrent/getTree`, obj),

  /**
   * 当天天气数据列表
   * @author   yekuncai
   * @date     2019/4/9
   */
  currentList: (obj) => postHttp(`${prifix.backstage}/sys/bs/weathercurrent/currentList`, obj),

  /**
   * 历史天气数据列表
   * @author   yekuncai
   * @date     2019/4/9
   */
  historyList: (obj) => postHttp(`${prifix.backstage}/sys/bs/weathercurrent/historyList`, obj),

  /**
   * 当天天气数据查看
   * @author   yekuncai
   * @date     2019/4/9
   */
  currentShow: (obj) => postHttp(`${prifix.backstage}/sys/bs/weathercurrent/show`, obj),

  /**
   * 未来6天天气数据列表
   * @author   yekuncai
   * @date     2019/4/9
   */
  futureList: (obj) => postHttp(`${prifix.backstage}/sys/bs/weatherfuture/listJson`, obj),

  /**
   * 未来6天天气数据查看
   * @author   yekuncai
   * @date     2019/4/9
   */
  futureShow: (obj) => postHttp(`${prifix.backstage}/sys/bs/weatherfuture/show`, obj)

};
