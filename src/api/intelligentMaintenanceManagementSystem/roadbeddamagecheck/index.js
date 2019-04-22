import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * @Description: 涵洞经常检查 index树组件数据
   * @author durenniu
   * @date 2019/1/7
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/ta/roadbeddamagecheck/getTree`, obj),
  /**
   * @Description: 查看路基损坏状况列表检查记录
   * @author durenniu
   * @date 2019/1/7
  */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/ta/roadbeddamagecheck/show`, obj),

  /**
   * @Description: 获取路基损坏状况检查列表
   * @author durenniu
   * @date 2019/1/7
  */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/ta/roadbeddamagecheck/listJson`, obj),

  /**
   * @Description: 保存路基损坏状况检查记录
   * @author durenniu
   * @date 2019/1/7
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/ta/roadbeddamagecheck/save`, obj)
};
