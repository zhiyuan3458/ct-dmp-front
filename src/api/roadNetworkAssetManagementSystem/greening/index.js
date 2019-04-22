import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 绿化信息index树组件数据
   * @author   liangyi
   * @date     2018/11/30
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/greening/getTree`, obj),

  /**
   * 新增绿化信息
   * @author   liangyi
   * @date     2018/11/30
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/greening/add`, obj),

  /**
   * 编辑绿化信息
   * @author   liangyi
   * @date     2018/11/30
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/greening/edit`, obj),

  /**
   * 查看绿化信息
   * @author   liangyi
   * @date     2018/11/30
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/greening/show`, obj),

  /**
   * 获取机构下的绿化信息列表
   * @author   liangyi
   * @date     2018/11/30
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/greening/listJson`, obj),

  /**
   * 保存绿化信息
   * @author   liangyi
   * @date     2018/11/30
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/greening/save`, obj),
  /**
   * 删除信息
   * @author   liangyi
   * @date     2018/12/04
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/greening/remove`, obj)
};
