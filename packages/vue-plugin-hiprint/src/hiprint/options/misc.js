export var hideTitle = function () {
  function t() { this.name = "hideTitle"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('标题显示隐藏')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="false" >${i18n.__('显示')}</option>
          <option value="true" >${i18n.__('隐藏')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { if ("true" == this.target.find("select").val()) return true; };
  t.prototype.setValue = function (value) { this.target.find("select").val((value == null ? "" : value).toString()); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var field = function () {
  function t() { this.name = "field"; }
  t.prototype.createTarget = function (options) {
    var fields;
    if (options && (fields = options.getFields()), fields) {
      this.isSelect = true;
      var html = `<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__('字段名')}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="" >${i18n.__('请选择字段')}</option>`;
      fields.forEach(function (f) {
        html += ' <option value="' + (f.field || "") + '" >' + (f.text || "") + "</option>";
      });
      html += " </select></div></div>";
      this.target = $(html);
    } else {
      this.isSelect = false;
      this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__('字段名')}</div>
        <div class="hiprint-option-item-field">
          <input type="text" placeholder="${i18n.__('请输入字段名')}" class="auto-submit">
        </div>
      </div>`);
    }
    return this.target;
  };
  t.prototype.getValue = function () {
    return (this.isSelect ? this.target.find("select").val() : this.target.find("input").val()) || void 0;
  };
  t.prototype.setValue = function (value) {
    if (this.isSelect) {
      if (value) {
        if (!this.target.find('option[value="' + value + '"]').length) {
          this.target.find("select").prepend('<option value="' + value + '" >' + value + "</option>");
        }
        this.target.find("select").val(value);
      }
    } else {
      this.target.find("input").val(value);
    }
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var title = function () {
  function t() { this.name = "title"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('标题')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:50px;" placeholder="${i18n.__('请输入标题')}" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var testData = function () {
  function t() { this.name = "testData"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('测试数据')}</div>
      <div class="hiprint-option-item-field">
        <input type="text" placeholder="${i18n.__('仅字段名称存在时有效')}" class="auto-submit">
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var src = function () {
  function t() { this.name = "src"; }
  t.prototype.createTarget = function (options) {
    this.el = options;
    var callback;
    if (options && (callback = options.getOnImageChooseClick()), callback) {
      var self = this;
      this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__('图片地址')}</div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
          <input type="text" placeholder="${i18n.__('请输入图片地址')}" class="auto-submit" style="width:70%">
          <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__('选择')}</button>
        </div>
      </div>`);
      this.target.find('button').click(function () { callback && callback(self); });
    } else {
      this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
        <div class="hiprint-option-item-label">${i18n.__('图片地址')}</div>
        <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
          <input type="text" placeholder="${i18n.__('请输入图片地址')}" class="auto-submit" style="width:70%">
          <button class="hiprint-option-item-settingBtn" style="padding:0 10px;margin:0 0 0 5px" type="button">${i18n.__('选择')}</button>
        </div>
      </div>`);
    }
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.refresh = function (value, opt, cb) {
    var that = this;
    this.setValue(value);
    this.target.find("input").change();
    if (this.el && opt) {
      var img = new Image();
      img.src = value;
      if (img.complete) {
        that.updateEl(img.width, img.height, opt, cb);
      } else {
        img.onload = function () { that.updateEl(img.width, img.height, opt, cb); };
      }
    }
  };
  t.prototype.updateEl = function (width, height, opt, cb) {
    if (opt) {
      var ratio, w, h;
      if (opt && opt.auto) {
        if (width >= height) { opt.width = true; } else { opt.height = true; }
      }
      if (opt.width) {
        ratio = height / width;
        w = this.el.options.width;
        h = Math.floor(w * ratio * 10) / 10;
        this.el.options.height = h;
        this.el.designTarget.css('height', h + "pt");
      } else if (opt.height) {
        ratio = width / height;
        h = this.el.options.height;
        w = Math.floor(h * ratio * 10) / 10;
        this.el.options.width = w;
        this.el.designTarget.css('width', w + "pt");
      } else if (opt.real) {
        w = hinnn.px.toPt(width);
        h = hinnn.px.toPt(height);
        this.el.options.width = w;
        this.el.options.height = h;
        this.el.designTarget.css('width', w + "pt");
        this.el.designTarget.css('height', h + "pt");
      }
      this.el.designTarget.children('.resize-panel').trigger($.Event('click'));
    }
    cb && cb(this.el, width, height);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var imageFit = function () {
  function t() { this.name = "fit"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.find("img").css("object-fit", value); return "object-fit:" + value; }
      $el.find("img")[0].style['object-fit'] = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('图片缩放')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="contain" >${i18n.__('等比')}</option>
          <option value="cover" >${i18n.__('剪裁')}</option>
          <option value="fill" >${i18n.__('填充')}</option>
          <option value="none" >${i18n.__('原始尺寸')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { return this.target.find("select").val(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var paperNumberFormat = function () {
  function t() { this.name = "paperNumberFormat"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('页码格式')}</div>
      <div class="hiprint-option-item-field">
        <input type="text" placeholder="\${paperNo}-\${paperCount}" class="auto-submit">
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var paperNumberDisabled = function () {
  function t() { this.name = "paperNumberDisabled"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('显示页码')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('显示')}</option>
          <option value="true" >${i18n.__('隐藏')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { if ("true" == this.target.find("select").val()) return true; };
  t.prototype.setValue = function (value) { this.target.find("select").val((value == null ? "" : value).toString()); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var paperNumberContinue = function () {
  function t() { this.name = "paperNumberContinue"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('页码续排')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="true" >${i18n.__('续排')}</option>
          <option value="reset" >${i18n.__('重排')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { return "true" == this.target.find("select").val(); };
  t.prototype.setValue = function (value) { this.target.find("select").val((value == void 0 || value ? "true" : "reset").toString()); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var longTextIndent = function () {
  function t() { this.name = "longTextIndent"; }
  t.prototype.css = function () { return null; };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('每行缩进')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="6" >6pt</option><option value="6.75" >6.75pt</option><option value="7.5" >7.5pt</option>
          <option value="8.25" >8.25pt</option><option value="9" >9pt</option><option value="9.75" >9.75pt</option>
          <option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option><option value="12" >12pt</option>
          <option value="12.75" >12.75pt</option><option value="13.5" >13pt</option><option value="14.25" >14.25pt</option>
          <option value="15" >15pt</option><option value="15.75" >15.75pt</option><option value="16.5" >16.5pt</option>
          <option value="17.25" >17.25pt</option><option value="18" >18pt</option><option value="18.75" >18.75pt</option>
          <option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option><option value="21" >21pt</option>
          <option value="21.75" >21.75pt</option><option value="22.5" >22.5pt</option><option value="23.25" >23.25pt</option>
          <option value="24" >24pt</option><option value="24.75" >24.75pt</option><option value="25.5" >25.5pt</option>
          <option value="26.25" >26.25pt</option><option value="27" >27pt</option><option value="27.75" >27.75pt</option>
          <option value="28.5" >28.5pt</option><option value="29.25" >29.25pt</option><option value="30" >30pt</option>
          <option value="30.75" >30.75pt</option><option value="31.5" >31.5pt</option><option value="32.25" >32.25pt</option>
          <option value="33" >33pt</option><option value="33.75" >33.75pt</option><option value="34.5" >34.5pt</option>
          <option value="35.25" >35.25pt</option><option value="36" >36pt</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) {
    if (value) {
      if (!this.target.find('option[value="' + value + '"]').length) {
        this.target.find("select").prepend('<option value="' + value + '" >' + value + "</option>");
      }
    }
    this.target.find("select").val(value);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var showInPage = function () {
  function t() { this.name = "showInPage"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value && 'none' == value) { $el.addClass('alwaysHide'); }
      else { $el.removeClass('alwaysHide'); }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('显示规则')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="none" >${i18n.__('始终隐藏')}</option>
          <option value="first" >${i18n.__('首页')}</option>
          <option value="odd" >${i18n.__('奇数页')}</option>
          <option value="even" >${i18n.__('偶数页')}</option>
          <option value="last" >${i18n.__('尾页')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var pageBreak = function () {
  function t() { this.name = "pageBreak"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value && 'none' == value) { $el.addClass('alwaysHide'); }
      else { $el.removeClass('alwaysHide'); }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('强制分页')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="true" >${i18n.__('是')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { if ("true" == this.target.find("select").val()) return true; };
  t.prototype.setValue = function (value) { this.target.find("select").val((value == null ? "" : value).toString()); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var panelPaperRule = function () {
  function t() { this.name = "panelPaperRule"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('打印规则')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="odd" >${i18n.__('保持奇数')}</option>
          <option value="even" >${i18n.__('保持偶数')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var panelPageRule = function () {
  function t() { this.name = "panelPageRule"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('分页规则')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="none" >${i18n.__('不分页')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var firstPaperFooter = function () {
  function t() { this.name = "firstPaperFooter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('首页页尾')}</div>
      <div class="hiprint-option-item-field"><input type="text" placeholder="${i18n.__('首页页尾')}" class="auto-submit"></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var lastPaperFooter = function () {
  function t() { this.name = "lastPaperFooter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('尾页页尾')}</div>
      <div class="hiprint-option-item-field"><input type="text" placeholder="${i18n.__('尾页页尾')}" class="auto-submit"></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var evenPaperFooter = function () {
  function t() { this.name = "evenPaperFooter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('偶数页页尾')}</div>
      <div class="hiprint-option-item-field"><input type="text" placeholder="${i18n.__('偶数页页尾')}" class="auto-submit"></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var oddPaperFooter = function () {
  function t() { this.name = "oddPaperFooter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('奇数页页尾')}</div>
      <div class="hiprint-option-item-field"><input type="text" placeholder="${i18n.__('奇数页页尾')}" class="auto-submit"></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var unShowInPage = function () {
  function t() { this.name = "unShowInPage"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('隐藏规则')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="first" >${i18n.__('首页')}</option>
          <option value="last" >${i18n.__('尾页')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var orient = function () {
  function t() { this.name = "orient"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('纸张方向(仅自定义纸质有效)')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="1" >${i18n.__('纵向')}</option>
          <option value="2" >${i18n.__('横向')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var textContentVerticalAlign = function () {
  function t() { this.name = "textContentVerticalAlign"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('上下对齐')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="middle" >${i18n.__('垂直居中')}</option>
          <option value="bottom" >${i18n.__('底部')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      $el.removeClass("hiprint-text-content-middle");
      $el.removeClass("hiprint-text-content-bottom");
      if (value) {
        if ("middle" === value) { $el.addClass("hiprint-text-content-middle"); }
        if ("bottom" === value) { $el.addClass("hiprint-text-content-bottom"); }
        return "";
      }
    }
    return null;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var textWrap = function () {
  function t() { this.name = "textContentWrap"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('文本换行')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="nowrap" >${i18n.__('不换行')}</option>
          <option value="clip" >${i18n.__('不换行&隐藏')}</option>
          <option value="ellipsis" >${i18n.__('不换行&省略')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      $el.removeClass("hiprint-text-content-wrap");
      $el.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-nowrap");
      $el.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-clip");
      $el.find(".hiprint-printElement-text-content").removeClass("hiprint-text-content-wrap-ellipsis");
      if (value) {
        $el.addClass("hiprint-text-content-wrap");
        $el.find(".hiprint-printElement-text-content").addClass("hiprint-text-content-wrap-" + value);
        return "";
      }
    }
    return null;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();
