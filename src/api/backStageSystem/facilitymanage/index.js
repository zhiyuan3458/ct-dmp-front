import { postHttp, getHttp } from '../../util';
import prifix from '../../../common/js/urlPrifix';

export default {
  /**
   * 获取公路设施管理树信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  getTree: (obj) => postHttp(`${prifix.backstage}/sys/bs/facilitymanage/getTree`, obj),

  /**
   * 保存公路设施管理信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  save: (obj) => postHttp(`${prifix.backstage}/sys/bs/facilitymanage/save`, obj),

  /**
   * 编辑公路设施管理信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  edit: (obj) => getHttp(`${prifix.backstage}/sys/bs/facilitymanage/edit`, obj),

  /**
   * 新增公路设施管理
   * @author   yekuncai
   * @date     2018/10/22
   */
  add: (obj) => getHttp(`${prifix.backstage}/sys/bs/facilitymanage/add`, obj),

  /**
   * 删除公路设施管理树信息
   * @author   yekuncai
   * @date     2018/10/22
   */
  remove: (obj) => postHttp(`${prifix.backstage}/sys/bs/facilitymanage/remove`, obj)
};
