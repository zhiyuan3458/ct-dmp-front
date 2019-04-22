import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 沿路设施损坏调查index树组件数据
   * @author   liangyi
   * @date 2018/2/27
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/ta/tcidamage/getTree`, obj),

  /**
   * 新增沿路设施损坏调查
   * @author   liangyi
   * @date     2018/2/27
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/ta/tcidamage/add`, obj),

  /**
   * 编辑沿路设施损坏调查
   * @author   liangyi
   * @date     2018/2/27
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/ta/tcidamage/edit`, obj),

  /**
   * 查看沿路设施损坏调查
   * @author   liangyi
   * @date     2018/2/27
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/ta/tcidamage/show`, obj),

  /**
   * 获取机构下的沿路设施损坏调查
   * @author   liangyi
   * @date     2018/2/27
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/ta/tcidamage/listJson`, obj),

  /**
   * 保存沿路设施损坏调查
   * @author   liangyi
   * @date     2018/2/27
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/ta/tcidamage/save`, obj),
  /**
   * 删除沿路设施损坏调查
   * @author   liangyi
   * @date     2018/2/27
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/ta/tcidamage/remove`, obj)
};
