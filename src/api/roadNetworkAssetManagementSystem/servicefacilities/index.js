import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 公路服务设施index树组件数据
   * @author   liangyi
   * @date     2018/11/30
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/servicefacilities/getTree`, obj),

  /**
   * 新增公路服务设施
   * @author   liangyi
   * @date     2018/11/30
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/servicefacilities/add`, obj),

  /**
   * 编辑公路服务设施
   * @author   liangyi
   * @date     2018/11/30
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/servicefacilities/edit`, obj),

  /**
   * 查看公路服务设施
   * @author   liangyi
   * @date     2018/11/30
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/servicefacilities/show`, obj),

  /**
   * 获取机构下的公路服务设施列表
   * @author   liangyi
   * @date     2018/11/30
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/servicefacilities/listJson`, obj),

  /**
   * 保存公路服务设施
   * @author   liangyi
   * @date     2018/11/30
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/servicefacilities/save`, obj),

  /**
   * 删除信息
   * @author   liangyi
   * @date     2018/12/04
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/servicefacilities/remove`, obj)
};
