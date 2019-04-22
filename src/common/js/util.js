// 判断obj是属于什么类型
function getType (obj)
{
  // tostring会返回对应不同的标签的构造函数
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element)
  {
    return 'element';
  }
  return map[toString.call(obj)];
}

// 深度克隆
export function deepClone (data)
{
  let type = getType(data);
  let obj;
  if (type === 'array')
  {
    obj = [];
  }
  else if (type === 'object')
  {
    obj = {};
  }
  else
  {
    // 不再具有下一层次
    return data;
  }
  if (type === 'array')
  {
    for (let i = 0, len = data.length; i < len; i++)
    {
      obj.push(deepClone(data[i]));
    }
  }
  else if (type === 'object')
  {
    for (let key in data)
    {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

/**
 * on监听事件（兼容ie）
 * @author   lvzhiyuan
 * @date     2018/10/15
 */
/* istanbul ignore next */
export const on = (function ()
{
  if (document.addEventListener)
  {
    return function (element, event, handler)
    {
      if (element && event && handler)
      {
        element.addEventListener(event, handler, false);
      }
    };
  }
  else
  {
    return function (element, event, handler)
    {
      if (element && event && handler)
      {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * 如果值超过了最大值或者小于最小值，则选择最大值或最小值其中一个
 * @param {Number} from  Lower limit
 * @param {Number} to    Upper limit
 * @param {Number} value Checked number value
 *
 * @return {Number} Either source value itself or limit value if range limits
 *   are exceeded
 */
export const inRange = (from, to, value) =>
{
  if (value < from)
  {
    return from;
  }
  if (value > to)
  {
    return to;
  }
  return value;
};

/** 把日期格式改造成yyyy-MM-dd格式 */
export const formatDate = date =>
{
  return date.split(' ')[0];
};

/**
 * 解决表格跨行的问题
 */
export const expandRows = (list, name) =>
{
  let range = [];
  let pos = 0;
  list.forEach((item, index) =>
  {
    if (index === 0)
    {
      range.push(1);
    }
    else
    {
      if (list[index][name] === list[index - 1][name])
      {
        range[pos] += 1;
        range.push(0);
      }
      else
      {
        range.push(1);
        pos = index;
      }
    }
  });
  return range;
};
