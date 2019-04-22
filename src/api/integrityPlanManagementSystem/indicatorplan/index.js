import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取年度、月度树信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  getTree: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/getTree`, obj),

  /**
   * 获取年度、月度树列表
   * @author   yekuncai
   * @date     2018/10/22
   */
  listJson: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/listJson`, obj),

  /**
   * 新增年度、月度指标
   * @author   yekuncai
   * @date     2018/10/22
   */
  add: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/add`, obj),

  /**
   * 编辑年度、月度指标
   * @author   yekuncai
   * @date     2018/10/22
   */
  edit: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/edit`, obj),

  /**
   * 查看年度、月度指标
   * @author   yekuncai
   * @date     2018/10/22
   */
  show: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/show`, obj),

  /**
   * 保存年度、月度指标
   * @author   yekuncai
   * @date     2018/10/22
   */
  save: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/save`, obj),

  /**
   * 删除年度、月度指标
   * @author   yekuncai
   * @date     2018/10/22
   */
  remove: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/remove`, obj),

  /**
   * 提交
   * @author   yekuncai
   * @date     2018/10/22
   */
  submit: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/submit`, obj),

  /**
   * 任务办理
   * @author   yekuncai
   * @date     2018/10/22
   */
  audit: (obj) => postHttp(`${prifix.plan}/pm/tm/indicatorplan/audit`, obj)
};
