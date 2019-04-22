import {postHttp} from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {

  /**
   * 加载树结构
   * @author chenxiang
   * @date 2018/12/5
   */
  getTree: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/observatory/getTree`, obj),

  /**
   * 新增交通量观测站
   * @author chenxiang
   * @date 2018/12/5
   */
  add: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/observatory/add`, obj),

  /**
   * 编辑交通量观测站
   * @author chenxiang
   * @date 2018/12/5
   */
  edit: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/observatory/edit`, obj),

  /**
   * 查看交通量观测站
   * @author chenxiang
   * @date 2018/12/5
   */
  show: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/observatory/show`, obj),

  /**
   * 获取机构下的列表信息
   * @author chenxiang
   * @date 2018/12/5
   */
  listJson: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/observatory/listJson`, obj),

  /**
   * 保存信息
   * @author chenxiang
   * @date  2018/12/5
   */
  save: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/observatory/save`, obj),

  /**
   * 删除信息
   * @author chenxiang
   * @date 2018/12/5
   */
  remove: (obj) => postHttp(`${prifix.roadnetwork}/rn/bd/observatory/remove`, obj)
};
