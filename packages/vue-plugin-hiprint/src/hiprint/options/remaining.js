/**
 * 剩余的选项配置类
 * Remaining option classes not categorized in other files
 */
import $ from "jquery";

// ==================== Table-related options ====================

export var textType = function () {
  function t() { this.name = "textType"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('打印类型')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="" >${i18n.__('文本')}</option>
          <option value="barcode" >${i18n.__('条形码')}</option>
          <option value="qrcode" >${i18n.__('二维码')}</option>
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

export var tableTextType = function () {
  function t() { this.name = "tableTextType"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('字段类型')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认(文本)')}</option>
          <option value="text" >${i18n.__('文本')}</option>
          <option value="sequence" >${i18n.__('序号')}</option>
          <option value="barcode" >${i18n.__('条形码')}</option>
          <option value="qrcode" >${i18n.__('二维码')}</option>
          <option value="image" >${i18n.__('图片')}</option>
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

export var tableBarcodeMode = function () {
  function t() { this.name = "tableBarcodeMode"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('条形码格式')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}(CODE128A)</option>
          <option value="CODE128A" >CODE128A</option>
          <option value="CODE128B" >CODE128B</option>
          <option value="CODE128C" >CODE128C</option>
          <option value="CODE39" >CODE39</option>
          <option value="EAN-13" >EAN-13</option>
          <option value="EAN-8" >EAN-8</option>
          <option value="EAN-5" >EAN-5</option>
          <option value="EAN-2" >EAN-2</option>
          <option value="UPC" >UPC（A）</option>
          <option value="ITF" >ITF</option>
          <option value="ITF-14" >ITF-14</option>
          <option value="MSI" >MSI</option>
          <option value="MSI10" >MSI10</option>
          <option value="MSI11" >MSI11</option>
          <option value="MSI1010" >MSI1010</option>
          <option value="MSI1110" >MSI1110</option>
          <option value="Pharmacode" >Pharmacode</option>
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

export var tableQRCodeLevel = function () {
  function t() { this.name = "tableQRCodeLevel"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('二维码容错率')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="1" >7% L</option>
          <option value="0" >15% M</option>
          <option value="3" >25% Q</option>
          <option value="2" >30% H</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); return parseInt(val || 0); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var tableColumnHeight = function () {
  function t() { this.name = "tableColumnHeight"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('单元格高度')}</div>
      <div class="hiprint-option-item-field">
        <input type="text" placeholder="${i18n.__('条形码，二维码以及图片有效')}" class="auto-submit">
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var tableSummaryTitle = function () {
  function t() { this.name = "tableSummaryTitle"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('底部聚合标题')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="true">${i18n.__('显示')}</option><option value="false">${i18n.__('隐藏')}</option></select></div></div>`);
    return this.target;
  };
  t.prototype.getValue = function () { return !("false" == this.target.find("select").val()); };
  t.prototype.setValue = function (value) { this.target.find("select").val((value == null ? "" : value).toString()); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var tableSummaryText = function () {
  function t() { this.name = "tableSummaryText"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('底部聚合文本')}</div>
      <div class="hiprint-option-item-field">
        <input type="text" placeholder="${i18n.__('聚合类型')}" class="auto-submit">
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var tableSummaryColspan = function () {
  function t() { this.name = "tableSummaryColspan"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('底部聚合合并列数')}</div>
      <div class="hiprint-option-item-field">
        <input type="number" min="0" step="1" placeholder="${i18n.__('合并列数')}" class="auto-submit">
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var tableSummary = function () {
  function t() { this.name = "tableSummary"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('底部聚合类型')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('不聚合')}</option><option value="count">${i18n.__('计数')}</option><option value="sum">${i18n.__('合计')}</option><option value="avg">${i18n.__('平均值')}</option><option value="min">${i18n.__('最小值')}</option><option value="max">${i18n.__('最大值')}</option><option value="text">${i18n.__('仅文本')}</option></select></div></div>`);
    return this.target;
  };
  t.prototype.getValue = function () { return this.target.find("select").val(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var tableSummaryAlign = function () {
  function t() { this.name = "tableSummaryAlign"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('底部聚合类型左右对齐')}</div>
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

export var tableSummaryNumFormat = function () {
  function t() { this.name = "tableSummaryNumFormat"; }
  t.prototype.createTarget = function () {
    var list = [{ t: `${i18n.__('整数')}`, v: '0' }], num = [1, 2, 3, 4, 5, 6];
    num.forEach(function (n) { list.push({ t: i18n.__n(`保留%s位`, n), v: '' + n }); });
    var n = `\n<option value="" >${i18n.__('默认')}</option>`;
    list.forEach(function (e) { n += '\n<option value="' + (e.v || "") + '">' + (e.t || "") + '</option>'; });
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('底部聚合小数')}</div>
      <div class="hiprint-option-item-field"><select class="auto-submit"></select></div>
    </div>`);
    this.target.find(".auto-submit").append($(n));
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var tableSummaryFormatter = function () {
  function t() { this.name = "tableSummaryFormatter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('底部聚合格式化函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(column,fieldPageData,tableData,options){ return '<td></td>'; }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var rowsColumnsMerge = function () {
  function t() { this.name = "rowsColumnsMerge"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('行/列合并函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(data, col, colIndex, rowIndex, tableData, printData){ return [1,1] }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var rowsColumnsMergeClean = function () {
  function t() { this.name = "rowsColumnsMergeClean"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('跨页合并是否清除')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="true" >${i18n.__('是')}</option>
          <option value="false" >${i18n.__('否')}</option>
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

export var tableHeaderRepeat = function () {
  function t() { this.name = "tableHeaderRepeat"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表格头显示')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="page" >${i18n.__('每页显示')}</option>
          <option value="first" >${i18n.__('首页显示')}</option>
          <option value="none" >${i18n.__('不显示')}</option>
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

export var tableFooterRepeat = function () {
  function t() { this.name = "tableFooterRepeat"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('表格脚显示')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="no" >${i18n.__('不显示')}</option>
          <option value="page" >${i18n.__('每页显示')}</option>
          <option value="last" >${i18n.__('最后显示')}</option>
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

export var tableColumns = function () {
  function t() { this.name = "columns"; }
  t.prototype.createTarget = function () {
    $('<div class="indicator"></div>').appendTo("body");
    this.target = $('<div class="hiprint-option-item hiprint-option-item-row"><div><ul class="hiprint-option-table-selected-columns"></ul></div></div>');
    return this.target;
  };
  t.prototype.getValue = function () { return this.buildData(); };
  t.prototype.setValue = function (value, options, printElementType) {
    var self = this;
    this.value = value;
    this.options = options;
    this.printElementType = printElementType;
    var notSelected = printElementType.columns[0].filter(function (col) {
      return 0 == value[0].columns.filter(function (v) { return col.columnId == v.columnId; }).length;
    }).map(function (col) {
      var c = new TableColumn(col);
      c.checked = false;
      return c;
    });
    this.allColumns = value[0].columns.concat(notSelected);
    if (value && value.length == 1) {
      this.target.find("ul").html(this.allColumns.map(function (col) {
        return '<li class="hiprint-option-table-selected-item"><div class="hi-pretty p-default">' +
          (col.checked ? '<input type="checkbox" checked column-id="' + (col.id || col.columnId) + '" />' : '<input type="checkbox" column-id="' + (col.id || col.columnId) + '" />') +
          '<div class="state"><label></label></div></div><span class="column-title">' + (col.title || col.descTitle || "") + '</span></li>';
      }).join(""));
      this.target.find("input").change(function (e) {
        var checked = e.target.checked, id = e.target.attributes['column-id'].nodeValue || '';
        var idx = self.allColumns.findIndex(function (c) { return c.field == id || c.id == id; });
        if (idx >= 0) { self.allColumns[idx]['checked'] = checked; }
        self.submit();
      });
      if (this.printElementType.columnDisplayIndexEditable) {
        this.target.find("li").hidraggable({
          revert: true, handle: ".column-title", moveUnit: "pt", deltaX: 0, deltaY: 0
        }).hidroppable({
          onDragOver: function (t, e) { $(this).css("border-top-color", "red"); },
          onDragLeave: function (t, e) { $(this).css("border-top-color", ""); },
          onDrop: function (t, e) { $(e).insertBefore(this); $(this).css("border-top-color", ""); self.submit(); }
        });
      }
    }
  };
  t.prototype.buildData = function () {
    var self = this, result = [];
    if (this.options.columns.length > 1) { return this.value; }
    this.printElementType.makeColumnObj(this.allColumns);
    this.target.find("input").map(function (n, input) {
      var id = $(input).attr("column-id");
      var col = self.printElementType.getColumnByColumnId(id);
      if (col) {
        var p = new TableColumn(col);
        p.checked = col.checked;
        result.push(p);
      }
    });
    return this.value[0].columns = result, this.value;
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
};

export var gridColumns = function () {
  function t() { this.name = "gridColumns"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('一行多组')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="2" >${i18n.__('一行二列')}</option>
          <option value="3" >${i18n.__('一行三列')}</option>
          <option value="4" >${i18n.__('一行四列')}</option>
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

export var gridColumnsGutter = function () {
  function t() { this.name = "gridColumnsGutter"; }
  t.prototype.css = function ($el, value) {
    if ($el && $el.length) {
      if (value) {
        $el.find(".table-grid-row").css("margin-left", "-" + value + "pt").css("margin-right", "-" + value + "pt");
        $el.find(".tableGridColumnsGutterRow").css("padding-left", value + "pt").css("padding-right", value + "pt");
        return null;
      }
      $el.find(".table-grid-row").map(function (i, e) { e.style.marginLeft = ""; e.style.marginRight = ""; });
      $el.find(".tableGridColumnsGutterRow").map(function (i, e) { e.style.paddingLeft = ""; e.style.paddingRight = ""; });
    }
    return null;
  };
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('一行多组间隔')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="1.5" >1.5pt</option><option value="2.25" >2.25pt</option><option value="3" >3pt</option>
          <option value="3.75" >3.75pt</option><option value="4.5" >4.5pt</option><option value="5.25" >5.25pt</option>
          <option value="6" >6pt</option><option value="6.75" >6.75pt</option><option value="7.25" >7.25pt</option>
          <option value="8.5" >8.5pt</option><option value="9" >9pt</option>
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

export var panelLayoutOptions = function () {
  function t() { this.name = "panelLayoutOptions"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">${i18n.__('面板排列')}</div></div>`);
    this.layoutType = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">${i18n.__('排列方式')}:</div><select style="width:75%" class="auto-submit"><option value="column" >${i18n.__('纵向')}</option><option value="row" >${i18n.__('横向')}</option></select></div></div>`);
    this.layoutColumns = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('每排数量')}:</div><input style="width:75%" type="number" min="1" step="1" placeholder="${i18n.__('每排标签数')}" class="auto-submit"></div>`);
    this.layoutRowGap = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('垂直间距')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('垂直间距mm')}" class="auto-submit"></div>`);
    this.layoutColumnGap = $(`<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;margin-top: 4px"><div style="width:25%">${i18n.__('水平间距')}:</div><input style="width:75%" type="text" placeholder="${i18n.__('水平间距mm')}" class="auto-submit"></div>`);
    this.target.append(this.layoutType);
    this.target.append(this.layoutColumns);
    this.target.append(this.layoutRowGap);
    this.target.append(this.layoutColumnGap);
    return this.target;
  };
  t.prototype.getValue = function () {
    var opt = {
      layoutType: this.layoutType.find("select").val() || 'column',
      layoutColumns: Math.max(1, parseInt(this.layoutColumns.find('input').val() || 1)),
      layoutRowGap: parseInt(this.layoutRowGap.find('input').val() || 0),
      layoutColumnGap: parseInt(this.layoutColumnGap.find('input').val() || 0),
    };
    return Object.assign({}, this.options, opt);
  };
  t.prototype.setValue = function (value) {
    this.options = value;
    this.layoutType.find("select").val(value.layoutType || 'column');
    this.layoutColumns.find("input").val(value.layoutColumns || 1);
    this.layoutRowGap.find("input").val(value.layoutRowGap);
    this.layoutColumnGap.find("input").val(value.layoutColumnGap);
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var dataType = function () {
  function t() { this.name = "dataType"; }
  t.prototype.createTarget = function () {
    var self = this;
    this.target = $(`<div class="hiprint-option-item-row">
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${i18n.__('数据类型')}</div>
        <div class="hiprint-option-item-field">
          <select class="hiprint-option-item-datatype">
            <option value="" >${i18n.__('默认')}</option>
            <option value="datetime" >${i18n.__('日期时间')}</option>
            <option value="boolean" >${i18n.__('布尔')}</option>
          </select>
        </div>
      </div>
      <div class="hiprint-option-item">
        <div class="hiprint-option-item-label">${i18n.__('格式')}</div>
        <div class="hiprint-option-item-field">
          <select class="auto-submit hiprint-option-item-datatype-select-format"><option value="" >${i18n.__('默认')}</option></select>
          <input class="auto-submit hiprint-option-item-datatype-input-format" type="text" data-type="boolean" placeholder="true:false">
        </div>
      </div>
    </div>`);
    $(this.target.find(".hiprint-option-item-datatype")).change(function () {
      var type = $(self.target.find(".hiprint-option-item-datatype")).val();
      self.loadFormatSelectByDataType(type);
      self.submit(self.getValue());
    });
    return this.target;
  };
  t.prototype.getValue = function () {
    var dataType = this.target.find(".hiprint-option-item-datatype").val();
    if (dataType) {
      var format = this.target.find(".hiprint-option-item-datatype-format").val();
      return { dataType: dataType, format: format || void 0 };
    }
    return { dataType: void 0, format: void 0 };
  };
  t.prototype.setValue = function (value, options) {
    this.target.find(".hiprint-option-item-datatype").val(options.dataType || "");
    this.loadFormatSelectByDataType(options.dataType);
    this.target.find(".hiprint-option-item-datatype-format").val(options.format || "");
  };
  t.prototype.loadFormatSelectByDataType = function (type) {
    if ("boolean" === type) {
      this.target.find(".hiprint-option-item-datatype-select-format").removeClass("hiprint-option-item-datatype-format").hide().val("");
      this.target.find(".hiprint-option-item-datatype-input-format").addClass("hiprint-option-item-datatype-format").show();
    } else if ("datetime" === type) {
      this.target.find(".hiprint-option-item-datatype-select-format").addClass("hiprint-option-item-datatype-format").show();
      this.target.find(".hiprint-option-item-datatype-input-format").removeClass("hiprint-option-item-datatype-format").hide().val("");
      this.target.find(".hiprint-option-item-datatype-select-format").html(`<option value="">${i18n.__('默认')}</option>
<option value="M/d">M/d</option><option value="MM/dd">MM/dd</option><option value="yy/M/d">yy/M/d</option><option value="yy/MM/dd">yy/MM/dd</option><option value="yyyy/M/d">yyyy/M/d</option><option value="yyyy/MM/dd">yyyy/MM/dd</option><option value="yy/M/d H:m">yy/M/d H:m</option><option value="yy/M/d H:m:s">yy/M/d H:m:s</option><option value="yy/M/d HH:mm">yy/M/d HH:mm</option><option value="yy/M/d HH:mm:ss">yy/M/d HH:mm:ss</option><option value="yy/MM/dd H:m">yy/MM/dd H:m</option><option value="yy/MM/dd H:m:s">yy/MM/dd H:m:s</option><option value="yy/MM/dd HH:mm">yy/MM/dd HH:mm</option><option value="yy/MM/dd HH:mm:ss">yy/MM/dd HH:mm:ss</option><option value="yyyy/M/d H:m">yyyy/M/d H:m</option><option value="yyyy/M/d H:m:s">yyyy/M/d H:m:s</option><option value="yyyy/M/d HH:mm">yyyy/M/d HH:mm</option><option value="yyyy/M/d HH:mm:ss">yyyy/M/d HH:mm:ss</option><option value="yyyy/MM/dd H:m">yyyy/MM/dd H:m</option><option value="yyyy/MM/dd H:m:s">yyyy/MM/dd H:m:s</option><option value="yyyy/MM/dd HH:mm">yyyy/MM/dd HH:mm</option><option value="yyyy/MM/dd HH:mm:ss">yyyy/MM/dd HH:mm:ss</option>
<option value="M-d">M-d</option><option value="MM-dd">MM-dd</option><option value="yy-M-d">yy-M-d</option><option value="yy-MM-dd">yy-MM-dd</option><option value="yyyy-M-d">yyyy-M-d</option><option value="yyyy-MM-dd">yyyy-MM-dd</option><option value="yy-M-d H:m">yy-M-d H:m</option><option value="yy-M-d H:m:s">yy-M-d H:m:s</option><option value="yy-M-d HH:mm">yy-M-d HH:mm</option><option value="yy-M-d HH:mm:ss">yy-M-d HH:mm:ss</option><option value="yy-MM-dd H:m">yy-MM-dd H:m</option><option value="yy-MM-dd H:m:s">yy-MM-dd H:m:s</option><option value="yy-MM-dd HH:mm">yy-MM-dd HH:mm</option><option value="yy-MM-dd HH:mm:ss">yy-MM-dd HH:mm:ss</option><option value="yyyy-M-d H:m">yyyy-M-d H:m</option><option value="yyyy-M-d H:m:s">yyyy-M-d H:m:s</option><option value="yyyy-M-d HH:mm">yyyy-M-d HH:mm</option><option value="yyyy-M-d HH:mm:ss">yyyy-M-d HH:mm:ss</option><option value="yyyy-MM-dd H:m">yyyy-MM-dd H:m</option><option value="yyyy-MM-dd H:m:s">yyyy-MM-dd H:m:s</option><option value="yyyy-MM-dd HH:mm">yyyy-MM-dd HH:mm</option><option value="yyyy-MM-dd HH:mm:ss">yyyy-MM-dd HH:mm:ss</option>`);
    } else {
      this.target.find(".hiprint-option-item-datatype-select-format").show();
      this.target.find(".hiprint-option-item-datatype-input-format").hide().val("");
      this.target.find(".hiprint-option-item-datatype-format").html(`<option value="" >${i18n.__('默认')}</option>`);
    }
  };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var formatter = function () {
  function t() { this.name = "formatter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('格式化函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(title,value,options,templateData,target){}" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var styler = function () {
  function t() { this.name = "styler"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('样式函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(value, options, target,templateData){}" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var footerFormatter = function () {
  function t() { this.name = "footerFormatter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('表格脚函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData,pageIndex){ return '<tr></tr>' }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var groupSequenceContinue = function () {
  function t() { this.name = "groupSequenceContinue"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('分组序号续编')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="true" >${i18n.__('是')}</option>
          <option value="false" >${i18n.__('否')}</option>
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

export var groupFieldsFormatter = function () {
  function t() { this.name = "groupFieldsFormatter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('分组字段函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(type,options,data){ return [] }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var groupFormatter = function () {
  function t() { this.name = "groupFormatter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('分组头格式化函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return '${i18n.__('分组头信息')}(html)' }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var groupFooterFormatter = function () {
  function t() { this.name = "groupFooterFormatter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('分组脚格式化函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(colTotal,tableData,printData,groupData,options){ return '${i18n.__('分组脚信息')}(html)' }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var gridColumnsFooterFormatter = function () {
  function t() { this.name = "gridColumnsFooterFormatter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('多组表格脚函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(options,rows,data,pageData){ return '' }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var rowStyler = function () {
  function t() { this.name = "rowStyler"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('行样式函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(value,options){ return '' }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var styler2 = function () {
  function t() { this.name = "styler2"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('单元格样式函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return {color:'red' }; }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var stylerHeader = function () {
  function t() { this.name = "stylerHeader"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('表格头样式函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(options){ return {color:'red' }; }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var renderFormatter = function () {
  function t() { this.name = "renderFormatter"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('单元格渲染函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(value,row,colIndex,options,rowIndex){ return '<td></td>'; }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var formatter2 = function () {
  function t() { this.name = "formatter2"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
      <div class="hiprint-option-item-label">${i18n.__('单元格格式化函数')}</div>
      <div class="hiprint-option-item-field">
        <textarea style="height:80px;" placeholder="function(value,row,index,options){ return ''; }" class="auto-submit"></textarea>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("textarea").val(); if (val) return val; };
  t.prototype.setValue = function (value) { this.target.find("textarea").val(value ? value.toString() : null); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var autoCompletion = function () {
  function t() { this.name = "autoCompletion"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('自动补全')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="true" >${i18n.__('是')}</option>
          <option value="false" >${i18n.__('否')}</option>
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

export var maxRows = function () {
  function t() { this.name = "maxRows"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item">
      <div class="hiprint-option-item-label">${i18n.__('每页最大行数')}</div>
      <div class="hiprint-option-item-field"><input type="number" value="1" step="1" min="1" class="auto-submit"/></div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("input").val(); if (val) return parseInt(val.toString()); };
  t.prototype.setValue = function (value) { this.target.find("input").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var upperCase = function () {
  function t() { this.name = "upperCase"; }
  t.prototype.createTarget = function () {
    var list = [
      { t: "「小写」十点八", v: "0" },
      { t: "「小写」一十点八", v: "1" },
      { t: "「大写」拾点捌", v: "2" },
      { t: "「大写」壹拾点捌", v: "3" },
      { t: "「金额」人民币拾元捌角", v: "4" },
      { t: "「金额」人民币壹拾元捌角", v: "5" },
      { t: "「金额」人民币壹拾元捌角零分", v: "6" },
      { t: "「金额」壹拾元捌角零分", v: "7" },
    ];
    var n = `\n<option value="">${i18n.__('默认')}</option>`;
    list.forEach((e) => { n += `\n<option value='${e.v}'>${e.t}</option>`; });
    this.target = $(`<div class="hiprint-option-item hiprint-option-item-row">
<div class="hiprint-option-item-label">${i18n.__('转大小写')}</div>
<div class="hiprint-option-item-field"><select class="auto-submit"></select></div>
</div>`);
    this.target.find(".auto-submit").append($(n));
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); if (val) return val.toString(); };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var showCodeTitle = (function () {
  function t() { this.name = 'showCodeTitle'; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item" title="条形码底部是否显示内容">
      <div class="hiprint-option-item-label">${i18n.__('显示码值')}</div>
      <div class="hiprint-option-item-field">
        <select class="auto-submit">
          <option value="" >${i18n.__('默认')}</option>
          <option value="true" >${i18n.__('显示')}</option>
          <option value="false" >${i18n.__('隐藏')}</option>
        </select>
      </div>
    </div>`);
    return this.target;
  };
  t.prototype.getValue = function () { if ('true' == this.target.find('select').val()) return true; };
  t.prototype.setValue = function (value) { this.target.find('select').val((value == null ? '' : value).toString()); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
})();

export var barTextMode = function () {
  function t() { this.name = "barTextMode"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('条码文本模式')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="text">单独文本</option><option value="svg">svg文本</option></select></div></div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); return val || void 0; };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var barWidth = function () {
  function t() { this.name = "barWidth"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('条码宽度')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div></div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); return val || void 0; };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();

export var barAutoWidth = function () {
  function t() { this.name = "barAutoWidth"; }
  t.prototype.createTarget = function () {
    this.target = $(`<div class="hiprint-option-item"><div class="hiprint-option-item-label">${i18n.__('条码自动增宽')}</div><div class="hiprint-option-item-field"><select class="auto-submit"><option value="">${i18n.__('默认')}</option><option value="true">${i18n.__('自动')}</option><option value="false">${i18n.__('不自动')}</option></select></div></div>`);
    return this.target;
  };
  t.prototype.getValue = function () { var val = this.target.find("select").val(); return val || void 0; };
  t.prototype.setValue = function (value) { this.target.find("select").val(value); };
  t.prototype.destroy = function () { this.target.remove(); };
  return t;
}();
