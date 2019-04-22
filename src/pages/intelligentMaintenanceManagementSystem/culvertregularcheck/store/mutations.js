import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
    state.deptIds = data.deptIds;
    console.info(state.deptIds);
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
    state.formData = data.entity;
    state.isIndex = false;
    let data2 = '{"data":{"listCulvertRegularRecord":[{"culvertRegularCheckId":"","partNumber":"1","partName":"进水口","conditionDescription":"","repairAdvice":"","id":"","delFlag":"","sessionId":""},{"culvertRegularCheckId":"","partNumber":"2","partName":"出水口","conditionDescription":"","repairAdvice":"","id":"","delFlag":"","sessionId":""},{"culvertRegularCheckId":"","partNumber":"3","partName":"涵身两侧","conditionDescription":"","repairAdvice":"","id":"","delFlag":"","sessionId":""},{"culvertRegularCheckId":"","partNumber":"4","partName":"涵身顶部","conditionDescription":"","repairAdvice":"","id":"","delFlag":"","sessionId":""},{"culvertRegularCheckId":"","partNumber":"5","partName":"涵底铺砌","conditionDescription":"","repairAdvice":"","id":"","delFlag":"","sessionId":""},{"culvertRegularCheckId":"","partNumber":"6","partName":"涵附近填土","conditionDescription":"","repairAdvice":"","id":"","delFlag":"","sessionId":""}]}}';
    state.listCulvertRegularRecord = JSON.stringify(JSON.parse(data2).data.listCulvertRegularRecord);
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.ztreeSelect = data.ztreeSelect;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.btnShow = true;
    state.delBtnShow = true;
  },
  [mutationType.EDIT] (state, data)
  {
    state.isIndex = false;
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.listCulvertRegularRecord = data.listCulvertRegularRecord;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.ztreeSelect = data.ztreeSelect;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.btnShow = true;
    state.delBtnShow = true;
  },
  [mutationType.SHOW] (state, data)
  {
    state.isIndex = false;
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.listCulvertRegularRecord = data.listCulvertRegularRecord;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.ztreeSelect = data.ztreeSelect;
    state.isAddEditShow = true;
    state.isListShow = false;
    state.btnShow = false;
    state.delBtnShow = false;
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
  },
  [mutationType.LIST_CULVERT] (state, data)
  {
    state.listCulvertRegularRecord = data;
  }
};

export default mutations;
