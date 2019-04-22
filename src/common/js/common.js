import { Message } from 'element-ui';
export default {
  /**
   * 停止事件逐级传递
   * @author   chenguang
   * @date     2018/9/29
   */
  stopEvent: (evt) =>
  {
    evt = evt || window.event;
    if (evt.preventDefault)
    {
      evt.preventDefault();
      if (window.event)
      {
        window.event.cancelBubble = true;
      }
      else
      {
        evt.stopPropagation();
      }
    }
    else
    {
      window.event.returnValue = false;
      if (window.event)
      {
        window.event.cancelBubble = true;
      }
      else
      {
        evt.stopPropagation();
      }
    }
  },

  /**
   * 树组件自定义class图标渲染
   * @author   chenguang
   * @date     2018/10/15
   */
  addDiyDom: (treeId, treeNode) =>
  {
    /* global $ */
    let aObj = $('#' + treeNode.tId + '_a');
    if ($('#diyBtn_' + treeNode.id).length > 0) return;
    let iconHtml = `<span class="${treeNode.iconSkin}" style="font-size: 14px;"></span>`;
    aObj.prepend(iconHtml);
  },
  /**
   * 查看需要上移下移置顶置底的列表是否已经置顶置底或者是否选中了某一行
   * @author   lvzhiyuan
   * @date     2018/11/19
   */
  checkChangePositon (arr, val, name)
  {
    if (val.length !== 1)
    {
      Message({
        message: '请只选择一行!',
        type: 'info',
        duration: 3000
      });
      return false;
    }
    else
    {
      let obj;
      let currentIndex = arr.findIndex(item => item.id === val[0].id);
      const lastIndex = arr.length - 1;
      const AT_TOP = '已经置顶!';
      const AT_BOTTOM = '已经置底!';
      switch (name)
      {
        case 'up': { obj = currentIndex === 0 ? AT_TOP : { preId: arr[currentIndex - 1].id, preIndex: currentIndex - 1, currentIndex }; break; }
        case 'top': { obj = currentIndex === 0 ? AT_TOP : { preId: arr[0].id, preIndex: 0, currentIndex }; break; }
        case 'down': { obj = currentIndex === lastIndex ? AT_BOTTOM : { preId: arr[currentIndex + 1].id, preIndex: currentIndex + 1, currentIndex }; break; }
        case 'bottom': { obj = currentIndex === lastIndex ? AT_BOTTOM : { preId: arr[lastIndex].id, preIndex: lastIndex, currentIndex }; break; }
        default: { obj = currentIndex === 0 ? AT_TOP : { preId: arr[currentIndex - 1].id, preIndex: currentIndex - 1, currentIndex }; break; }
      }
      if (obj === AT_TOP || obj === AT_BOTTOM)
      {
        Message({
          message: obj,
          type: 'info',
          duration: 3000
        });
        return false;
      }
      else
      {
        return obj;
      }
    }
  }
};
