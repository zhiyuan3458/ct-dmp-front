/* 获取子系统的相关信息 */
import { postHttp, getHttp } from '../util';
import prifix from '@/common/js/urlPrifix';
/**
 *
 * @author   lvzhiyuan
 * @date     2018/9/12
 * @api      getSubSystemInfo
 * @method   GET
 * @return   子系统信息
 */
export const getSubSystemInfo = () => postHttp(`${prifix.backstage}/sys/bs/menu/getSubsystems`, {});

/**
 * 获取所有的快捷方式信息
 * @author   lvzhiyuan
 * @date     2018/9/12
 * @api      getShortcutsList
 * @method   GET
 * @param    subsystemId——子系统的id
 * @return   promise对象——该子系统对应的快捷方式
 */
export const getShortcutsList = (subsystemId) => getHttp(`${prifix.backstage}/sys/bs/shortcut/listPersonalShortcut`, {subsystemId});

/**
 * 移除快捷方式
 * @author   chenguang
 * @date     2018/11/3
 */
export const deleteShortcuts = (menuId) => postHttp(`${prifix.backstage}/sys/bs/shortcut/remove`, {menuId});

/**
 * 拖拽时把快捷方式存入数据库
 * @author lvzhiyuan
 * @date   2018/08/12
 * @api    dragDrop
 * @param  carteId——子节点的id
 * @return promise对象——该子系统对应的快捷方式
 */
export const dragDrop = (ids) => postHttp(`${prifix.backstage}/sys/bs/shortcut/dragDrop?ids=${ids}`);
