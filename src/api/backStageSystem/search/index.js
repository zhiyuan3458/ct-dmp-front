import { postHttp } from '../../util';
const baseUrl = '/base';
export default {
  /**
   * 保存或更新
   * @author   yekuncai
   * @date     2018/10/10
   */
  saveOrUpdate: (obj) => postHttp(`${baseUrl}/sys/search/saveOrUpdate`, obj),

  /**
   * 任务办理
   * @author   yekuncai
   * @date     2018/10/10
   */
  addEdit: (obj) => postHttp(`${baseUrl}/sys/search/addEdit`, obj),

  /**
   * 获取所有的index
   * @author   yekuncai
   * @date     2018/10/12
   */
  getAllIndex: (obj) => postHttp(`${baseUrl}/sys/search/getAllIndex`, obj),

  /**
   * 根据索引获取对应的type
   * @author   yekuncai
   * @date     2018/10/12
   */
  searchTypeByIndex: (obj) => postHttp(`${baseUrl}/sys/search/searchTypeByIndex`, obj),

  /**
   * 搜索文档数据
   * @author   yekuncai
   * @date     2018/10/12
   */
  searchData: (obj) => postHttp(`${baseUrl}/sys/search/searchData`, obj),

  /**
   * 全文检索列表获取
   * @author   yekuncai
   * @date     2018/10/10
   */
  listJson: (obj) => postHttp(`${baseUrl}/sys/search/listJson`, obj),

  /**
   * 删除
   * @author   yekuncai
   * @date     2018/10/10
   */
  remove: (obj) => postHttp(`${baseUrl}/sys/search/remove`, obj)
};
