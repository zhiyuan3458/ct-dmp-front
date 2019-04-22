import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 模板树
   * @author liangyi
   * @date 2019/3/19
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/dt/moduletree/getTree`, obj),

  /**
   * 保存模板
   * @author liangyi
   * @date 2019/3/19
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/dt/moduletree/save`, obj),

  /**
   * 编辑模板
   * @author liangyi
   * @date 2019/3/19
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/dt/moduletree/edit`, obj),

  /**
   * 新增模板
   * @author liangyi
   * @date 2019/3/19
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/dt/moduletree/add`, obj),

  /**
   * 删除
   * @author liangyi
   * @date 2019/3/19
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/dt/moduletree/remove`, obj),

  /**
   * 编辑模板详情
   * @author liangyi
   * @date 2019/4/15
   */
  editDetail: (obj) => postHttp(`${prifix.maintenance}/mt/dt/modulemanage/edit`, obj),

  /**
   * 保存模板
   * @author liangyi
   * @date 2019/4/15
   */
  saveDetail: (obj) => postHttp(`${prifix.maintenance}/mt/dt/modulemanage/save`, obj)
};
