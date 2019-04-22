import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * @Description:
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/cm/patrolrecord/getTree`, obj),

  /**
   * @Description:
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/cm/patrolrecord/add`, obj),

  /**
   * @Description:
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/cm/patrolrecord/edit`, obj),

  /**
   * @Description:
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/cm/patrolrecord/show`, obj),

  /**
   * @Description:
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/cm/patrolrecord/listJson`, obj),

  /**
   * @Description:
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/cm/patrolrecord/save`, obj),

  /**
   * @Description:
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/cm/patrolrecord/remove`, obj)
};
