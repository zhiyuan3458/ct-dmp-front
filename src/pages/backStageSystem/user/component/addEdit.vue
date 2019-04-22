<template>
  <div class="lzy-form-wrapper" v-if="isAddEditShow">
    <right-nav-layout
      :btnList="operateBtns"
      :breadcrumbs="navigateMenus"
    ></right-nav-layout>
    <div class="form-container">
      <el-form :model="formData" ref="ctForm" v-loading="metaData.loading">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="A.账号信息" name="1">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th><span style="color: red;">*</span> 账号：</th>
                  <td>
                    <el-form-item label="" prop="userAccount" :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.userAccount" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th rowspan="4">头像：</th>
                  <td rowspan="4">
                    <div class="pic">
                      <div :style="{'width': '150px', 'height':'165px',  'overflow': 'hidden'}">
                        <div style="width:150px;height:160px;">
                          <img :src="formData.avator" style="width:150px;height:160px;">
                        </div>
                      </div>
                      <el-button size="mini" icon="ct-icon-add" @click="openAvator">上传头像</el-button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th><span style="color: red;">*</span> 密码：</th>
                  <td>
                    <el-form-item label="" prop="password">
                      <el-input class="form-input" v-model="formData.password" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th><span style="color: red;">*</span> 确认密码：</th>
                  <td>
                    <el-form-item label="" prop="confirmPassword">
                      <el-input class="form-input" v-model="formData.confirmPassword" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>最近登录时间：</th>
                  <td>
                    <el-form-item label="" prop="recentLandingTime">
                      <el-input class="form-input" v-model="formData.recentLandingTime" :readonly=true></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>在线状态：</th>
                  <td>
                    <el-form-item label="" prop="onlineFlag">
                      <el-input class="form-input" v-model="formData.onlineFlag" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>账号状态：</th>
                  <td>
                    <el-form-item label="" prop="accountStatus">
                      <el-input class="form-input" v-model="formData.accountStatus" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th><span style="color: red;">*</span> 角色：</th>
                  <td>
                    <div class="ztree-container">
                      <ul id="roleTree" class="ztree"></ul>
                    </div>
                  </td>
                  <th><span style="color: red;">*</span> 部门：</th>
                  <td>
                    <div class="ztree-container">
                      <ul id="deptTree" class="ztree"></ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>消息推送方式</th>
                  <td colspan="3">
                    <el-form-item label="" prop="noticeType">
                      <form-component
                        v-model="formData.noticeType"
                        type="checkbox"
                        :readOnly="readOnly"
                        dictionaryCode="noticeType"
                      ></form-component>
                    </el-form-item>
                  </td>
                </tr>
              </table>
            </el-collapse-item>
            <el-collapse-item title="B.个人基本信息" name="2">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th><span style="color: red;">*</span> 用户姓名：</th>
                  <td>
                    <el-form-item label="" prop="userName" :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.userName" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>账号等级：</th>
                  <td>
                    <el-form-item label="" prop="grade">
                      <el-input class="form-input" v-model="formData.grade" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>员工编号：</th>
                  <td>
                    <el-form-item label="" prop="employeeId" :rules="[$validate.Required]">
                      <el-input class="form-input" v-model="formData.employeeId" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>岗位：</th>
                  <td>
                    <el-form-item label="" prop="job">
                      <el-input class="form-input" v-model="formData.job" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>性别：</th>
                  <td>
                    <el-form-item label="" prop="sex">
                      <form-component
                        v-model="formData.sex"
                        type="radio"
                        :readOnly="readOnly"
                        dictionaryCode="sex"
                      ></form-component>
                    </el-form-item>
                  </td>
                  <th>出生日期：</th>
                  <td>
                    <el-form-item label="" prop="birthday">
                      <el-date-picker
                        v-model="formData.birthday"
                        type="date"
                        :readonly="readOnly">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>员工状态：</th>
                  <td>
                    <el-form-item label="" prop="jobPosition">
                      <form-component
                        v-model="formData.jobPosition"
                        type="select"
                        :readOnly="readOnly"
                        dictionaryCode="jobPosition"
                      ></form-component>
                    </el-form-item>
                  </td>
                  <th></th>
                  <td></td>
                </tr>
              </table>
            </el-collapse-item>
            <el-collapse-item title="C.联系方式" name="3">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th>工作电话：</th>
                  <td>
                    <el-form-item label="" prop="officeTel">
                      <el-input class="form-input" v-model="formData.officeTel" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>工作地址：</th>
                  <td>
                    <el-form-item label="" prop="officeAddres">
                      <el-input class="form-input" v-model="formData.officeAddres" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>工作传真：</th>
                  <td>
                    <el-form-item label="" prop="officeFax">
                      <el-input class="form-input" v-model="formData.officeFax" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>移动电话：</th>
                  <td>
                    <el-form-item label="" prop="mobile" :rules="[$validate.Mobile]">
                      <el-input class="form-input" v-model="formData.mobile" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>联系人：</th>
                  <td>
                    <el-form-item label="" prop="contactMan">
                      <el-input class="form-input" v-model="formData.contactMan" ></el-input>
                    </el-form-item>
                  </td>
                  <th>联系电话：</th>
                  <td>
                    <el-form-item label="" prop="contactPhone">
                      <el-input class="form-input" v-model="formData.contactPhone" ></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>住宅电话：</th>
                  <td>
                    <el-form-item label="" prop="homeTel" :rules="[$validate.Phone]">
                      <el-input class="form-input" v-model="formData.homeTel" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>住宅地址：</th>
                  <td>
                    <el-form-item label="" prop="homeAddress">
                      <el-input class="form-input" v-model="formData.homeAddress" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>邮编：</th>
                  <td>
                    <el-form-item label="" prop="postalCode" :rules="[$validate.PostCode]">
                      <el-input class="form-input" v-model="formData.postalCode" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>个人博客：</th>
                  <td>
                    <el-form-item label="" prop="blog">
                      <el-input class="form-input" v-model="formData.blog" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>QQ：</th>
                  <td>
                    <el-form-item label="" prop="qqNumber" :rules="[$validate.QQ]">
                      <el-input class="form-input" v-model="formData.qqNumber" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>微信：</th>
                  <td>
                    <el-form-item label="" prop="wechatNumber">
                      <el-input class="form-input" v-model="formData.wechatNumber" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>邮箱：</th>
                  <td>
                    <el-form-item label="" prop="email" :rules="[$validate.Email]">
                      <el-input class="form-input" v-model="formData.email" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th></th>
                  <td>
                  </td>
                </tr>
              </table>
            </el-collapse-item>
            <el-collapse-item title="D.学历职称" name="4">
              <table class="form-table" width="100%">
                <colgroup>
                  <col width="12%"/>
                  <col width="38%"/>
                  <col width="12%"/>
                  <col width="38%"/>
                </colgroup>
                <tr>
                  <th>证件名称：</th>
                  <td>
                    <el-form-item label="" prop="identityNam">
                      <el-input class="form-input" v-model="formData.identityNam" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th>证件号码：</th>
                  <td>
                    <el-form-item label="" prop="identityCode">
                      <el-input class="form-input" v-model="formData.identityCode" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>学历：</th>
                  <td>
                    <el-form-item label="" prop="education">
                      <form-component
                        v-model="formData.education"
                        type="select"
                        :readOnly="readOnly"
                        dictionaryCode="education"
                      ></form-component>
                    </el-form-item>
                  </td>
                  <th>学位：</th>
                  <td>
                    <el-form-item label="" prop="degree">
                      <el-input class="form-input" v-model="formData.degree" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <th>毕业学校：</th>
                  <td>
                    <el-form-item label="" prop="university">
                      <el-input class="form-input" v-model="formData.university" :readonly="readOnly"></el-input>
                    </el-form-item>
                  </td>
                  <th></th>
                  <td></td>
                </tr>
              </table>
            </el-collapse-item>
          </el-collapse>
      </el-form>
      <el-dialog title="上传头像" width="700px" :visible.sync="metaData.dialogVisible">
        <div class="cropper-content">
          <div class="cropper">
            <vue-cropper
              ref="cropper"
              :img="metaData.cropperOption.img"
              :outputSize="metaData.cropperOption.size"
              :outputType="metaData.cropperOption.outputType"
              :info="false"
              :full="metaData.cropperOption.full"
              :canMove="metaData.cropperOption.canMove"
              :canMoveBox="metaData.cropperOption.canMoveBox"
              :original="metaData.cropperOption.original"
              :autoCrop="metaData.cropperOption.autoCrop"
              :fixedBox="metaData.cropperOption.fixedBox"
              :fixed="metaData.cropperOption.fixed"
              @realTime="realTime"
              @imgLoad="imgLoad"
            ></vue-cropper>
          </div>
        </div>
        <div :style="{'width': '150px', 'height':'155px',  'overflow': 'hidden', 'margin': '5px'}">
          <div style="width:150px;height:160px;">
            <img :src="metaData.previews.url" :style="metaData.previews.img">
          </div>
        </div>
        <label class="btn btn-orange" for="uploads" style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">选择图片</label>
        <input type="file" id="uploads" :value="metaData.imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <el-button size="mini" title="放大" @click="changeScale(1)">+</el-button>
        <el-button size="mini" title="缩小" @click="changeScale(-1)">-</el-button>
        <el-button size="mini" title="左旋转" @click="rotateLeft">↺</el-button>
        <el-button size="mini" title="右旋转" @click="rotateRight">↻</el-button>
        <el-button size="mini" @click="uploadAvator()">上传</el-button>
        <div slot="footer" class="dialog-footer">
          <el-button @click="metaData.dialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TreeTool from '@/class/ztreeTool/treeTool';
