export var fontFamily = function () {
  function t() { this.name = "fontFamily"; }
  t.prototype.createTarget = function (options) {
    var fontList;
    if (options && (fontList = options.getFontList()), fontList) {
      var html = `<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${i18n.__('字体')}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="" >${i18n.__('默认')}</option>`;
      fontList.forEach(function (font) {
        html += ' <option value="' + (font.value || "") + '" >' + (font.title || "") + "</option>";
      });
      html += " </select></div></div>";
      this.target = $(html);
    } else {
      this.target = $(`<div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${i18n.__('字体')}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit">
            <option value="" >${i18n.__('默认')}</option>
            <option value="SimSun" >${i18n.__('宋体')}</option>
            <option value="Microsoft YaHei" >${i18n.__('微软雅黑')}</option>
          </select>
        </div>
      </div>`);
    }
    return this.target;
  };
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("font-family", value); return "font-family:" + value; }
      $el[0].style.fontFamily = "inherit";
    }
    return null;
  };
  t.prototype.getValue = function () {
    var val = this.target.find("select").val();
    if (val) return val.toString();
  };
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

export var fontSize = function () {
  function t() { this.name = "fontSize"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("font-size", value + "pt"); return "font-size:" + value + "pt"; }
      $el[0].style.fontSize = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('字体大小')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="6" >6pt</option><option value="6.75" >6.75pt</option><option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option><option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option><option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13.5pt</option><option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option><option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option><option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option><option value="21" >21pt</option><option value="21.75" >21.75pt</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () {
    var val = this.target.find("select").val();
    if (val) return parseFloat(val.toString());
  };
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

export var fontWeight = function () {
  function t() { this.name = "fontWeight"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("font-weight", value); return "font-weight:" + value; }
      $el[0].style.fontWeight = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('字体粗细')}</div>
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
  t.prototype.getValue = function () {
    var val = this.target.find("select").val();
    if (val) return val.toString();
  };
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

export var lineHeight = function () {
  function t() { this.name = "lineHeight"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("line-height", value + "pt"); return "line-height:" + value + "pt"; }
      $el[0].style.lineHeight = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('字体行高')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="6" >6pt</option><option value="6.75" >6.75pt</option><option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option><option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option><option value="12" >12pt</option><option value="12.75" >12.75pt</option><option value="13.5" >13pt</option><option value="14.25" >14.25pt</option><option value="15" >15pt</option><option value="15.75" >15.75pt</option><option value="16.5" >16.5pt</option><option value="17.25" >17.25pt</option><option value="18" >18pt</option><option value="18.75" >18.75pt</option><option value="19.5" >19.5pt</option><option value="20.25" >20.25pt</option><option value="21" >21pt</option><option value="21.75" >21.75pt</option><option value="22.5" >22.5pt</option><option value="23.25" >23.25pt</option><option value="24" >24pt</option><option value="24.75" >24.75pt</option><option value="25.5" >25.5pt</option><option value="26.25" >26.25pt</option><option value="27" >27pt</option><option value="27.75" >27.75pt</option><option value="28.5" >28.5pt</option><option value="29.25" >29.25pt</option><option value="30" >30pt</option><option value="30.75" >30.75pt</option><option value="31.5" >31.5pt</option><option value="32.25" >32.25pt</option><option value="33" >33pt</option><option value="33.75" >33.75pt</option><option value="34.5" >34.5pt</option><option value="35.25" >35.25pt</option><option value="36" >36pt</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () {
    var val = this.target.find("select").val();
    if (val) return parseFloat(val.toString());
  };
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

export var letterSpacing = function () {
  function t() { this.name = "letterSpacing"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("letter-spacing", value + "pt"); return "letter-spacing:" + value + "pt"; }
      $el[0].style.letterSpacing = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('字间距')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="0.75" >0.75pt</option><option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option><option value="3" >3pt</option><option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option><option value="5.25" >5.25pt</option><option value="6" >6pt</option><option value="6.75" >6.75pt</option><option value="7.5" >7.5pt</option><option value="8.25" >8.25pt</option><option value="9" >9pt</option><option value="9.75" >9.75pt</option><option value="10.5" >10.5pt</option><option value="11.25" >11.25pt</option><option value="12" >12pt</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () {
    var val = this.target.find("select").val();
    if (val) return parseFloat(val.toString());
  };
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

export var textAlign = function () {
  function t() { this.name = "textAlign"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) {
        $el.css("text-align", value);
        if (value == "justify") {
          $el.css("text-align-last", "justify");
          $el.css("text-justify", "distribute-all-lines");
        } else {
          $el[0].style.textAlignLast = "";
          $el[0].style.textJustify = "";
        }
        return "text-align:" + value;
      }
      $el[0].style.textAlign = "";
      $el[0].style.textAlignLast = "";
      $el[0].style.textJustify = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('左右对齐')}</div>
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
  t.prototype.getValue = function () {
    var val = this.target.find("select").val();
    if (val) return val.toString();
  };
  t.prototype.setValue = function (value) {
    this.target.find("select").val(value);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var color = function () {
  function t() { this.name = "color"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("color", value); return "color:" + value; }
      $el[0].style.color = "";
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('字体颜色')}</div>
      <div class="hiprint-option-item-field">
        <input type="text" class="auto-submit"/>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () {
    var val = this.target.find("input").val();
    if (val) return val.toString();
  };
  t.prototype.setValue = function (value) {
    this.target.find("input").minicolors({ defaultValue: value || "", theme: "bootstrap" });
    this.target.find("input").val(value);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var textDecoration = function () {
  function t() { this.name = "textDecoration"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('文本修饰')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="underline" >${i18n.__('下划线')}</option>
          <option value="overline" >${i18n.__('上划线')}</option>
          <option value="line-through" >${i18n.__('穿梭线')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) { $el.css("text-decoration", value); return "text-decoration:" + value; }
      $el[0].style.textDecoration = "";
    }
    return null;
  };
  t.prototype.getValue = function () {
    var val = this.target.find("select").val();
    if (val) return val.toString();
  };
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
