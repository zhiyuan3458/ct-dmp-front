import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {

  /**
   * 获取树信息
   * @author   yekuncai
   * @date     2019/4/8
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/cascademanagement/getTree`, obj),

  /**
   * 待办事项列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  listJson: (obj) => postHttp(`${prifix.backstage}/sys/bs/cascademanagement/listJson`, obj),

  /**
   * 新增
   * @author   yekuncai
   * @date     2019/4/8
   */
  add: (obj) => postHttp(`${prifix.backstage}/sys/bs/cascademanagement/add`, obj),

  /**
   * 获取树的按钮，包括新增、编辑、删除
   * @author   yekuncai
   * @date     2019/4/8
   */
  getBtns: (obj) => postHttp(`${prifix.backstage}/sys/bs/cascademanagement/getBtns`, obj),

  /**
   * 保存或更新
   * @author   yekuncai
   * @date     2019/4/8
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/cascademanagement/save`, obj),

  /**
   * 编辑
   * @author   yekuncai
   * @date     2019/4/8
   */
  edit: (obj) => postHttp(`${prifix.backstage}/sys/bs/cascademanagement/edit`, obj),

  /**
   * 查看
   * @author   yekuncai
   * @date     2019/4/8
   */
  show: (obj) => postHttp(`${prifix.backstage}/sys/bs/cascademanagement/show`, obj),

  /**
   * 删除
   * @author   yekuncai
   * @date     2018/10/10
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/cascademanagement/remove`, obj)
};
