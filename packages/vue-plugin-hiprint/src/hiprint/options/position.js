export var coordinate = function () {
  function t() { this.name = "coordinate"; }
  t.prototype.createTarget = function (options, opts) {
    var n = this;
    n.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('位置坐标')}</div>
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
        <input type="number" style="width:48%" placeholder="${i18n.__('X位置(左)')}" class="auto-submit" />
        <input type="number" style="width:48%" placeholder="${i18n.__('Y位置(上)')}" class="auto-submit" />
      </div>
    </div>`);
    n.syncLock = opts.coordinateSync || false;
    n.createSyncLock(n.syncLock);
    return n.target;
  };
  t.prototype.createSyncLock = function (syncLock) {
    var n = this;
    n.lockTarget = syncLock
      ? $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('同步')}">🔗</label>`)
      : $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('不同步')}">🔓</label>`);
    n.lockTarget.click(function () {
      if (n.syncLock) {
        n.lockTarget.text("🔓").attr("title", `${i18n.__('不同步')}`);
      } else {
        n.lockTarget.text("🔗").attr("title", `${i18n.__('同步')}`);
      }
      n.syncLock = !n.syncLock;
    });
    n.target.find("input:first").after(n.lockTarget);
    n.target.find("input:first").change(function () {
      if (n.syncLock) { n.target.find("input:last").val($(this).val()); }
    });
    n.target.find("input:last").change(function () {
      if (n.syncLock) { n.target.find("input:first").val($(this).val()); }
    });
    return n.lockTarget;
  };
  t.prototype.css = function ($el) {
    if ($el && $el.length && this.target) {
      if (('block' == $el.find('.resize-panel').css('display') || $el[0].className.includes('table')) && this.el == $el) {
        var v = this.getValue();
        return $el.css("left", v.left + "pt").css("top", v.top + "pt");
      }
    }
    return null;
  };
  t.prototype.getValue = function () {
    var v = { coordinateSync: this.syncLock, left: 0, top: 0 };
    v.left = parseFloat(this.target.find("input:first").val() || 0);
    v.top = parseFloat(this.target.find("input:last").val() || 0);
    return v;
  };
  t.prototype.setValue = function (value, el) {
    this.el = el.designTarget || el;
    this.target.find("input:first").val(value.left);
    this.target.find("input:last").val(value.top);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var widthHeight = function () {
  function t() { this.name = "widthHeight"; }
  t.prototype.createTarget = function (options, opts) {
    var n = this;
    n.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('宽高大小')}</div>
      <div class="hiprint-option-item-field" style="display: flex;align-items: baseline;">
        <input type="number" style="width:48%" placeholder="${i18n.__('宽')}" class="auto-submit" />
        <input type="number" style="width:48%" placeholder="${i18n.__('高')}" class="auto-submit" />
      </div>
    </div>`);
    n.syncLock = opts.widthHeightSync || false;
    n.createSyncLock(n.syncLock);
    return n.target;
  };
  t.prototype.createSyncLock = function (syncLock) {
    var n = this;
    n.lockTarget = syncLock
      ? $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('同步')}">🔗</label>`)
      : $(`<label style="margin: 0 4px;text-align:center;width: 8%" title="${i18n.__('不同步')}">🔓</label>`);
    n.lockTarget.click(function () {
      if (n.syncLock) {
        n.lockTarget.text("🔓").attr("title", `${i18n.__('不同步')}`);
      } else {
        n.lockTarget.text("🔗").attr("title", `${i18n.__('同步')}`);
      }
      n.syncLock = !n.syncLock;
    });
    n.target.find("input:first").after(n.lockTarget);
    n.target.find("input:first").change(function () {
      if (n.syncLock) { n.target.find("input:last").val($(this).val()); }
    });
    n.target.find("input:last").change(function () {
      if (n.syncLock) { n.target.find("input:first").val($(this).val()); }
    });
    return n.lockTarget;
  };
  t.prototype.css = function ($el) {
    if ($el && $el.length && this.target) {
      if (('block' == $el.find('.resize-panel').css('display') || $el[0].className.includes('table')) && this.el == $el) {
        var v = this.getValue();
        return $el.css("width", v.width + "pt").css("height", v.height + "pt");
      }
    }
    return null;
  };
  t.prototype.getValue = function () {
    var v = { widthHeightSync: this.syncLock, width: 0, height: 0 };
    v.width = parseFloat(this.target.find("input:first").val() || 0);
    v.height = parseFloat(this.target.find("input:last").val() || 0);
    return v;
  };
  t.prototype.setValue = function (value, el) {
    this.el = el.designTarget || el;
    this.target.find("input:first").val(value.width);
    this.target.find("input:last").val(value.height);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var zIndex = function () {
  function t() { this.name = "zIndex"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) { if (value) { $el.css('z-index', value); } }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('元素层级')}</div>
      <div class="hiprint-option-item-field"><input type="number" class="auto-submit"/></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseInt(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var fixed = function () {
  function t() { this.name = "fixed"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('位置固定')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="false" >${i18n.__('否')}</option>
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

export var axis = function () {
  function t() { this.name = "axis"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('拖动方向')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="h" >${i18n.__('横向')}</option>
          <option value="v" >${i18n.__('竖向')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); return val || void 0; };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var leftOffset = function () {
  function t() { this.name = "leftOffset"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('左偏移')}</div>
      <div class="hiprint-option-item-field"><input type="text" placeholder="${i18n.__('偏移量')}pt" class="auto-submit"></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var topOffset = function () {
  function t() { this.name = "topOffset"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('顶部偏移')}</div>
      <div class="hiprint-option-item-field"><input type="text" placeholder="${i18n.__('偏移量')}pt" class="auto-submit"></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var lHeight = function () {
  function t() { this.name = "lHeight"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('最低高度')}</div>
      <div class="hiprint-option-item-field"><input type="text" placeholder="${i18n.__('文本过短或为空时的高度')}" class="auto-submit"></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var leftSpaceRemoved = function () {
  function t() { this.name = "leftSpaceRemoved"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('移除段落左侧空白')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="true" >${i18n.__('移除')}</option>
          <option value="false" >${i18n.__('不移除')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { if ("false" == this.target.find("select").val()) return false; };
  t.prototype.setValue = function (value) { this.target.find("select").val((value == null ? "" : value).toString()); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var transform = function () {
  function t() { this.name = "transform"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      var n = $el.find(".hiprint-printElement-content").parent(".hiprint-printElement");
      if (!n.length) { n = $el; }
      if (value) {
        n.css("transform", "rotate(" + value + "deg)");
        n.css("-ms-transform", "rotate(" + value + "deg)");
        n.css("-moz-transform", "rotate(" + value + "deg)");
        n.css("-webkit-transform", "rotate(" + value + "deg)");
        n.css("-o-transform", "rotate(" + value + "deg)");
        return "transform:rotate(" + value + "deg)";
      }
      if (n.length) { n[0].style.transform = ""; }
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('旋转角度')}</div>
      <div class="hiprint-option-item-field"><input type="number" class="auto-submit"/></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseFloat(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();
