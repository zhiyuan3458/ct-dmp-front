import mutationType from './mutation-type';
const mutations = {
  [mutationType.GET_TREE] (state, data)
  {
  },
  [mutationType.SHOW_LIST] (state, data)
  {
    state.formData = {};
    state.carPurchaseTax = data;
    state.carPurchaseTaxSub = '';
    state.editParams = {};
    state.readOnly = false;
    state.isAddEditShow = false;
    state.isListShow = true;
    state.isRefreshList = !state.isRefreshList;
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
  [mutationType.ADD] (state, data)
  {
    state.formData = data.entity;
    state.investmentStatusSub = data.investmentStatusSub;
    state.formDataParams.distressAreaList = data.distressAreaList.ztreeList;
    state.formDataParams.yesNo = data.yesNo.ztreeList;
    state.formDataParams.buildPropertyList = data.buildPropertyList.ztreeList;
    state.formDataParams.feeAttributeList = data.feeAttributeList.ztreeList;
    state.formDataParams.planCategoryList = data.planCategoryList;
    state.formDataParams.sourcesList = data.sourcesList;
    state.formDataParams.routePropertyList = data.routePropertyList.ztreeList;
    state.formDataParams.cityAndCountyList = data.cityAndCountyList;
    state.formDataParams.startYear = data.startYear;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.EDIT] (state, data)
  {
    state.formData = data.entity;
    state.editParams = data.entity;
    state.formDataParams.distressAreaList = data.distressAreaList.ztreeList;
    state.formDataParams.yesNo = data.yesNo.ztreeList;
    state.formDataParams.buildPropertyList = data.buildPropertyList.ztreeList;
    state.formDataParams.feeAttributeList = data.feeAttributeList.ztreeList;
    state.formDataParams.planCategoryList = data.planCategoryList;
    state.formDataParams.sourcesList = data.sourcesList;
    state.formDataParams.routePropertyList = data.routePropertyList.ztreeList;
    state.formDataParams.cityAndCountyList = data.cityAndCountyList;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.investmentStatusSub = data.investmentStatusSub;
    state.suggestedPlanSub = data.suggestedPlanSub;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.SHOW] (state, data)
  {
    state.formData = data.entity;
    state.editParams = data.entity;
    state.formDataParams.distressAreaList = data.distressAreaList.ztreeList;
    state.formDataParams.yesNo = data.yesNo.ztreeList;
    state.formDataParams.buildPropertyList = data.buildPropertyList.ztreeList;
    state.formDataParams.feeAttributeList = data.feeAttributeList.ztreeList;
    state.formDataParams.planCategoryList = data.planCategoryList;
    state.formDataParams.sourcesList = data.sourcesList;
    state.formDataParams.routePropertyList = data.routePropertyList.ztreeList;
    state.formDataParams.cityAndCountyList = data.cityAndCountyList;
    state.navigateMenus = data.navigateMenus;
    state.operateBtns = data.operateBtns;
    state.readOnly = data.readOnly;
    state.investmentStatusSub = data.investmentStatusSub;
    state.suggestedPlanSub = data.suggestedPlanSub;
    state.isAddEditShow = true;
    state.isListShow = false;
  },
  [mutationType.IS_LOADING] (state, data)
  {
    state.isLoading = data;
  }
};

export default mutations;
