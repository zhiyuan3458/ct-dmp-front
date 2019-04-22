import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 涵洞卡片index树组件数据
   * @author   liangyi
   * @date     2018/11/30
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/culvert/getTree`, obj),

  /**
   * 新增涵洞
   * @author   liangyi
   * @date     2018/11/30
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/culvert/add`, obj),

  /**
   * 编辑涵洞卡片
   * @author   liangyi
   * @date     2018/11/30
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/culvert/edit`, obj),

  /**
   * 查看涵洞卡片
   * @author   liangyi
   * @date     2018/11/30
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/culvert/show`, obj),

  /**
   * 获取机构下的涵洞列表
   * @author   liangyi
   * @date     2018/11/30
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/culvert/listJson`, obj),

  /**
   * 保存涵洞卡片
   * @author   liangyi
   * @date     2018/11/30
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/culvert/save`, obj),

  /**
   * 删除信息
   * @author   liangyi
   * @date     2018/12/04
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/culvert/remove`, obj)
};
