<template>
  <div class="iconSelect" v-clickoutside="handleClose">
    <div class="icon-select-input" v-if="!readonly" @click="clickInput">
      <input :value="iconValue" type="text" class="select-input" @input="inputFn" :readonly="readonly">
      <span class="icon-select-suffix" style="z-index: 1000;" @click="clickInput">
          <span class="icon-select-suffix-inner">
            <i class="el-icon-arrow-up" :class="{'is-reverse': reverse}"></i>
          </span>
        </span>
    </div>
    <transition name="el-zoom-in-top">
      <div class="iconSelectDropdown" :style="{width: dropdownWidth + 'px'}" v-show="dropdownShow" v-if="!readonly">
        <div class="list-head" :style="{color: list && list.length === 0 ? 'red' : 'white'}">{{list.length === 0 ? '对不起，找不到我' : '请选择或输入'}}</div>
        <swiper :options="swiperOptions" ref="mySwiper" class="iconSwiper">
          <swiper-slide v-for="(iconGroup, index) in finalList" :key="index">
            <a href="javascript: void(0);" :title="item.name" class="iconWrapper" v-for="item in iconGroup" :key="item.id" @click="clickFn(item)">
              <span class="icon" :class="item.icon"></span>
              <p class="iconName">{{item.name.length > 4 ? item.name.slice(0, 4) + '...' : item.name}}</p>
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="popper__arrow"></div>
      </div>
    </transition>
    <span v-if="hasIcon(iconValue)" class="iconSelected" :class="hasIcon(iconValue).icon"></span>
  </div>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { debounce } from '@/utils/util';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import api from '@/api/backStageSystem/api';
export default {
  name: 'iconSelect',
  components: {
    swiper,
    swiperSlide
  },
  directives: { Clickoutside },
  data ()
  {
    return {
      list: [],
      /* input的blur事件是否已经触发 */
      blurFlag: true,
      /* 包含所有图标的数组 */
      privateList: [],
      /* 三角图标是否掉转 */
      reverse: false,
      /* 下拉框是否显示 */
      dropdownShow: false,
      /* input框的值 */
      iconValue: this.value,
      /* input框对应的那个图标按钮的class */
      iconClass: '',
      swiperOptions: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (swiper, index, className)
        {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }

      }
    };
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    /* 父组件传来的input框值 */
    value: {
      type: String,
      required: false,
      default ()
      {
        return '';
      }
    },
    /* 图标显示的行数 */
    row: {
      type: Number,
      default ()
      {
        return 3;
      }
    },
    /* 图标显示的列数 */
    column: {
      type: Number,
      default ()
      {
        return 3;
      }
    }
  },
  computed: {
    /* 返回检索到的数组 */
    finalList ()
    {
      let finalList = [];
      const sizeEachPage = this.column * this.row;
      if (this.privateList.length <= sizeEachPage)
      {
        finalList[0] = this.list;
      }
      else
      {
        let rest = this.list.length % (sizeEachPage);
        let restList = rest === 0 ? null : this.list.slice(-1 * rest);
        let pages = (this.list.length - rest) / sizeEachPage;
        for (let i = 0; i < pages; i++)
        {
          let arr = [];
          for (let j = i * sizeEachPage; j < (i + 1) * sizeEachPage; j++)
          {
            arr.push(this.list[j]);
          }
          finalList.push(arr);
        }
        if (restList !== null)
        {
          finalList.push(restList);
        }
      }
      return finalList;
    },
    /* 下拉框的宽度 */
    dropdownWidth ()
    {
      const iconWrapperWidth = 64;
      const iconWrapperMargin = 10;
      return (iconWrapperWidth + iconWrapperMargin) * this.column;
    },
    /* swiper */
    swiper ()
    {
      return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    /* 监听父组件传来的v-model值 */
    value (newValue, oldValue)
    {
      let iconObj = this.privateList.find(item => item.icon === newValue);
      if (iconObj)
      {
        this.iconValue = iconObj.name;
      }
      else
      {
        this.iconValue = '';
      }
    }
  },
  methods: {
    /* 选择图标时触发 */
    clickFn (iconObj)
    {
      this.reverse = false;
      this.iconValue = iconObj.name;
      this.dropdownShow = false;
      this.$emit('input', iconObj.icon);
    },
    /* 在input框输入时触发 */
    inputFn: debounce(function (context, args)
    {
      context.iconValue = args[0].target.value;
      context.list = context.privateList.filter(item => item.name.indexOf(context.iconValue) >= 0);
      if (context.hasIcon(context.iconValue))
      {
        context.$emit('input', context.hasIcon(context.iconValue).icon);
      }
    }, 200),
    /* 点击input框时触发 */
    clickInput ()
    {
      this.list = this.privateList;
      this.swiper.slideTo(0, 0, false);
      this.dropdownShow = true;
      this.reverse = true;
      this.blurFlag = true;
    },
    /**
     * 判断输入的值(icon的name)是否存在于privateList这个包含所有图标对象的数组
     * @author   lvzhiyuan
     * @date     2018/10/16
     */
    hasIcon (iconValue)
    {
      return this.privateList.find(item => item.name === iconValue);
    },
    /**
     * 从后台获取所有的icon对象的数组
     * @author   lvzhiyuan
     * @date     2018/10/16
     */
    async getIconData ()
    {
      let {data} = await api.icon.listJson({pageNum: 1, pageSize: 5000});
      if (data.data.tableList && data.data.tableList.length !== 0)
      {
        this.privateList = data.data.tableList.map(item =>
        {
          return {
            id: item.id,
            icon: item.value,
            name: item.name
          };
        });
        this.list = this.privateList;
        let temp = this.privateList.find(item => item.icon === this.value);
        this.iconValue = temp ? temp.name : '';
      }
    },
    /**
     * 点击这个icon选择器外的其他元素则选择框消失
     * @author   lvzhiyuan
     * @date     2018/11/23
     */
    handleClose ()
    {
      this.dropdownShow = false;
      this.reverse = false;
      /* 如果点击选择器的其他div时，发现input中的值不匹配icon的对象数组任何一个，则把input置空 */
      if (!this.hasIcon(this.iconValue))
      {
        this.list = this.privateList;
        this.iconValue = '';
        this.blurFlag = false;
      }
    }
  },
  created ()
  {
    this.getIconData();
  }
};
</script>

