import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * 沥青路面损坏调查表index树组件数据
   * @author   zhoujun
   * @date 2019/1/23
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/ta/bitumenroaddamage/getTree`, obj),

  /**
   * 获取数据生成的沥青路面损坏调查列表
   * @author   zhoujun
   * @date     2019/1/23
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/ta/bitumenroaddamage/listJson`, obj),

  /**
   * 查看沥青路面损坏调查表的详情
   * @author   zhoujun
   * @date     2019/1/28
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/ta/bitumenroaddamage/show`, obj)
};
