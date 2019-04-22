const getters = {
  token: state => state.user.token,
  currentSubsystemId: state => state.tagsView.currentSubsystemId, // 当前子系统的id
  projectList: state => state.tagsView.projectList, // 子系统列表
  visitedViews: state => state.tagsView.visitedViews, // 底部导航栏显示的子系统列表
  sideBar: state => state.app.sideBar, // 菜单列表
  modalBgShow: state => state.app.modalBgShow, // 设置有无模态框背景色
  currentRoute: state => state.permission.currentRoute, // 当前路由信息
  addRouters: state => state.permission.addRouters, // 路由
  menus: state => state.tagsView.menus, // 菜单栏
  msg: state => state.permission.msg,
  test: state => state.permission.test,
  shortcut: state => state.shortcut.shortcut,
  initEcharts: state => state.deskSetting.initEcharts,
  businessId: state => state.app.businessId,
  refreshTodoTask: state => state.app.refreshTodoTask,
  isAddTodoTask: state => state.app.isAddTodoTask,
  tableHeight: state => state.app.tableHeight,
  sideBarHeight: state => state.app.sideBarHeight,
  mainContentHeight: state => state.app.mainContentHeight,
  treeHeight: state => state.app.treeHeight,
  bulletin: state => state.app.bulletin // 待办事项和公告通知
};

export default getters;