<style lang="less" scoped>
.iconSelect {
  width: 100%;
  display: inline-block;
  position: relative;
  .readonly-input {
    input {
      border: 0!important;
    }
    /deep/ .icon-select-suffix {
      display: none;
    }
  }
  .icon-select-input {
    width: 92%;
    font-size: 14px;
    display: inline-block;
    position: relative;
    .select-input {
      width: 100%;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 3px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 25px;
      line-height: 25px;
      outline: none;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      cursor: pointer;
    }
    .select-input::-webkit-input-placeholder {
      color: #C0C4CC;
    }
    .icon-select-suffix {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      text-align: center;
      color: #c0c4cc;
      transition: all .3s;

      .icon-select-suffix-inner {
        .el-icon-arrow-up {
          width: 25px;
          height: 100%;
          text-align: center;
          line-height: 24px;
          color: #c0c4cc;
          font-size: 14px;
          transition: transform .3s;
          transform: rotate(180deg);
          cursor: pointer;
        }
        .is-reverse {
          transform: rotate(0);
        }
      }
    }
  }

  .iconSelectDropdown {
    position: absolute;
    top: 30px;
    left: -19px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #ddd;
    z-index: 100;
    background: white;

    .list-head {
      background: #fba33c;
      color: white;
      line-height: 20px;
      padding: 2px 0 2px 9px;
      word-wrap: break-word;
    }
    .iconSwiper {
      .iconWrapper {
        width: 64px;
        height: 61px;
        display: block;
        float: left;
        text-align: center;
        margin: 5px;
        padding: 3px;
        box-sizing: border-box;
        border: 1px solid rgb(232, 244, 255);
        text-decoration: none;
        color: #333;

        .icon {
          line-height: 34px;
          font-size: 18px;
        }
        .iconName {
          line-height: 17px;
          margin: 0;
          color: #1296DB;
        }
      }
      /* 分页器样式 */
      .swiper-pagination {
        position: relative;
        margin: 15px 0 8px 0;
        text-align: center;
        .swiper-pagination-bullet {
          width: 18px;
          height: 17px;
          display: inline-block;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          text-align: center;
          line-height: 16px;
          color: #333;
          background: rgba(0, 0, 0, 0.2);
          cursor: pointer;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #007aff;
          color: #fff;
        }
      }
    }

    .popper__arrow {
      position: absolute;
      width: 0;
      height: 0;
      top: -13px;
      left: 20%;
      margin-right: 3px;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent #ebeef5 transparent;

      &:after {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        top: -4px;
        left: -6px;
        border-width: 6px;
        border-style: solid;
        border-color: transparent transparent #fba33c transparent;
      }
    }
  }
  .iconSelected {
    position: relative;
    vertical-align: text-bottom;
    font-size: 18px;
  }
}
.swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #333;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #007aff;
  color: #fff;
}
</style>
