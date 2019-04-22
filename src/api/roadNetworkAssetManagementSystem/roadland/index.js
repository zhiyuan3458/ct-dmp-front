import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 公路用地信息index树组件数据
   * @author   liangyi
   * @date     2018/12/25
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadland/getTree`, obj),

  /**
   * 新增公路用地信息
   * @author   liangyi
   * @date     2018/12/25
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadland/add`, obj),

  /**
   * 编辑公路用地信息
   * @author   liangyi
   * @date     2018/12/25
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadland/edit`, obj),

  /**
   * 查看公路用地信息
   * @author   liangyi
   * @date     2018/12/25
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadland/show`, obj),

  /**
   * 获取机构下的公路用地信息列表
   * @author   liangyi
   * @date     2018/12/25
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadland/listJson`, obj),

  /**
   * 保存公路用地信息
   * @author   liangyi
   * @date     2018/12/25
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadland/save`, obj),
  /**
   * 删除信息
   * @author   liangyi
   * @date     2018/12/25
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/sm/roadland/remove`, obj)
};
