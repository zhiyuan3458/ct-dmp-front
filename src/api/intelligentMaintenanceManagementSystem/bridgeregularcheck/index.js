import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 桥梁定期检查index树组件数据
   * @author   liangyi
   * @date 2018/1/7
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeregularcheck/getTree`, obj),

  /**
   * 新增桥梁定期检查
   * @author   liangyi
   * @date     2018/1/7
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeregularcheck/add`, obj),

  /**
   * 编辑桥梁定期检查
   * @author   liangyi
   * @date     2018/1/7
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeregularcheck/edit`, obj),

  /**
   * 查看桥梁定期检查
   * @author   liangyi
   * @date     2018/1/7
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeregularcheck/show`, obj),

  /**
   * 获取机构下的桥梁定期检查
   * @author   liangyi
   * @date     2018/1/7
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeregularcheck/listJson`, obj),

  /**
   * 保存桥梁定期检查
   * @author   liangyi
   * @date     2018/1/7
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeregularcheck/save`, obj),
  /**
   * 删除桥梁定期检查
   * @author   liangyi
   * @date     2018/1/7
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/tm/bridgeregularcheck/remove`, obj)
};
