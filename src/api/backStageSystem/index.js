import { postHttp } from '@/api/util';
import prifix from '../../common/js/urlPrifix';

/**
 * 获取首页每个echart的图表的信息
 * @author   lvzhiyuan
 * @date     2018/10/30
 * @api      getEchartData
 * @method   POST
 * @param    url——获取图表数据的url
 * @return   返回图表信息
 */
export const getEchartData = (url) => postHttp(prifix.backstage + url, {});

/**
 * 当图表被resize后保存resize后图表位置与大小
 * @author   lvzhiyuan
 * @date     2018/9/13
 * @api      getEchartsList
 * @method   GET
 * @return   Promise——图表的信息（包括位置，大小，数据的url和标题）
 */
export const resizeChart = (obj) => postHttp(`${prifix.backstage}/sys/bs/deskuser/pull`, obj);

/**
 * 当图表被拖拽后保存拖拽后图表位置与大小
 * @author   lvzhiyuan
 * @date     2018/9/13
 * @api      getEchartsList
 * @method   GET
 * @return   Promise——图表的信息（包括位置，大小，数据的url和标题）
 */
export const dragChart = (obj) => postHttp(`${prifix.backstage}/sys/bs/deskuser/drag`, obj);
