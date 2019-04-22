<template>
  <div>
    <div
      v-if="!readOnly"
      class="el-select"
      :class="[selectSize ? 'el-select--' + selectSize : '']"
      @click.stop="toggleMenu"
      v-clickoutside="handleClose">
      <el-input
        type="textarea"
        ref="reference"
        v-model="textarea"
        :autosize="{ minRows: 1, maxRows: 1 }"
        readonly
        :style="{width: `${width}`}"
        @focus="handleFocus"
      >
        <template slot="prefix" v-if="$slots.prefix && !readOnly">
          <slot name="prefix"></slot>
        </template>
        <i slot="suffix"
           v-if="!readOnly"
           :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"
           @click="handleIconClick"
        ></i>
      </el-input>
      <div class="validate" v-show="isValidate">* 请填入信息</div>
      <transition
        name="el-zoom-in-top"
      >
        <el-select-menu
          ref="popper"
          :append-to-body="popperAppendToBody"
          v-show="visible">
          <el-scrollbar
            tag="ul"
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list"
            ref="scrollbar"
          >
            <ul class="ztree" :id="treeId"></ul>
            <div class="x-arrow"></div>
          </el-scrollbar>
        </el-select-menu>
      </transition>
    </div>
    <div v-else-if="readOnly">
      {{ readOnlyMsg }}
    </div>
  </div>
</template>

<script type="text/babel">
import Emitter from 'ct-element-ui/lib/mixins/emitter';
import Focus from 'ct-element-ui/lib/mixins/focus';
import Locale from 'ct-element-ui/lib/mixins/locale';
import ElInput from 'ct-element-ui/lib/input';
import ElSelectMenu from './select-dropdown.vue';
import ElScrollbar from 'ct-element-ui/lib/scrollbar';
import debounce from 'throttle-debounce/debounce';
import Clickoutside from 'ct-element-ui/lib/utils/clickoutside';
import { addClass, removeClass, hasClass } from 'ct-element-ui/lib/utils/dom';
import { addResizeListener, removeResizeListener } from 'ct-element-ui/lib/utils/resize-event';
import scrollIntoView from 'ct-element-ui/lib/utils/scroll-into-view';
import { getValueByPath, valueEquals } from 'ct-element-ui/lib/utils/util';
import NavigationMixin from './navigation-mixin';
import TreeTool from '@/class/ztreeTool/treeTool';
import { Message } from 'element-ui';

const sizeMap = {
  'medium': 36,
  'small': 32,
  'mini': 28
};

