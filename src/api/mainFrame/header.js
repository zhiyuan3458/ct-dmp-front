/* mainFrame/header API */
import request from '@/utils/request';
import { postHttp } from '@/api/util';
import prifix from '@/common/js/urlPrifix';

/**
 * 登出功能
 * @author   lvzhiyuan
 * @date     2018/8/22
 * @param    token——现在的token
 * @return   Promise对象
 */
export const logout = (token) => request.delete(`${prifix.authority}/sys/pe/accesstoken/logout`);

/**
 * 点击保存按钮保存图表顺序
 * @author   lvzhiyuan
 * @date     2018/8/22
 * @param    ids——带有id的数组
 * @return   Promise对象
 */
export const saveDeskSetting = ({ systemId, ids }) => postHttp(`${prifix.backstage}/sys/bs/deskuser/save`, { systemId, ids });

/**
 * 审批办理
 * @author   yekuncai
 * @date     2018/8/22
 * @return   待办事项列表
 */
export const audit = (obj) => postHttp(`${obj.action}`, obj);

/**
 * 获取公告通知和待办事项
 * @author   yekuncai
 * @date     2018/12/29
 */
export const getBulletin = (obj) => postHttp(`${prifix.backstage}/sys/bs/bulletin/listJson`, obj);

/**
 * 根据流程实例获取路由
 * @author   yekuncai
 * @date     2018/12/29
 */
export const getrouter = (obj) => postHttp(`${prifix.backstage}/sys/ac/flowbusiness/getrouter`, obj);
