import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 公路规范标准树结构
   *@author chenxiang
   *@date  2018/12/26
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadstandard/getTree`, obj),

  /**
   *新增公路规范标准
   *@author chenxiang
   *@date  2018/12/26
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadstandard/add`, obj),

  /**
   *编辑公路规范标准
   *@author chenxiang
   *@date  2018/12/26
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadstandard/edit`, obj),

  /**
   *查看公路规范标准
   *@author chenxiang
   *@date  2018/12/26
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadstandard/show`, obj),

  /**
   *查询不同的类型的规范标准规范标准
   *@author chenxiang
   *@date  2018/12/26
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadstandard/listJson`, obj),

  /**
   *保存公路法律法规
   *@author chenxiang
   *@date  2018/12/26
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadstandard/save`, obj),
  /**
   *删除公路法律法规
   *@author chenxiang
   *@date  2018/12/26
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadstandard/remove`, obj)
};
