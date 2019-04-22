import { getHttp, postHttp } from '../util';
import prifix from '@/common/js/urlPrifix';

/**
 * 获取页面组件上方的导航栏与按钮栏
 * @author   chenguang
 * @date     2018/9/26
 * @return
 */
export const getNavAndRightBtn = (obj) => getHttp(`${prifix.backstage}/sys/bs/menu/getNavAndRightBtn`, obj);

/**
 * 获取对应子系统的echart图（每个子系统的首页）
 * @author   lvzhiyuan
 * @date     2018/10/25
 * @api      getEcharts
 * @method   POST
 * @param    systemId——子系统的id
 * @return   返回echart图表
 */
export const getEcharts = (systemId) => postHttp(`${prifix.backstage}/sys/bs/desk/listDeskModel`, { systemId });

/**
 * 获取数据字典的特定数据（select，radio， checkbox的数据）
 * @author   lvzhiyuan
 * @date     2018/11/28
 * @api      getDictionaryData
 * @method   POST
 * @param    value——传过来的参数
 * @return   options
 */
export const getDictionaryData = (value) => postHttp(`${prifix.backstage}/sys/bs/dictionary/getDictionaryData`, { value });

/**
 * 获取子表的特定数据
 * @author   lvzhiyuan
 * @date     2018/11/30
 * @api      getBridgeData
 * @method   POST
 * @param    value——传过来的参数
 * @return   options
 */
export const getBridgeData = (relatedTableCode) => postHttp(`${prifix.backstage}/sys/bs/relatedtabledetail/getDetailData`, { relatedTableCode });

/**
 * 根据部门id获取部门信息
 * @author   chenguang
 * @date     2018/12/27
 * @param deptIds-部门id(可有多个)
 * @return
 */
export const getDepts = (deptIds) => postHttp(`${prifix.backstage}/sys/bs/dept/getDepts`, { deptIds });

/**
 * 根据角色id获取角色信息
 * @author   chenguang
 * @date     2018/12/28
 * @param roleIds-角色id(可有多个)
 * @return
 */
export const getRoles = (roleIds) => postHttp(`${prifix.backstage}/sys/bs/role/getRoles`, { roleIds });

/**
 * 获取桥梁相关图像
 * @author   chenguang
 * @date     2019/1/22
 */
export const getBridgeView = (sessionId) => postHttp(`${prifix.upload}/sys/at/attachment/getBridgeView`, { sessionId });

/**
 * 获取机构下所有桥梁列表
 * @author   chenguang
 * @date     2018/11/16
 */
export const getBridgeInfo = () => postHttp(`${prifix.roadnetwork}/rn/bd/bridge/findAll`);

/**
 * 获取机构下所有隧道列表
 * @author   chenguang
 * @date     2018/11/16
 */
export const getTunnelInfo = () => postHttp(`${prifix.roadnetwork}/rn/bd/tunnel/findAll`);

/**
 * 获取机构下所有部门列表
 * @author   chenguang
 * @date     2018/11/16
 */
export const getDeptInfo = () => postHttp(`${prifix.backstage}/sys/bs/dept/findAll`);

/**
 * 获取相关图像
 * @author   chenguang
 * @date     2019/1/22
 */
export const getView = (sessionId) => postHttp(`${prifix.upload}/sys/at/attachment/getView`, { sessionId });

/**
 * 获取机构下所有信息列表
 * @author   chenguang
 * @date     2018/11/16
 */
export const getFacilityInfo = () => postHttp(`${prifix.backstage}/sys/bs/facilitymanage/getTree`);
