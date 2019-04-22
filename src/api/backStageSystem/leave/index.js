import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {

  /**
   * 获取树信息
   * @author   yekuncai
   * @date     2018/10/10
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/getTree`, obj),

  /**
   * 保存或更新
   * @author   yekuncai
   * @date     2018/10/10
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/save`, obj),

  /**
   * 提交
   * @author   yekuncai
   * @date     2018/10/10
   */
  submit: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/submit`, obj),

  /**
   * 新增
   * @author   yekuncai
   * @date     2018/10/10
   */
  add: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/add`, obj),

  /**
   * 编辑
   * @author   yekuncai
   * @date     2018/10/10
   */
  edit: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/edit`, obj),

  /**
   * 查看
   * @author   yekuncai
   * @date     2018/10/10
   */
  show: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/show`, obj),

  /**
   * 待办事项列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  listJson: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/listJson`, obj),

  /**
   * 删除
   * @author   yekuncai
   * @date     2018/10/10
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/remove`, obj),

  /**
   * 任务办理
   * @author   yekuncai
   * @date     2018/10/10
   */
  audit: (obj) => postHttp(`${prifix.backstage}/sys/ac/leave/audit`, obj)
};
