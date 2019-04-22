import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 公路法律法规树结构
   *@author chenxiang
   *@date  2018/12/26
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadlaw/getTree`, obj),

  /**
   *新增公路法律法规
   *@author chenxiang
   *@date  2018/12/26
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadlaw/add`, obj),

  /**
   *编辑公路法律法规
   *@author chenxiang
   *@date  2018/12/26
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadlaw/edit`, obj),

  /**
   *查看公路法律法规
   *@author chenxiang
   *@date  2018/12/26
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadlaw/show`, obj),

  /**
   *查询不同的法律类型的法律法规
   *@author chenxiang
   *@date  2018/12/26
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadlaw/listJson`, obj),

  /**
   *保存公路法律法规
   *@author chenxiang
   *@date  2018/12/26
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadlaw/save`, obj),
  /**
   *删除公路法律法规
   *@author chenxiang
   *@date  2018/12/26
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadlaw/remove`, obj)
};