export default {
  mixins: [Emitter, Locale, Focus('reference'), NavigationMixin],

  name: 'ElSelect',

  componentName: 'ElSelect',

  inject: {
    elForm: {
      default: ''
    },

    elFormItem: {
      default: ''
    }
  },

  provide ()
  {
    return {
      'select': this
    };
  },

  computed: {
    _elFormItemSize ()
    {
      return (this.elFormItem || {}).elFormItemSize;
    },

    iconClass ()
    {
      let criteria = this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        !this.multiple &&
        this.value !== undefined &&
        this.value !== null &&
        this.value !== '';
      return criteria ? 'circle-close is-show-close' : (this.remote && this.filterable ? '' : 'arrow-up');
    },

    debounce ()
    {
      return this.remote ? 300 : 0;
    },

    selectSize ()
    {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },

    selectDisabled ()
    {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },

  components: {
    ElInput,
    ElSelectMenu,
    ElScrollbar
  },

  directives: { Clickoutside },

  props: {
    /* 设置input的宽度 */
    width: {
      type: String,
      default: '100%'
    },
    /* 设置单选还是多选 */
    flag: {
      type: Boolean,
      default: true
    },
    ztreeList: {
      type: Array,
      default: function ()
      {
        return [];
      }
    },
    validate: {
      type: Boolean,
      default: true
    },
    // 是否只读
    readOnly: {
      type: Boolean,
      default: false
    },
    value: {
      required: true
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data ()
  {
    return {
      isValidate: false,
      /* 是否显示下拉框 */
      visible: false,
      /* 要传给后台的表单值 */
      textarea: '',
      /* 树对象 */
      zTreeObj: {},
      readOnlyMsg: '', // 只读数据
      treeId: this.gengerateID(),
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },

  watch: {
    ztreeList:
    {
      handler (newValue, oldValue)
      {
        if (newValue && newValue.length !== 0)
        {
          if (this.readOnly)
          { // 只读
            let listData = [];
            for (let a = 0; a < this.ztreeList.length; a++)
            {
              if (this.ztreeList[a].checked)
              {
                listData.push(this.ztreeList[a].text);
              }
            }
            this.readOnlyMsg = listData.join(',');
          }
          else
          {
            setTimeout(() =>
            {
              this.zTreeObj = new TreeTool(this.treeId, this.ztreeList, true);
              this.zTreeObj.setCheck();
              this.zTreeObj.setSelectedMulti();
              this.zTreeObj.setOnCheck(this.onCheck);
              this.zTreeObj.setChkboxType({Y: 's', N: 's'});
              this.textarea = this.zTreeObj.getCheckedNodes(true).map(item => item.text).join(',');
            }, 20);
          }
        }
        else
        {
          if (!this.readOnly)
          {
            this.zTreeObj = new TreeTool(this.treeId, [], true);
            this.textarea = '';
          }
        }
      },
      immediate: true
    },
    selectDisabled ()
    {
      this.$nextTick(() =>
      {
        this.resetInputHeight();
      });
    },

    placeholder (val)
    {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },

    value (val, oldVal)
    {
      if (this.multiple)
      {
        this.resetInputHeight();
        if (val.length > 0 || (this.$refs.input && this.query !== ''))
        {
          this.currentPlaceholder = '';
        }
        else
        {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword)
        {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple)
      {
        this.inputLength = 20;
      }
      if (!valueEquals(val, oldVal))
      {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },

    visible (val)
    {
      if (!val)
      {
        this.handleIconHide();
        this.broadcast('ElSelectDropdown', 'destroyPopper');
        if (this.$refs.input)
        {
          this.$refs.input.blur();
        }
        this.query = '';
        this.previousQuery = null;
        this.selectedLabel = '';
        this.inputLength = 20;
        this.resetHoverIndex();
        this.$nextTick(() =>
        {
          if (this.$refs.input &&
            this.$refs.input.value === '' &&
            this.selected.length === 0)
          {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
        if (!this.multiple)
        {
          if (this.selected)
          {
            if (this.filterable && this.allowCreate &&
              this.createdSelected && this.createdLabel)
            {
              this.selectedLabel = this.createdLabel;
            }
            else
            {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }
        }
      }
      else
      {
        this.handleIconShow();
        this.broadcast('ElSelectDropdown', 'updatePopper');
        if (this.filterable)
        {
          this.query = this.remote ? '' : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple)
          {
            this.$refs.input.focus();
          }
          else
          {
            if (!this.remote)
            {
              this.broadcast('ElOption', 'queryChange', '');
              this.broadcast('ElOptionGroup', 'queryChange');
            }
            this.broadcast('ElInput', 'inputSelect');
          }
        }
      }
      this.$emit('visible-change', val);
    },

    options ()
    {
      if (this.$isServer) return;
      this.$nextTick(() =>
      {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      });
      if (this.multiple)
      {
        this.resetInputHeight();
      }
      let inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1)
      {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount)
      {
        this.checkDefaultFirstOption();
      }
    }
  },

  methods: {
    // 指定input type为file的id
    gengerateID ()
    {
      let d = new Date().getTime();
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c =>
      {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    },
    /* 点击checkbox时触发 */
    onCheck (event, treeId, treeNode)
    {
      if (this.flag === false)
      {
        let count = this.zTreeObj.getSelectNodesCount(this.zTreeObj);
        if (count > 1)
        {
          this.zTreeObj.getTree().checkNode(treeNode, false, true);
          Message.info('只能选择一个节点！');
        }
      }
      let hiddenValue = '';
      let displayValue = '';
      let nodes = this.zTreeObj.getCheckedNodes(true);
      for (let i = 0; i < nodes.length; i++)
      {
        let node = nodes[i];
        hiddenValue += hiddenValue === '' ? node.id : (',' + node.id);
        displayValue += displayValue === '' ? node.text : (',' + node.text);
      }
      this.$emit('input', hiddenValue);
      this.textarea = displayValue;
      this.isValidate = this.validate && this.textarea === '';
    },
    handleQueryChange (val)
    {
      if (this.previousQuery === val || this.isOnComposition) return;
      if (
        this.previousQuery === null &&
        (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')
      )
      {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.$nextTick(() =>
      {
        if (this.visible) this.broadcast('ElSelectDropdown', 'updatePopper');
      });
      this.hoverIndex = -1;
      if (this.multiple && this.filterable)
      {
        const length = this.$refs.input.value.length * 15 + 20;
        this.inputLength = this.collapseTags ? Math.min(50, length) : length;
        this.managePlaceholder();
        this.resetInputHeight();
      }
      if (this.remote && typeof this.remoteMethod === 'function')
      {
        this.hoverIndex = -1;
        this.remoteMethod(val);
      }
      else if (typeof this.filterMethod === 'function')
      {
        this.filterMethod(val);
        this.broadcast('ElOptionGroup', 'queryChange');
      }
      else
      {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('ElOption', 'queryChange', val);
        this.broadcast('ElOptionGroup', 'queryChange');
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount)
      {
        this.checkDefaultFirstOption();
      }
    },

    handleIconHide ()
    {
      let icon = this.$el.querySelector('.el-input__icon');
      if (icon)
      {
        removeClass(icon, 'is-reverse');
      }
    },

    handleIconShow ()
    {
      let icon = this.$el.querySelector('.el-input__icon');
      if (icon && !hasClass(icon, 'el-icon-circle-close'))
      {
        addClass(icon, 'is-reverse');
      }
    },

    scrollToOption (option)
    {
      const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
      if (this.$refs.popper && target)
      {
        const menu = this.$refs.popper.$el.querySelector('.el-select-dropdown__wrap');
        scrollIntoView(menu, target);
      }
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },

    emitChange (val)
    {
      if (!valueEquals(this.value, val))
      {
        this.$emit('change', val);
      }
    },

    getOption (value)
    {
      let option;
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';

      for (let i = this.cachedOptions.length - 1; i >= 0; i--)
      {
        const cachedOption = this.cachedOptions[i];
        const isEqual = isObject
          ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
          : cachedOption.value === value;
        if (isEqual)
        {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      const label = (!isObject && !isNull)
        ? value : '';
      let newOption = {
        value: value,
        currentLabel: label
      };
      if (this.multiple)
      {
        newOption.hitState = false;
      }
      return newOption;
    },

    setSelected ()
    {
      if (!this.multiple)
      {
        let option = this.getOption(this.value);
        if (option.created)
        {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        }
        else
        {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      let result = [];
      if (Array.isArray(this.value))
      {
        this.value.forEach(value =>
        {
          result.push(this.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(() =>
      {
        this.resetInputHeight();
      });
    },

    handleFocus (event)
    {
      if (!this.softFocus)
      {
        if (this.automaticDropdown || this.filterable)
        {
          this.visible = true;
          this.menuVisibleOnFocus = true;
        }
        this.$emit('focus', event);
      }
      else
      {
        this.softFocus = false;
      }
    },

    blur ()
    {
      this.visible = false;
      this.$refs.reference.blur();
    },

    handleIconClick (event)
    {
      if (this.iconClass.indexOf('circle-close') > -1)
      {
        this.deleteSelected(event);
      }
    },

    handleClose ()
    {
      this.visible = false;
    },

    toggleLastOptionHitState (hit)
    {
      if (!Array.isArray(this.selected)) return;
      const option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false)
      {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },

    managePlaceholder ()
    {
      if (this.currentPlaceholder !== '')
      {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
      }
    },

    resetInputHeight ()
    {
      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() =>
      {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference.$el.childNodes;
        let input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0];
        const tags = this.$refs.tags;
        const sizeInMap = sizeMap[this.selectSize] || 40;
        input.style.height = this.selected.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px';
        if (this.visible)
        {
          this.broadcast('ElSelectDropdown', 'updatePopper');
        }
      });
    },

    resetHoverIndex ()
    {
      setTimeout(() =>
      {
        if (!this.multiple)
        {
          this.hoverIndex = this.options.indexOf(this.selected);
        }
        else
        {
          if (this.selected.length > 0)
          {
            this.hoverIndex = Math.min.apply(null, this.selected.map(item => this.options.indexOf(item)));
          }
          else
          {
            this.hoverIndex = -1;
          }
        }
      }, 300);
    },

    handleOptionSelect (option, byClick)
    {
      if (this.multiple)
      {
        const value = this.value.slice();
        const optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1)
        {
          value.splice(optionIndex, 1);
        }
        else if (this.multipleLimit <= 0 || value.length < this.multipleLimit)
        {
          value.push(option.value);
        }
        this.emitChange(value);
        if (option.created)
        {
          this.query = '';
          this.handleQueryChange('');
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      }
      else
      {
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      this.setSoftFocus();
      if (this.visible) return;
      this.$nextTick(() =>
      {
        this.scrollToOption(option);
      });
    },

    setSoftFocus ()
    {
      this.softFocus = true;
      const input = this.$refs.input || this.$refs.reference;
      if (input)
      {
        input.focus();
      }
    },

    getValueIndex (arr = [], value)
    {
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      if (!isObject)
      {
        return arr.indexOf(value);
      }
      else
      {
        const valueKey = this.valueKey;
        let index = -1;
        arr.some((item, i) =>
        {
          if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey))
          {
            index = i;
            return true;
          }
          return false;
        });
        return index;
      }
    },

    toggleMenu ()
    {
      if (!this.selectDisabled)
      {
        if (this.menuVisibleOnFocus)
        {
          this.menuVisibleOnFocus = false;
        }
        else
        {
          this.visible = !this.visible;
        }
        if (this.visible)
        {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },

    deleteSelected (event)
    {
      event.stopPropagation();
      this.emitChange('');
      this.visible = false;
      this.$emit('clear');
    },

    onInputChange ()
    {
      if (this.filterable && this.query !== this.selectedLabel)
      {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },

    resetInputWidth ()
    {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },

    handleResize ()
    {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },

    checkDefaultFirstOption ()
    {
      this.hoverIndex = -1;
      // highlight the created option
      let hasCreated = false;
      for (let i = this.options.length - 1; i >= 0; i--)
      {
        if (this.options[i].created)
        {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      for (let i = 0; i !== this.options.length; ++i)
      {
        const option = this.options[i];
        if (this.query)
        {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible)
          {
            this.hoverIndex = i;
            break;
          }
        }
        else
        {
          // highlight currently selected option
          if (option.itemSelected)
          {
            this.hoverIndex = i;
            break;
          }
        }
      }
    }
  },

  created ()
  {
    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
    if (this.multiple && !Array.isArray(this.value))
    {
      this.$emit('input', []);
    }
    if (!this.multiple && Array.isArray(this.value))
    {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = debounce(this.debounce, () =>
    {
      this.onInputChange();
    });

    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('setSelected', this.setSelected);
    this.$on('fieldReset', () =>
    {
      this.dispatch('ElFormItem', 'el.form.change');
    });
  },

  mounted ()
  {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0)
    {
      this.currentPlaceholder = '';
    }
    addResizeListener(this.$el, this.handleResize);
    if (this.remote && this.multiple)
    {
      this.resetInputHeight();
    }
    this.$nextTick(() =>
    {
      if (this.$refs.reference && this.$refs.reference.$el)
      {
        this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },

  beforeDestroy ()
  {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
  }
};
</script>

<style lang="less" scoped>
.validate {
  color: red;
}
</style>
