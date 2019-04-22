import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 获取树信息
   * @author   yekuncai
   * @date     2019/2/28
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/dt/materialconsumptionstatistics/getTree`, obj),

  /**
   * 编辑
   * @author   yekuncai
   * @date     2019/2/28
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/dt/materialconsumptionstatistics/edit`, obj)

};
