import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 公路绿化index树组件数据
   * @author   liangyi
   * @date     2018/11/30
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/roadgreening/getTree`, obj),

  /**
   * 新增公路绿化
   * @author   liangyi
   * @date     2018/11/30
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/roadgreening/add`, obj),

  /**
   * 编辑公路绿化
   * @author   liangyi
   * @date     2018/11/30
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/roadgreening/edit`, obj),

  /**
   * 查看公路绿化
   * @author   liangyi
   * @date     2018/11/30
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/roadgreening/show`, obj),

  /**
   * 获取机构下的公路绿化列表
   * @author   liangyi
   * @date     2018/11/30
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/roadgreening/listJson`, obj),

  /**
   * 保存公路绿化
   * @author   liangyi
   * @date     2018/11/30
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/roadgreening/save`, obj),
  /**
   * 删除信息
   * @author   liangyi
   * @date     2018/12/04
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/roadgreening/remove`, obj)
};
