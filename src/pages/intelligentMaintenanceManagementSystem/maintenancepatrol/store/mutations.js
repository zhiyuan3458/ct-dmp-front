import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    if (data)
    {
      state.deptIds = data.deptIds;
      state.extraCondition = data;
    }
    state.readOnly = false;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.ADD] (state, data)
  {
    state.showWidth = false;
    state.formData = data.entity;
    state.listMaintenancePatrolSub = null;
    state.listMaintenanceRoadCases = null;
    state.listMaintenanceEvents = null;
    state.listMaintenanceSuddenlyEvents = null;
    state.listMaintenanceOtherEvents = null;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.ztreeSelect = data.ztreeSelect;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.showWidth = false;
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.listMaintenancePatrolSub = data.listMaintenancePatrolSub;
    state.listMaintenanceRoadCases = data.listMaintenanceRoadCases;
    state.listMaintenanceEvents = data.listMaintenanceEvents;
    state.listMaintenanceSuddenlyEvents = data.listMaintenanceSuddenlyEvents;
    state.listMaintenanceOtherEvents = data.listMaintenanceOtherEvents;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.ztreeSelect = data.ztreeSelect;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.SHOW] (state, data)
  {
    state.showWidth = true;
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.listMaintenancePatrolSub = data.listMaintenancePatrolSub;
    state.listMaintenanceRoadCases = data.listMaintenanceRoadCases;
    state.listMaintenanceEvents = data.listMaintenanceEvents;
    state.listMaintenanceSuddenlyEvents = data.listMaintenanceSuddenlyEvents;
    state.listMaintenanceOtherEvents = data.listMaintenanceOtherEvents;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.ztreeSelect = data.ztreeSelect;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.LISTJSON] (state, data)
  {
    state.tableList = {
      listData: data.data.tableList,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
      pages: data.pages
    };
    state.tableBtns = data.data.tableBtns;
    state.gridEntityInfo = data.data.gridEntityInfo;
    state.listGridColumnInfo = data.data.listGridColumnInfo;
    state.navigateMenus = data.data.navigateMenus;
    state.operateBtns = data.data.operateBtns;
  },
  [mutationType.SAVE] (state, data)
  {
    state.formData = data;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.REMOVE] (state, data)
  {
    state.formData = data;
    state.isAddEditShow = false;
    state.isListShow = true;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
  // ,
  // [mutationType.LIST_CULVERT] (state, data)
  // {
  //   state.listCulvertOftenRecord = data;
  // }
};

export default mutations;
