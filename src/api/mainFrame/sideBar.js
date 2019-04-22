import { getHttp, postHttp } from '../util';
import prifix from '@/common/js/urlPrifix';
/**
 * 根据子系统id获取该系统的菜单栏
 * @author lvzhiyuan
 * @date   2018/06/23
 * @param  id——子系统的id
 * @return promise对象——该子系统对应的所有菜单栏
 */
export const getMenus = (id) => getHttp(`${prifix.backstage}/sys/bs/menu/getMenus`, { parentId: id });

/**
 * 新增快捷方式
 * @author lvzhiyuan
 * @date   2018/08/08
 * @param  name——快捷方式的name
 * @param  path——快捷方式的path
 * @param  icon——快捷方式的icon
 * @return promise对象—— 返回添加成功
 */
export const addShortcut = (obj) => postHttp(`${prifix.backstage}/sys/bs/shortcut/save`, obj);
