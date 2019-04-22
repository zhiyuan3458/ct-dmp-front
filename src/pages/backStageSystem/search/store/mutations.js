import mutationType from './mutation-type';
const mutations = {
  [mutationType.ADDEDIT] (state, data)
  {
    state.formData = data.entity;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.LISTJSON] (state, data)
  {
    let length = data.data.tableList.length;
    let pageSize = data.pageSize;
    let total = data.total;
    let pages = data.pages;
    if (pageSize > length)
    {
      total = length;
      pages = 1;
    }
    state.tableList = {
      listData: data.data.tableList,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: total,
      pages: pages
    };
    state.tableBtns = data.data.tableBtns;
    state.navigateMenus = data.data.navigateMenus;
    state.operateBtns = data.data.operateBtns;
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.indexList = data;
    state.search = data;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.SAVE_OR_UPDATE] (state, data)
  {
    state.saveOrUpdateValue = data.isRefreshTree;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  },
  [mutationType.RETURNfN] (state, data)
  {
    state.saveOrUpdateValue = data;
    state.isAddEditShow = data.isAddEditShow;
    state.isListShow = data.isListShow;
  },
  [mutationType.SEARCHTYPEBYINDEX] (state, data)
  {
    state.typeList = data.typeList;
    let length = data.tableList.length;
    let pageSize = data.tableList.pageSize;
    let total = data.tableList.total;
    let pages = data.tableList.pages;
    if (pageSize > length)
    {
      total = length;
      pages = 1;
    }
    state.tableList = {
      listData: data.tableList.data,
      pageNum: data.tableList.pageNum,
      pageSize: data.tableList.pageSize,
      total: total,
      pages: pages
    };
  },
  [mutationType.SEARCHDATA] (state, data)
  {
    let length = data.data.length;
    let pageSize = data.pageSize;
    let total = data.total;
    let pages = data.pages;
    if (pageSize > length)
    {
      total = length;
      pages = 1;
    }
    state.tableList = {
      listData: data.data,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: total,
      pages: pages
    };
  }
};

export default mutations;
