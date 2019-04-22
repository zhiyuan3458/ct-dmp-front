import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 获取项目环节管理index树组件数据
   * @author   yekuncai
   * @date     2019/3/13
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectlinkmanagement/getTree`, obj),

  /**
   * 新增
   * @author   yekuncai
   * @date     2019/3/13
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectlinkmanagement/add`, obj),

  /**
   * 编辑
   * @author   yekuncai
   * @date     2019/3/13
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectlinkmanagement/edit`, obj),

  /**
   * 保存
   * @author   yekuncai
   * @date     2019/3/13
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectlinkmanagement/save`, obj),

  /**
   * 删除
   * @author   yekuncai
   * @date     2019/3/13
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/pm/projectlinkmanagement/remove`, obj)

};
