<script type="text/jsx">
import vDialog from '@/components/dialog';
import uploader from '@/components/uploader';
import { formatDate } from '@/common/js/util';
export default {
  components: {
    'v-dialog': vDialog,
    uploader
  },
  data ()
  {
    return {
      initValue: this.type ? (this.type.toLowerCase() === 'checkbox' ? JSON.parse(this.value) : this.value + '' || '') : '',
      isDialogShow: false
    };
  },
  props: {
    /* 传过来的隐藏值 */
    value: {
      type: [String, Array, Number],
      default: ''
    },
    /* 获取数据字典的数据的code */
    code: {
      type: String
    },
    /* 表单组件类型 */
    type: {
      type: String,
      default: 'input'
    },
    /* 是否只读 */
    readonly: {
      type: Boolean,
      default: false
    },
    options: {
      type: String,
      default: ''
    }
  },
  computed: {
    privateOptions ()
    {
      return this.options ? JSON.parse(this.options) : [];
    }
  },
  methods: {
    handleChange (value)
    {
      let temp = '';
      if (value.sessionId)
      {
        temp = value.sessionId;
      }
      else
      {
        temp = value;
      }
      this.$emit('update:value', temp);
      this.$emit('change');
    },
    /**
     * 点击上传按钮上传
     */
    handleclick ()
    {
      this.isDialogShow = true;
    }
  },
  render (h)
  {
    if (!this.type) return false;
    const data = {
      on: {
        'update:visible': () =>
        {
          this.isDialogShow = false;
        }
      }
    };
    const type = this.type.toLowerCase();
    let temp = null;
    if (this.readonly && type !== 'attachment')
    {
      let listDictionary = '';
      if (type === 'checkbox')
      { // 复选框的情况
        this.initValue.forEach((value, index) =>
        {
          let temp1 = this.privateOptions.find(item => item.displayValue === value);
          if (temp1)
          {
            temp1 = temp1.displayName;
            listDictionary += index === (this.initValue.length - 1) ? temp1 : `${temp1},`;
            this.readOnlyMsg = listDictionary;
          }
        });
      }
      else if (type === 'radio' || type === 'constantdd')
      { // select框与单选框
        let temp1 = this.privateOptions.find(dictionary => dictionary.displayValue === this.initValue);
        temp1 = temp1 ? temp1.displayName : '';
        listDictionary = temp1;
        this.readOnlyMsg = listDictionary;
      }
      else if (type === 'date')
      {
        this.readOnlyMsg = formatDate(this.initValue);
      }
      else
      {
        this.readOnlyMsg = this.initValue;
      }
      temp = <span class="readonly">{this.readOnlyMsg}</span>;
    }
    else
    {
      switch (type)
      {
        case 'input' : { temp = <el-input v-model={this.initValue} style="width: 100%;" on-blur={this.handleChange(this.initValue)}></el-input>; break; }
        case 'textarea' : { temp = <el-input v-model={this.initValue} type="textarea" rows="2" on-blur={this.handleChange(this.initValue)}></el-input>; break; }
        case 'constantdd' : { temp =
          <el-select
            v-model={this.initValue}
            style="width: 100%;"
            on-change={this.handleChange(this.initValue)}
          >
            {
              this.privateOptions.map(item =>
              {
                return <el-option
                  key={item.displayValue}
                  label={item.displayName}
                  value={item.displayValue}
                >
                </el-option>;
              })
            }
          </el-select>; break; }
        case 'radio': { temp =
          <el-radio-group
            v-model={this.initValue}
            on-change={this.handleChange(this.initValue)}
          >
            {
              this.privateOptions.map(item =>
              {
                return <el-radio
                  key={item.displayValue}
                  label={item.displayValue}
                >
                  {item.displayName}
                </el-radio>;
              })
            }
          </el-radio-group>; break; }
        case 'checkbox': { temp =
          <el-checkbox-group
            v-model={this.initValue}
            on-change={this.handleChange(this.initValue)}
          >
            {
              this.privateOptions.map(item =>
              {
                return <el-checkbox
                  key={item.displayValue}
                  label={item.displayValue}
                >
                  {item.displayName}
                </el-checkbox>;
              })
            }
          </el-checkbox-group>; break; }
        case 'attachment': { temp =
          <div style="text-align: center;">
            <el-button size="mini" on-click={this.handleclick}>附件信息</el-button>
            <v-dialog visible={this.isDialogShow} {...data}>
              <div style="margin-top: 100px;">
                <uploader
                  v-model={this.initValue}
                  readonly={this.readonly}
                  on-uploadSuccess={this.handleChange(this.initValue)}
                >
                </uploader>
              </div>
            </v-dialog>
          </div>; break; }
        default: { temp =
          <el-date-picker
            v-model={this.initValue}
            readonly={this.readonly}
            value-format="yyyy-MM-dd"
            type="date"
            style="width: 100%;"
            on-change={this.handleChange(this.initValue)}
          >
          </el-date-picker>; break; }
      }
    }
    return (
      temp
    );
  }
};
</script>

<style lang="less" scoped>
.readonly {
  width: 100%;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .el-checkbox+.el-checkbox {
  margin-left: 9px;
}
</style>
