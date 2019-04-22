import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 砂石路面损坏调查index树组件数据
   * @author   chenxiang
   * @date 2018/1/7
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/ta/sandstonedamage/getTree`, obj),

  /**
   * 新增砂石路面损坏调查
   * @author   chenxiang
   * @date     2018/1/7
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/ta/sandstonedamage/add`, obj),

  /**
   * 编辑砂石路面损坏调查
   * @author   chenxiang
   * @date     2018/1/7
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/ta/sandstonedamage/edit`, obj),

  /**
   * 查看砂石路面损坏调查
   * @author   chenxiang
   * @date     2018/1/7
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/ta/sandstonedamage/show`, obj),

  /**
   * 获取机构下的砂石路面损坏调查
   * @author   chenxiang
   * @date     2018/1/7
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/ta/sandstonedamage/listJson`, obj),

  /**
   * 保存砂石路面损坏调查
   * @author   chenxiang
   * @date     2018/1/7
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/ta/sandstonedamage/save`, obj),
  /**
   * 删除砂石路面损坏调查
   * @author   chenxiang
   * @date     2018/1/7
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/ta/sandstonedamage/remove`, obj)
};
