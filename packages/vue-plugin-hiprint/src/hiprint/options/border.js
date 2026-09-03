export var borderRadius = function () {
  function t() { this.name = "borderRadius"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) { if (value) { $el.css('border-raduis', value); } }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('边框圆角')}</div>
      <div class="hiprint-option-item-field"><input type="text" class="auto-submit"/></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var borderWidth = function () {
  function t() { this.name = "borderWidth"; }
  t.prototype.createTarget = function (options) {
    var label = ['hline', 'vline', 'rect', 'oval'].includes(options.printElementType.type) ? `${i18n.__('线宽')}` : `${i18n.__('边框大小')}`;
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${label}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="0.75" >0.75pt</option><option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option>
          <option value="3" >3pt</option><option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option>
          <option value="5.25" >5.25pt</option><option value="6" >6pt</option><option value="6.75" >6.75pt</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("border-width", value + "pt"); return "border-width:" + value + "pt"; }
      $el[0].style.borderWidth = "";
    }
    return null;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val.toString(); };
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

export var borderColor = function () {
  function t() { this.name = "borderColor"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("border-color", value); return "border-color:" + value; }
      $el[0].style.borderColor = "";
    }
    return null;
  };
  t.prototype.createTarget = function (options) {
    var label = ['hline', 'vline', 'rect', 'oval'].includes(options.printElementType.type) ? `${i18n.__('颜色')}` : `${i18n.__('边框颜色')}`;
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${label}</div>
      <div class="hiprint-option-item-field"><input type="text" class="auto-submit"/></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) {
    this.target.find("input").minicolors({ defaultValue: value || "", theme: "bootstrap" });
    this.target.find("input").val(value);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var backgroundColor = function () {
  function t() { this.name = "backgroundColor"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("background-color", value); return "background-color:" + value; }
      $el[0].style.backgroundColor = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('背景颜色')}</div>
      <div class="hiprint-option-item-field"><input type="text" class="auto-submit"/></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) {
    this.target.find("input").minicolors({ defaultValue: value || "", theme: "bootstrap" });
    this.target.find("input").val(value);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var optionsGroup = function () {
  function t() { this.name = "optionsGroup"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('边框设置')}</div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { };
  t.prototype.setValue = function (value) { };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var borderTop = function () {
  function t() { this.name = "borderTop"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("border-top-style", value); return "border-top:1px"; }
      $el[0].style.borderTopStyle = ""; $el[0].style.borderTopWidth = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('上边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('否')}</option>
          <option value="solid" >${i18n.__('实线')}</option>
          <option value="dotted" >${i18n.__('虚线')}</option>
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

export var borderLeft = function () {
  function t() { this.name = "borderLeft"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("border-left-style", value); return "border-left:1px"; }
      $el[0].style.borderLeftStyle = ""; $el[0].style.borderLeftWidth = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('左边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('否')}</option>
          <option value="solid" >${i18n.__('实线')}</option>
          <option value="dotted" >${i18n.__('虚线')}</option>
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

export var borderRight = function () {
  function t() { this.name = "borderRight"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("border-right-style", value); return "border-right:1px"; }
      $el[0].style.borderRightStyle = ""; $el[0].style.borderRightWidth = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('右边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('否')}</option>
          <option value="solid" >${i18n.__('实线')}</option>
          <option value="dotted" >${i18n.__('虚线')}</option>
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

export var borderBottom = function () {
  function t() { this.name = "borderBottom"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("border-bottom-style", value); return "border-bottom-style:1px solid"; }
      $el[0].style.borderBottomStyle = ""; $el[0].style.borderBottomWidth = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('下边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('否')}</option>
          <option value="solid" >${i18n.__('实线')}</option>
          <option value="dotted" >${i18n.__('虚线')}</option>
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

export var borderStyle = function () {
  function t() { this.name = "borderStyle"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("border-style", value); return "border-style:1px"; }
      $el[0].style.borderStyle = "";
    }
    return null;
  };
  t.prototype.createTarget = function (options) {
    var label = ['hline', 'vline', 'rect', 'oval'].includes(options.printElementType.type) ? `${i18n.__('样式')}` : `${i18n.__('边框样式')}`;
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${label}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="solid" >${i18n.__('实线')}</option>
          <option value="dashed" >${i18n.__('长虚线')}</option>
          <option value="dotted" >${i18n.__('短虚线')}</option>
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

export var contentPaddingLeft = function () {
  function t() { this.name = "contentPaddingLeft"; }
  t.prototype.css = function ($el, value) {
    var n = $el.find(".hiprint-printElement-content");
    if (n && n.length) {
      if (value) { n.css("padding-left", value + "pt"); return "padding-left"; }
      n[0].style.paddingLeft = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('左内边距')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="0.75" >0.75pt</option><option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option>
          <option value="3" >3pt</option><option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option>
          <option value="5.25" >5.25pt</option><option value="6" >6pt</option><option value="6.75" >6.75pt</option>
          <option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option>
          <option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option>
          <option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option>
          <option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option>
          <option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option>
          <option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option>
          <option value="21" >21pt</option><option value="21.75" >21.75pt</option>
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

export var contentPaddingTop = function () {
  function t() { this.name = "contentPaddingTop"; }
  t.prototype.css = function ($el, value) {
    var n = $el.find(".hiprint-printElement-content");
    if (n && n.length) {
      if (value) { n.css("padding-top", value + "pt"); return "padding-top"; }
      n[0].style.paddingTop = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('上内边距')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="0.75" >0.75pt</option><option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option>
          <option value="3" >3pt</option><option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option>
          <option value="5.25" >5.25pt</option><option value="6" >6pt</option><option value="6.75" >6.75pt</option>
          <option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option>
          <option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option>
          <option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option>
          <option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option>
          <option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option>
          <option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option>
          <option value="21" >21pt</option><option value="21.75" >21.75pt</option>
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

export var contentPaddingRight = function () {
  function t() { this.name = "contentPaddingRight"; }
  t.prototype.css = function ($el, value) {
    var n = $el.find(".hiprint-printElement-content");
    if (n && n.length) {
      if (value) { n.css("padding-right", value + "pt"); return "padding-right"; }
      n[0].style.paddingRight = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('右内边距')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="0.75" >0.75pt</option><option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option>
          <option value="3" >3pt</option><option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option>
          <option value="5.25" >5.25pt</option><option value="6" >6pt</option><option value="6.75" >6.75pt</option>
          <option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option>
          <option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option>
          <option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option>
          <option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option>
          <option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option>
          <option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option>
          <option value="21" >21pt</option><option value="21.75" >21.75pt</option>
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

export var contentPaddingBottom = function () {
  function t() { this.name = "contentPaddingBottom"; }
  t.prototype.css = function ($el, value) {
    var n = $el.find(".hiprint-printElement-content");
    if (n && n.length) {
      if (value) { n.css("padding-bottom", value + "pt"); return "padding-bottom"; }
      n[0].style.paddingBottom = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('下内边距')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="0.75" >0.75pt</option><option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option>
          <option value="3" >3pt</option><option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option>
          <option value="5.25" >5.25pt</option><option value="6" >6pt</option><option value="6.75" >6.75pt</option>
          <option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option>
          <option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option>
          <option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option>
          <option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option>
          <option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option>
          <option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option>
          <option value="21" >21pt</option><option value="21.75" >21.75pt</option>
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

export var paddingLeft = function () {
  function t() { this.name = "paddingLeft"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("padding-left", value + "pt"); return "padding-left"; }
      $el[0].style.paddingLeft = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('左内边距')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="0.75" >0.75pt</option><option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option>
          <option value="3" >3pt</option><option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option>
          <option value="5.25" >5.25pt</option><option value="6" >6pt</option><option value="6.75" >6.75pt</option>
          <option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option>
          <option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option>
          <option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option>
          <option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option>
          <option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option>
          <option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option>
          <option value="21" >21pt</option><option value="21.75" >21.75pt</option>
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

export var paddingRight = function () {
  function t() { this.name = "paddingRight"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("padding-right", value + "pt"); return "padding-right"; }
      $el[0].style.paddingRight = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('右内边距')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="0.75" >0.75pt</option><option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option>
          <option value="3" >3pt</option><option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option>
          <option value="5.25" >5.25pt</option><option value="6" >6pt</option><option value="6.75" >6.75pt</option>
          <option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option>
          <option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option>
          <option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option>
          <option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option>
          <option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option>
          <option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option>
          <option value="21" >21pt</option><option value="21.75" >21.75pt</option>
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

export var align = function () {
  function t() { this.name = "align"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('单元格左右对齐')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="left" >${i18n.__('居左')}</option>
          <option value="center" >${i18n.__('居中')}</option>
          <option value="right" >${i18n.__('居右')}</option>
          <option value="justify" >${i18n.__('两端对齐')}</option>
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

export var vAlign = function () {
  function t() { this.name = "vAlign"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('单元格上下对齐')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="top" >${i18n.__('上')}</option>
          <option value="middle" >${i18n.__('中')}</option>
          <option value="bottom" >${i18n.__('下')}</option>
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

export var halign = function () {
  function t() { this.name = "halign"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表格头单元格左右对齐')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="left" >${i18n.__('居左')}</option>
          <option value="center" >${i18n.__('居中')}</option>
          <option value="right" >${i18n.__('居右')}</option>
          <option value="justify" >${i18n.__('两端对齐')}</option>
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
