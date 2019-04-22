/**
 * 常用的表单验证正则规则
 * @author   lvzhiyuan
 * @date     2018/7/8
 */

/* 检测是否为整数数字类型 */
function validateNumberFn (rule, value, callback)
{
  function validate (num)
  {
    const reg = /^\d+$/;
    return reg.test(num);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入数字值!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 检测是否字符串 */
function validateStringFn (rule, value, callback)
{
  function validate (str)
  {
    const reg = /^[\\u4E00-\\u9FA5\\uf900-\\ufa2d\\w\\.\\s]+$/;
    return reg.test(str);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入字符值!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 检测是否为邮政编码 */
function validatepostCodeFn (rule, value, callback)
{
  function validate (postCode)
  {
    const reg = /^[0-9]{6}$/;
    return reg.test(postCode);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入正确的邮箱编码!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 检测是否为手机号码 */
function validateMobileFn (rule, value, callback)
{
  function validate (mobile)
  {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    return reg.test(mobile);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入正确的手机号码!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 检测是否为邮箱格式 */
function validateEmailFn (rule, value, callback)
{
  function validate (email)
  {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(email);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入正确的邮箱!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 检测是否为url */
function validateUrlFn (rule, value, callback)
{
  function validate (url)
  {
    const reg = /^(\w+:\/\/)?\w+(\.\w+)+.*$/;
    return reg.test(url);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入正确的URL!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 匹配由26个英文字母组成的字符串 */
function validate26StrFn (rule, value, callback)
{
  function validate (str)
  {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('只能输入26个英文字母组成的字符串!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 匹配国内固定电话号码 */
function validatePhoneFn (rule, value, callback)
{
  function validate (phone)
  {
    const reg = /^(\d{3,4}-)?\d{7,8}$/;
    return reg.test(phone);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入正确的固话号码!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 匹配日期 */
function validateDateFn (rule, value, callback)
{
  function validate (date)
  {
    const reg = /^[\w\W]*$/;
    return reg.test(date);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入正确的日期!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 匹配qq */
function validateQQFn (rule, value, callback)
{
  function validate (qq)
  {
    const reg = /^[1-9][0-9]{4,}$/;
    return reg.test(qq);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入正确的QQ号!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
function validatePileFn (rule, value, callback)
{
  function validate (pile)
  {
    const reg = /(^[K]\d{1,4}\+\d{1,3}$)/;
    return reg.test(pile);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('*格式: K0001(1至4位数字)+001(1-3位数字)'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
function validatePileToPileFn (rule, value, callback)
{
  function validate (pile)
  {
    const reg = /^[K]\d{1,4}\+\d{1,3}[~]([K]\d{1,4}\+\d{1,3}$)/;
    return reg.test(pile);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('格式: K0001(1至4位数字)+001(1至3位数字)~K0001(1至4位数字)+001(1至3位数字)!'));
    }
    else
    {
      callback();
    }
  }, 500);
};
/* 匹配正数正则 */
function validatePositiveNumberFn (rule, value, callback)
{
  function validate (num)
  {
    const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    return reg.test(num);
  }
  setTimeout(() =>
  {
    if (!validate(value) && value !== '' && value)
    {
      callback(new Error('请输入正数!'));
    }
    else
    {
      callback();
    }
  }, 500);
};

/* 判断是否为空 */
const Required = {required: true, message: '* 非空选项', trigger: 'blur'};
/* 验证是否为整数 */
const Number = { validator: validateNumberFn, trigger: 'blur' };
/* 验证是否为字符串 */
const String = { validator: validateStringFn, trigger: 'blur' };
/* 验证是否为邮政编码 */
const PostCode = { validator: validatepostCodeFn, trigger: 'blur' };
/* 验证是否为手机号码 */
const Mobile = { validator: validateMobileFn, trigger: 'blur' };
/* 验证是否为邮箱 */
const Email = { validator: validateEmailFn, trigger: 'blur' };
/* 验证是否为Url */
const Url = { validator: validateUrlFn, trigger: 'blur' };
/* 匹配由26个英文字母组成的字符串 */
const Str26 = { validator: validate26StrFn, trigger: 'blur' };
/* 匹配国内固定电话号码 */
const Phone = { validator: validatePhoneFn, trigger: 'blur' };
/* 匹配日期 */
const Date = { validator: validateDateFn, trigger: 'blur' };
/* 匹配QQ */
const QQ = { validator: validateQQFn, trigger: 'blur' };
/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
const Pile = { validator: validatePileFn, trigger: 'blur' };
/* 匹配桩号正则：K大写，四个数字+三个数字如：K0012+200 */
const PileToPile = { validator: validatePileToPileFn, trigger: 'blur' };
/* 匹配正数正则 */
const PositiveNumber = { validator: validatePositiveNumberFn, trigger: 'blur' };

export default {
  Required,
  Number,
  String,
  PostCode,
  Mobile,
  Email,
  Url,
  Str26,
  Phone,
  Date,
  QQ,
  Pile,
  PileToPile,
  PositiveNumber
};
