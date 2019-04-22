import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 桥梁经常检查index树组件数据
   * @author   liangyi
   * @date 2018/1/7
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeoftencheck/getTree`, obj),

  /**
   * 新增桥梁经常检查
   * @author   liangyi
   * @date     2018/1/7
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeoftencheck/add`, obj),

  /**
   * 编辑桥梁经常检查
   * @author   liangyi
   * @date     2018/1/7
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeoftencheck/edit`, obj),

  /**
   * 查看桥梁经常检查
   * @author   liangyi
   * @date     2018/1/7
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeoftencheck/show`, obj),

  /**
   * 获取机构下的桥梁经常检查
   * @author   liangyi
   * @date     2018/1/7
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeoftencheck/listJson`, obj),

  /**
   * 保存桥梁经常检查
   * @author   liangyi
   * @date     2018/1/7
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeoftencheck/save`, obj),
  /**
   * 删除桥梁经常检查
   * @author   liangyi
   * @date     2018/1/7
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeoftencheck/remove`, obj)
};