import rightNavLayout from '@/components/topToolBar';
import formComponent from '@/components/formComponent';
import { VueCropper } from 'vue-cropper';
import { mapGetters } from 'vuex';
export default {
  components: {
    rightNavLayout,
    formComponent,
    VueCropper
  },
  data ()
  {
    return {
      activeNames: ['1', '2', '3', '4'],
      metaData: {
        previews: {},
        cropperOption: {
          img: '',
          outputSize: 1, // 剪切后的图片质量（0.1-1）
          full: true, // 输出原图比例截图 props名full
          outputType: 'png',
          canMove: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 150,
          autoCropHeight: 150,
          fixedBox: true,
          fixed: false
        },
        fileName: '', // 本机文件地址
        imgFile: '',
        dialogVisible: false, // 是否弹出头像预览
        deptTreeTool: null,
        roleTreeTool: null
      }
    };
  },
  methods: {
    /**
     * 表单提交
     * @author   chenguang
     * @date     2018/9/29
     */
    saveFn ()
    {
      if (this.formData.id !== undefined)
      {
        this.formData.password = '';
      }
      if (this.formData.id === undefined && this.formData.password !== this.formData.confirmPassword)
      { // id为undefind，为新增用户操作,需要进行密码判断
        this.$message('密码确认不一致！');
        return;
      }
      if (this.formData.id === undefined && this.formData.password === '')
      { // id为undefind，为新增用户操作,需要进行密码判断
        this.$message('密码不能为空');
        return;
      }
      let roleIds = this.metaData.roleTreeTool.getCheckedNodesIdsExceptTypes('Dept,DeptRoot');
      if (roleIds === '')
      {
        this.$message('角色不能为空！');
        return;
      }
      let deptIds = this.metaData.deptTreeTool.getCheckedNodesIdsExceptTypes('DeptRoot');
      if (deptIds === '')
      {
        this.$message('单位不能为空！');
        return;
      }
      this.$confirm('确认保存数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>
      {
        this.$refs['ctForm'].validate((valid) =>
        {
          if (valid)
          {
            let obj = {};
            // id为空说明是新增的
            if (this.formData.id === '')
            {
            }
            else
            {
              obj = Object.assign({}, this.formData, {
                roleIds: roleIds,
                deptIds: deptIds
              });
            }
            this.loading = true;
            this.$store.dispatch('backStageSystem/_USER/save', obj);
          }
          else
          {
            return false;
          }
        });
      });
    },
    /**
     * 返回
     * @author   yekuncai
     * @date     2018/10/22
     */
    returnFn ()
    {
      this.$store.dispatch('backStageSystem/_USER/showList', this.deptId);
    },
    /**
     * 重置密码
     * @author   chenguang
     * @date     2019/1/6
     */
    resetPwdFn ()
    {
      this.$store.dispatch('backStageSystem/_USER/resetPwd', {userId: this.formData.id}).then((responseData) =>
      {
        this.$confirm(`密码重置成功!\t重置密码为'123456'`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
      });
    },
    /**
     * 开启头像上传modal框
     * @author   chenguang
     * @date     2018/12/20
     */
    openAvator ()
    {
      this.metaData.dialogVisible = true;
    },
    /**
     * 放大/缩小
     * @author   chenguang
     * @date     2018/12/21
     */
    changeScale (num)
    {
      console.log('changeScale');
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    /**
     * 左旋转
     * @author   chenguang
     * @date     2018/12/21
     */
    rotateLeft ()
    {
      console.log('rotateLeft');
      this.$refs.cropper.rotateLeft();
    },
    /**
     * 右旋转
     * @author   chenguang
     * @date     2018/12/21
     */
    rotateRight ()
    {
      console.log('rotateRight');
      this.$refs.cropper.rotateRight();
    },
    /**
     * 图片上传
     * @author   chenguang
     * @date     2018/12/21
     */
    uploadAvator ()
    {
      this.$refs.cropper.getCropData((data) =>
      {
        let image = data.split(',');
        let avatorOfBase64 = image[1];
        this.$store.dispatch('backStageSystem/_USER/uploadAvator', {userId: this.formData.id, avatorOfBase64: avatorOfBase64}).then((responseData) =>
        {
          this.formData.avator = data;
        });
      });
    },
    /**
     * 实时预览
     * @author   chenguang
     * @date     2018/12/21
     */
    realTime (data)
    {
      this.metaData.previews = data;
    },
    // 选择本地图片
    uploadImg (e, num)
    {
      console.log('uploadImg');
      var _this = this;
      // 上传图片
      var file = e.target.files[0];
      _this.fileName = file.name;
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value))
      {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
        return false;
      }
      var reader = new FileReader();
      reader.onload = (e) =>
      {
        let data;
        if (typeof e.target.result === 'object')
        {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        }
        else
        {
          data = e.target.result;
        }
        if (num === 1)
        {
          _this.metaData.cropperOption.img = data;
        }
        else if (num === 2)
        {
          _this.example2.img = data;
        }
      };
      reader.readAsArrayBuffer(file);
    },
    imgLoad (msg)
    {
      console.log('imgLoad');
      console.log(msg);
    }
  },
  computed: {
    ...mapGetters('backStageSystem/_USER', [
      'readOnly',
      'formData',
      'roleTree',
      'deptTree',
      'deptId',
      'isAddEditShow',
      'navigateMenus',
      'operateBtns'
    ])
  },
  watch: {
    roleTree (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.roleTreeTool = new TreeTool('roleTree', this.roleTree, true);
          this.metaData.roleTreeTool.setCheck();
          this.metaData.roleTreeTool.expandLevel('roleTree', 3);
        }
      }, 20);
    },
    deptTree (newValue, oldValue)
    {
      setTimeout(() =>
      {
        if (newValue.length !== 0)
        {
          this.metaData.deptTreeTool = new TreeTool('deptTree', this.deptTree, true);
          this.metaData.deptTreeTool.setCheck();
          this.metaData.deptTreeTool.setChkboxType({Y: '', N: ''});
          this.metaData.deptTreeTool.expandLevel('deptTree', 2);
        }
      }, 20);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../../../common/less/common';
.lzy-form-wrapper {
  .form-container {
    overflow-x: hidden;
    /deep/ .el-dialog__body {
      overflow: hidden;
    }
    .info {
      width: 720px;
      margin: 0 auto;
      .oper-dv {
        height:20px;
        text-align:right;
        margin-right:100px;
        a {
          font-weight: 500;
          &:last-child {
            margin-left: 30px;
          }
        }
      }
      .info-item {
        margin-top: 15px;
        label {
          display: inline-block;
          width: 100px;
          text-align: right;
        }
        .sel-img-dv {
          position: relative;
          .sel-file {
            position: absolute;
            width: 90px;
            height: 30px;
            opacity: 0;
            cursor: pointer;
            z-index: 2;
          }
          .sel-btn {
            position: absolute;
            cursor: pointer;
            z-index: 1;
          }
        }
      }
    }

    .cropper-content{
      display: flex;
      display: -webkit-flex;
      justify-content: flex-end;
      -webkit-justify-content: flex-end;
      .cropper{
        width: 260px;
        height: 260px;
      }
      .show-preview{
        flex: 1;
        -webkit-flex: 1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        .preview{
          overflow: hidden;
          border-radius: 50%;
          border:1px solid #cccccc;
          background: #cccccc;
          margin-left: 40px;
        }
      }
    }
    .cropper-content .show-preview .preview {margin-left: 0;}
  }
  }
</style>
