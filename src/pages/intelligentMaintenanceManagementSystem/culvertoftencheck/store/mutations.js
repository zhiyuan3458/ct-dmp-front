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
    state.formData = data.entity;
    let LISTCULVERTOFTENRECORD = '{"data":{"listCulvertOftenRecord":[{"id":"","delFlag":"","culvertOftercheckId":"","culvertPartName":"进水口(是/否)堵塞","checkSituation":"","diseaseSituation":"","treatmentOpinion":"[\\"\\"]"},{"id":"","delFlag":"","culvertOftercheckId":"","culvertPartName":"沉砂井(是/否)淤泥","checkSituation":"","diseaseSituation":"","treatmentOpinion":"[\\"\\"]"},{"id":"","delFlag":"","culvertOftercheckId":"","culvertPartName":"洞内井(是/否)淤塞及排水不畅","checkSituation":"","diseaseSituation":"","treatmentOpinion":"[\\"\\"]"},{"id":"","delFlag":"","culvertOftercheckId":"","culvertPartName":"洞口周围(是/否)有杂物堆积","checkSituation":"","diseaseSituation":"","treatmentOpinion":"[\\"\\"]"},{"id":"","delFlag":"","culvertOftercheckId":"","culvertPartName":"涵洞(是/否)清洁、漏水","checkSituation":"","diseaseSituation":"","treatmentOpinion":"[\\"\\"]"},{"id":"","delFlag":"","culvertOftercheckId":"","culvertPartName":"周围路基填土(是/否)稳定和完整","checkSituation":"","diseaseSituation":"","treatmentOpinion":"[\\"\\"]"},{"id":"","delFlag":"","culvertOftercheckId":"","culvertPartName":"涵洞结构(是/否)有损坏","checkSituation":"","diseaseSituation":"","treatmentOpinion":"[\\"\\"]"}]}}';
    state.listCulvertOftenRecord = JSON.stringify(JSON.parse(LISTCULVERTOFTENRECORD).data.listCulvertOftenRecord);
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
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.listCulvertOftenRecord = data.listCulvertOftenRecord;
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
    state.ztreeSelect = data.ztreeSelect;
    state.formData = data.entity;
    state.readOnly = data.readOnly;
    state.listCulvertOftenRecord = data.listCulvertOftenRecord;
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
    state.listCulvertOftenRecord = data;
  }
};

export default mutations;
