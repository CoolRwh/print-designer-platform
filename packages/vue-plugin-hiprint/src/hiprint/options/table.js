export var tableBorder = function () {
  function t() { this.name = "tableBorder"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("table").length) {
      if ("border" == value || value == void 0) { $el.find("table").css("border", "1px solid"); return "border:1px solid"; }
      if ("noBorder" == value) { $el.find("table").css("border", "0px solid"); } else { $el.find("table")[0].style.border = ""; }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表格边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="border" >${i18n.__('有边框')}</option>
          <option value="noBorder" >${i18n.__('无边框')}</option>
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

export var tableHeaderBorder = function () {
  function t() { this.name = "tableHeaderBorder"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("thead tr").length) {
      if ("border" == value || value == void 0) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-all"); }
      else if ("noBorder" == value) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-none"); }
      else if ("leftBorder" == value) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-left"); }
      else if ("rightBorder" == value) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-right"); }
      else if ("leftRightBorder" == value) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-lr"); }
      else if ("topBorder" == value) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-top"); }
      else if ("bottomBorder" == value) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-bottom"); }
      else if ("topBottomBorder" == value) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-tb"); }
      else { $el.find("thead tr").removeClass(); }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表头边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="border" >${i18n.__('有边框')}</option>
          <option value="noBorder" >${i18n.__('无边框')}</option>
          <option value="leftBorder" >${i18n.__('左边框')}</option>
          <option value="rightBorder" >${i18n.__('右边框')}</option>
          <option value="leftRightBorder" >${i18n.__('左右边框')}</option>
          <option value="topBorder" >${i18n.__('上边框')}</option>
          <option value="bottomBorder" >${i18n.__('下边框')}</option>
          <option value="topBottomBorder" >${i18n.__('上下边框')}</option>
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

export var tableHeaderCellBorder = function () {
  function t() { this.name = "tableHeaderCellBorder"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("thead tr").length) {
      if ("border" == value || value == void 0) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-td-all"); }
      else if ("noBorder" == value) { $el.find("thead tr").addClass("hiprint-printElement-tableTarget-border-td-none"); }
      else { $el.find("thead tr").removeClass(); }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表头单元格边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="border" >${i18n.__('有边框')}</option>
          <option value="noBorder" >${i18n.__('无边框')}</option>
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

export var tableFooterBorder = function () {
  function t() { this.name = "tableFooterBorder"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("tfoot tr").length) {
      if ("border" == value || value == void 0) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-all"); }
      else if ("noBorder" == value) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-none"); }
      else if ("leftBorder" == value) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-left"); }
      else if ("rightBorder" == value) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-right"); }
      else if ("leftRightBorder" == value) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-lr"); }
      else if ("topBorder" == value) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-top"); }
      else if ("bottomBorder" == value) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-bottom"); }
      else if ("topBottomBorder" == value) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-tb"); }
      else { $el.find("tfoot tr").removeClass(); }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表尾边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="border" >${i18n.__('有边框')}</option>
          <option value="noBorder" >${i18n.__('无边框')}</option>
          <option value="leftBorder" >${i18n.__('左边框')}</option>
          <option value="rightBorder" >${i18n.__('右边框')}</option>
          <option value="leftRightBorder" >${i18n.__('左右边框')}</option>
          <option value="topBorder" >${i18n.__('上边框')}</option>
          <option value="bottomBorder" >${i18n.__('下边框')}</option>
          <option value="topBottomBorder" >${i18n.__('上下边框')}</option>
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

export var tableFooterCellBorder = function () {
  function t() { this.name = "tableFooterCellBorder"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("tfoot tr").length) {
      if ("border" == value || value == void 0) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-td-all"); }
      else if ("noBorder" == value) { $el.find("tfoot tr").addClass("hiprint-printElement-tableTarget-border-td-none"); }
      else { $el.find("tfoot tr").removeClass(); }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表尾单元格边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="border" >${i18n.__('有边框')}</option>
          <option value="noBorder" >${i18n.__('无边框')}</option>
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

export var tableHeaderRowHeight = function () {
  function t() { this.name = "tableHeaderRowHeight"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("thead tr td").length) {
      if (value) { $el.find("thead tr td:not([rowspan])").css("height", value + "pt"); return "height:" + value + "pt"; }
      $el.find("thead tr td").map(function (i, e) { e.style.height = ""; });
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表头行高')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="6" >6pt</option><option value="6.75" >6.75pt</option><option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option><option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option><option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option><option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option><option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option><option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option><option value="21" >21pt</option><option value="21.75" >21.75pt</option><option value="22.5" >22.5pt</option><option value="23.25" >23.25pt</option><option value="24" >24pt</option><option value="24.75" >24.75pt</option><option value="25.5" >25.5pt</option><option value="26.25" >26.25pt</option><option value="27" >27pt</option><option value="27.75" >27.75pt</option><option value="28.5" >28.5pt</option><option value="29.25" >29.25pt</option><option value="30" >30pt</option><option value="30.75" >30.75pt</option><option value="31.5" >31.5pt</option><option value="32.25" >32.25pt</option><option value="33" >33pt</option><option value="33.75" >33.75pt</option><option value="34.5" >34.5pt</option><option value="35.25" >35.25pt</option><option value="36" >36pt</option>
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

export var tableHeaderFontSize = function () {
  function t() { this.name = "tableHeaderFontSize"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("thead").length) {
      if (value) { $el.find("thead").css("font-size", value + "pt"); return "font-size:" + value + "pt"; }
      $el.find("thead").map(function (i, e) { e.style.fontSize = ""; });
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表头字体大小')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="6" >6pt</option><option value="6.75" >6.75pt</option><option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option><option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option><option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option><option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option><option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option><option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option><option value="21" >21pt</option><option value="21.75" >21.75pt</option>
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

export var tableHeaderFontWeight = function () {
  function t() { this.name = "tableHeaderFontWeight"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("thead").length) {
      if (value) { $el.find("thead tr td").css("font-weight", value); return "font-weight:" + value; }
      $el.find("thead tr td").map(function (i, e) { e.style.fontWeight = ""; });
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表头字体粗细')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="lighter" >${i18n.__('更细')}</option>
          <option value="bold" >${i18n.__('粗体')}</option>
          <option value="bolder" >${i18n.__('粗体+')}</option>
          <option value="100" >100</option><option value="200" >200</option><option value="300" >300</option><option value="400" >400</option><option value="500" >500</option><option value="600" >600</option><option value="700" >700</option><option value="800" >800</option><option value="900" >900</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val; };
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

export var tableBodyCellBorder = function () {
  function t() { this.name = "tableBodyCellBorder"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("tbody tr").length) {
      if ("border" == value || value == void 0) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-td-all"); }
      else if ("noBorder" == value) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-td-none"); }
      else { $el.find("tbody tr").removeClass(); }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表体单元格边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="border" >${i18n.__('有边框')}</option>
          <option value="noBorder" >${i18n.__('无边框')}</option>
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

export var tableBodyRowHeight = function () {
  function t() { this.name = "tableBodyRowHeight"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("tbody tr td").length) {
      if (value) { $el.find("tbody tr td").css("height", value + "pt"); return "height:" + value + "pt"; }
      $el.find("tbody tr td").map(function (i, e) { e.style.height = ""; });
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表体行高')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="6" >6pt</option><option value="6.75" >6.75pt</option><option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option><option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option><option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option><option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option><option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option><option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option><option value="21" >21pt</option><option value="21.75" >21.75pt</option><option value="22.5" >22.5pt</option><option value="23.25" >23.25pt</option><option value="24" >24pt</option><option value="24.75" >24.75pt</option><option value="25.5" >25.5pt</option><option value="26.25" >26.25pt</option><option value="27" >27pt</option><option value="27.75" >27.75pt</option><option value="28.5" >28.5pt</option><option value="29.25" >29.25pt</option><option value="30" >30pt</option><option value="30.75" >30.75pt</option><option value="31.5" >31.5pt</option><option value="32.25" >32.25pt</option><option value="33" >33pt</option><option value="33.75" >33.75pt</option><option value="34.5" >34.5pt</option><option value="35.25" >35.25pt</option><option value="36" >36pt</option>
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

export var tableHeaderBackground = function () {
  function t() { this.name = "tableHeaderBackground"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("thead").length) {
      if (value) { $el.find("thead").css("background", value); return "background:" + value; }
      $el.find("thead").map(function (i, e) { e.style.background = ""; });
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表头背景')}</div>
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

export var tableBodyRowBorder = function () {
  function t() { this.name = "tableBodyRowBorder"; }
  t.prototype.css = function ($el, value) {
    if ($el.find("tbody tr").length) {
      if ("border" == value || value == void 0) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-all"); }
      else if ("noBorder" == value) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-none"); }
      else if ("leftBorder" == value) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-left"); }
      else if ("rightBorder" == value) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-right"); }
      else if ("leftRightBorder" == value) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-lr"); }
      else if ("topBorder" == value) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-top"); }
      else if ("bottomBorder" == value) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-bottom"); }
      else if ("topBottomBorder" == value) { $el.find("tbody tr").addClass("hiprint-printElement-tableTarget-border-tb"); }
      else { $el.find("tbody tr").removeClass(); }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表体行边框')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="border" >${i18n.__('有边框')}</option>
          <option value="noBorder" >${i18n.__('无边框')}</option>
          <option value="leftBorder" >${i18n.__('左边框')}</option>
          <option value="rightBorder" >${i18n.__('右边框')}</option>
          <option value="leftRightBorder" >${i18n.__('左右边框')}</option>
          <option value="topBorder" >${i18n.__('上边框')}</option>
          <option value="bottomBorder" >${i18n.__('下边框')}</option>
          <option value="topBottomBorder" >${i18n.__('上下边框')}</option>
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
