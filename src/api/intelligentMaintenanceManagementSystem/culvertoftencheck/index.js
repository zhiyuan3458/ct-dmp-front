import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * @Description: 涵洞经常检查 index树组件数据
   * @author durenniu
   * @date 2019/1/7
  */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertoftencheck/getTree`, obj),

  /**
   * @Description: 新增涵洞经常检查
   * @author durenniu
   * @date 2019/1/7
  */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertoftencheck/add`, obj),

  /**
   * @Description: 编辑涵洞经常检查记录
   * @author durenniu
   * @date 2019/1/7
  */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertoftencheck/edit`, obj),

  /**
   * @Description: 查看涵洞经常检查记录
   * @author durenniu
   * @date 2019/1/7
  */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertoftencheck/show`, obj),

  /**
   * @Description: 获取涵洞经常检查列表
   * @author durenniu
   * @date 2019/1/7
  */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertoftencheck/listJson`, obj),

  /**
   * @Description: 保存涵洞经常检查记录
   * @author durenniu
   * @date 2019/1/7
  */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertoftencheck/save`, obj),

  /**
   * @Description: 移除涵洞经常检查记录
   * @author durenniu
   * @date 2019/1/7
  */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertoftencheck/remove`, obj)
};
