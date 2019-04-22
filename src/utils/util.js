// 删除对象数组，传入参数为已知的对象
Array.prototype.remove = function (val)
{
  let index = this.indexOf(val);
  if (index > -1)
  {
    this.splice(index, 1);
  }
};

/**
 * 把url问号后的参数转为对象格式
 * @author   lvzhiyuan
 * @date     2018/9/13
 * @param    url——带参数的访问地址
 * @return   由参数组成的对象
 */
export function param2Obj (url)
{
  const search = url.split('?')[1];
  if (!search)
  {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

/**
 * 把参数转为对象格式
 * @author   lvzhiyuan
 * @date     2018/9/13
 * @param    params——参数(如id=1&name=lvzhiyuan)
 * @return   由参数组成的对象{id: 1, name: lvzhiyuan}
 */
export function param1Obj (params)
{
  if (!params)
  {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

/**
 * debounce去抖动
 * @author   lvzhiyuan
 * @date     2018/9/20
 * @param    method——需要防抖的函数
 * @param    delay——延迟delay秒后才执行method
 */
export function debounce (method, delay)
{
  let timer = null;
  return function ()
  {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function ()
    {
      method(context, args);
    }, delay);
  };
}

/**
 * 互换数组中的两个元素
 * @author   lvzhiyuan
 * @date     2018/11/19
 * @param    arr——传进来的数组
 * @param    preIndex——需要调换的前一个数组的索引
 * @param    nextIndex——需要调换的后一个数组的索引
 */
export function itemTransformToItem (arr, preIndex, nextIndex)
{
  let temp = arr[preIndex];
  arr[preIndex] = arr[nextIndex];
  arr[nextIndex] = temp;
}

export function gengerateID ()
{
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c =>
  {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
