import { postHttp, getHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取部门树信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/dept/getTree`, obj),

  /**
   * 保存部门信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/dept/save`, obj),

  /**
   * 编辑部门信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  edit: (obj) => getHttp(`${prifix.backstage}/sys/bs/dept/edit`, obj),

  /**
   * 新增部门
   * @author   yekuncai
   * @date     2018/10/22
   */
  add: (obj) => getHttp(`${prifix.backstage}/sys/bs/dept/add`, obj),

  /**
   * 删除部门树信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/dept/remove`, obj)
};
