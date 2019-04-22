import { postHttp } from '../../util';
import prifix from '@/common/js/urlPrifix';

export default {
  /**
   * @Description:
   */
  getTree: (obj) => postHttp(`${prifix.maintenance}/mt/cm/maintenancepatrol/getTree`, obj),

  /**
   * @Description:
   */
  add: (obj) => postHttp(`${prifix.maintenance}/mt/cm/maintenancepatrol/add`, obj),

  /**
   * @Description:
   */
  edit: (obj) => postHttp(`${prifix.maintenance}/mt/cm/maintenancepatrol/edit`, obj),

  /**
   * @Description:
   */
  show: (obj) => postHttp(`${prifix.maintenance}/mt/cm/maintenancepatrol/show`, obj),

  /**
   * @Description:
   */
  listJson: (obj) => postHttp(`${prifix.maintenance}/mt/cm/maintenancepatrol/listJson`, obj),

  /**
   * @Description:
   */
  save: (obj) => postHttp(`${prifix.maintenance}/mt/cm/maintenancepatrol/save`, obj),

  /**
   * @Description:
   */
  remove: (obj) => postHttp(`${prifix.maintenance}/mt/cm/maintenancepatrol/remove`, obj)
};
