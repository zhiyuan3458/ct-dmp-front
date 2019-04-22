import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 隧道卡片index树组件数据
   * @author   liangyi
   * @date     2018/11/30
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/tunnel/getTree`, obj),

  /**
   * 新增隧道
   * @author   liangyi
   * @date     2018/11/30
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/tunnel/add`, obj),

  /**
   * 编辑隧道卡片
   * @author   liangyi
   * @date     2018/11/30
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/tunnel/edit`, obj),

  /**
   * 查看隧道卡片
   * @author   liangyi
   * @date     2018/11/30
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/tunnel/show`, obj),

  /**
   * 获取机构下的隧道列表
   * @author   liangyi
   * @date     2018/11/30
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/tunnel/listJson`, obj),

  /**
   * 保存隧道卡片
   * @author   liangyi
   * @date     2018/11/30
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/tunnel/save`, obj),
  /**
   * 删除信息
   * @author   liangyi
   * @date     2018/12/04
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/tunnel/remove`, obj)
};
