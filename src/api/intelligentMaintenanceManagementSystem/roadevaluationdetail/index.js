import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 公路技术状况评定明细index树组件数据
   * @author   yekuncai
   * @date     2019/2/28
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/ta/roadevaluationdetail/getTree`, obj),

  /**
   * 获取数据生成的公路技术状况评定明细列表
   * @author   yekuncai
   * @date     2019/2/28
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/ta/roadevaluationdetail/listJson`, obj)

};
