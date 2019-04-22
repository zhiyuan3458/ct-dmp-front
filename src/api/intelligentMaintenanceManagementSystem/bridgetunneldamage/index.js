import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 桥隧构造物损坏调查index树组件数据
   * @author   yekuncai
   * @date     2019/2/28
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/ta/bridgetunneldamage/getTree`, obj),

  /**
   * 获取数据生成的桥隧构造物损坏调查列表
   * @author   yekuncai
   * @date     2019/2/28
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/ta/bridgetunneldamage/listJson`, obj),

  /**
   * 查看桥隧构造物损坏调查的详情
   * @author   yekuncai
   * @date     2019/2/28
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/ta/bridgetunneldamage/show`, obj)
};
