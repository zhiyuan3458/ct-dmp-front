import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * @Description: 涵洞定期检查 index树组件数据
   * @author durenniu
   * @date 2019/1/7
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertregularcheck/getTree`, obj),

  /**
   * @Description: 新增涵洞定期检查
   * @author durenniu
   * @date 2019/1/7
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertregularcheck/add`, obj),

  /**
   * @Description: 编辑涵洞定期检查记录
   * @author durenniu
   * @date 2019/1/7
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertregularcheck/edit`, obj),

  /**
   * @Description: 查看涵洞定期检查记录
   * @author durenniu
   * @date 2019/1/7
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertregularcheck/show`, obj),

  /**
   * @Description: 获取涵洞定期检查列表
   * @author durenniu
   * @date 2019/1/7
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertregularcheck/listJson`, obj),

  /**
   * @Description: 保存涵洞定期检查记录
   * @author durenniu
   * @date 2019/1/7
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertregularcheck/save`, obj),

  /**
   * @Description: 移除涵洞定期检查记录
   * @author durenniu
   * @date 2019/1/7
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/tm/culvertregularcheck/remove`, obj)
};
