import { postHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';
export default {

  /**
   * 获取首页
   * @author   yekuncai
   * @date     2018/10/10
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/getTree`, obj),

  /**
   * 获取列表
   * @author   yekuncai
   * @date     2018/10/10
   */
  todoList: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/todolist`, obj),

  /**
   * 已读待办事项
   * @author   yekuncai
   * @date     2018/10/10
   */
  read: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/read`, obj),

  /**
   * 公告通知列表
   * @author   yekuncai
   * @date     2019/3/22
   */
  noticeList: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/noticeList`, obj),

  /**
   * 新增
   * @author   yekuncai
   * @date     2019/3/22
   */
  add: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/add`, obj),

  /**
   * 查看
   * @author   yekuncai
   * @date     2019/3/22
   */
  edit: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/edit`, obj),

  /**
   * 查看
   * @author   yekuncai
   * @date     2019/3/22
   */
  show: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/show`, obj),

  /**
   * 保存公告通知
   * @author   yekuncai
   * @date     2019/3/22
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/save`, obj),

  /**
   * 删除
   * @author   yekuncai
   * @date     2019/3/22
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/remove`, obj)

};
