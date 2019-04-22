const floatRegexp = '[-+]?[0-9]*.?[0-9]+';

const types = [
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}px$`)
  },
  {
    name: '%',
    regexp: new RegExp(`^${floatRegexp}%$`)
  },
  /**
   * Fallback optopn
   * If no suffix specified, assigning "px"
   */
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}$`)
  }
];

/* 把带px或者%的设置长度转为number类型 */
const getType = value =>
{
  if (value === 'auto')
  {
    return {
      type: value,
      value: 0
    };
  }

  for (var i = 0; i < types.length; i++)
  {
    const type = types[i];

    if (type.regexp.test(value))
    {
      return {
        type: type.name,
        value: parseFloat(value)
      };
    }
  }

  return {
    type: '',
    value: value
  };
};

/**
 * 把长宽转换为number和（%或者px）
 * @param value
 * @returns {*}
 */
export const parseNumber = (value) =>
{
  switch (typeof value)
  {
    case 'number': { return { type: 'px', value }; }
    case 'string': { return getType(value); }
    default: { return { type: '', value }; }
  }
};

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
