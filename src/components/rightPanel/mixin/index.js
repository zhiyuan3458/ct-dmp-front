/* 左边树容器的箭头宽度 */
const ARROW_WIDTH = 10;
/* 默认的左边树容器的宽度 */
const DEFAULT_COLLASPE_WIDTH = 230;
export default {
  data ()
  {
    return {
      collapseObjWidth: this.collapseObj.width || DEFAULT_COLLASPE_WIDTH,
      collapseObjMarginLeft: 0,
      rightCotentMarginLeft: (this.collapseObj.width || DEFAULT_COLLASPE_WIDTH) + 10,
      arrowClass: 'collapsed-arrow'
    };
  },
  props: {
    collapseObj: Object
  },
  methods: {
    // 拖拽可伸缩侧导航栏函数
    drag (e)
    {
      // 如果是按了箭头收缩的话，就不给拉动
      if (e.target.className.indexOf('arrowIcon') >= 0)
      {
        return false;
      }
      // 看传入的draggable值是否为true才给拉伸
      if (this.collapseObj.draggable)
      {
        let that = this;
        document.onmousemove = function (e)
        {
          e.preventDefault();
          e.stopPropagation();
          let currentX = e.clientX - 51;
          let documentWidth = document.body.clientWidth;
          documentWidth = documentWidth - 500;
          if (currentX <= 150)
          {
            that.collapseObjWidth = 150;
            that.rightCotentMarginLeft = 150 + ARROW_WIDTH;
            return false;
          }
          if (currentX >= documentWidth)
          {
            that.collapseObjWidth = documentWidth;
            that.rightCotentMarginLeft = documentWidth + ARROW_WIDTH;
            return false;
          }
          that.rightCotentMarginLeft = currentX + ARROW_WIDTH;
          that.collapseObjWidth = currentX;
        };

        document.onmouseup = function ()
        {
          document.onmousemove = null;
        };
      }
      else
      {
        return false;
      }
    },

    // 点击侧导航栏的伸缩符可以伸缩侧导航栏
    handleCollapse ()
    {
      if (this.collapseObj.collapsable)
      {
        let collapseObjMarginLeft = this.collapseObjMarginLeft;
        if (collapseObjMarginLeft === 0)
        {
          this.collapseObjMarginLeft = -this.collapseObjWidth;
          this.rightCotentMarginLeft = ARROW_WIDTH;
          this.arrowClass = 'open-arrow';
          this.collapseObj.draggable = false;
        }
        else
        {
          this.collapseObjMarginLeft = 0;
          this.rightCotentMarginLeft = this.collapseObjWidth + ARROW_WIDTH;
          this.arrowClass = 'collapsed-arrow';
          this.collapseObj.draggable = true;
        }
      }
      else
      {

      }
    }
  }
};
