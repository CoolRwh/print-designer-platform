/**
 * 选项配置类统一入口
 * 导入所有选项类并注册到 PrintElementOptionItemsFactory
 */
import $ from "jquery";

// font.js
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textAlign, color, textDecoration } from "./font.js";

// border.js
import { borderRadius, borderWidth, borderColor, backgroundColor, optionsGroup, borderTop, borderLeft, borderRight, borderBottom, borderStyle, contentPaddingLeft, contentPaddingTop, contentPaddingRight, contentPaddingBottom, paddingLeft, paddingRight, align, vAlign, halign } from "./border.js";

// position.js
import { coordinate, widthHeight, zIndex, fixed, axis, leftOffset, topOffset, lHeight, leftSpaceRemoved, transform } from "./position.js";

// barcode.js
import { barcodeType, qrcodeType, qrCodeLevel, barcodeMode, barColor, barTextMode, barWidth, barAutoWidth, showCodeTitle } from "./barcode.js";

// table.js
import { tableBorder, tableHeaderBorder, tableHeaderCellBorder, tableFooterBorder, tableFooterCellBorder, tableHeaderRowHeight, tableHeaderFontSize, tableHeaderFontWeight, tableBodyCellBorder, tableBodyRowHeight, tableHeaderBackground, tableBodyRowBorder } from "./table.js";

// misc.js
import { hideTitle, field, title, testData, src, imageFit, paperNumberFormat, paperNumberDisabled, paperNumberContinue, longTextIndent, showInPage, pageBreak, panelPaperRule, panelPageRule, firstPaperFooter, lastPaperFooter, evenPaperFooter, oddPaperFooter, unShowInPage, orient, textContentVerticalAlign, textWrap } from "./misc.js";

// remaining.js
import { textType, tableTextType, tableBarcodeMode, tableQRCodeLevel, tableColumnHeight, tableSummaryTitle, tableSummaryText, tableSummaryColspan, tableSummary, tableSummaryAlign, tableSummaryNumFormat, tableSummaryFormatter, rowsColumnsMerge, rowsColumnsMergeClean, tableHeaderRepeat, tableFooterRepeat, tableColumns, gridColumns, gridColumnsGutter, panelLayoutOptions, dataType, formatter, styler, footerFormatter, groupSequenceContinue, groupFieldsFormatter, groupFormatter, groupFooterFormatter, gridColumnsFooterFormatter, rowStyler, styler2, stylerHeader, renderFormatter, formatter2, autoCompletion, maxRows, upperCase } from "./remaining.js";

// ==================== Watermark ====================

export var watermarkOptions = function () {
  function Opt() { this.name = "watermarkOptions"; }
  Opt.prototype.createTarget = function () {
    var label = i18n.__('水印功能');
    var contentLabel = i18n.__('水印内容');
    var contentPlaceholder = i18n.__('水印内容');
    var fillStyleLabel = i18n.__('字体颜色');
    var fillStylePlaceholder = i18n.__('字体颜色');
    var fontSizeLabel = i18n.__('字体大小');
    var fontSizePlaceholder = i18n.__('字体大小');
    var rotateLabel = i18n.__('旋转角度');
    var rotatePlaceholder = i18n.__('旋转角度');
    var widthLabel = i18n.__('水平密度');
    var widthPlaceholder = i18n.__('水平密度');
    var heightLabel = i18n.__('垂直密度');
    var heightPlaceholder = i18n.__('垂直密度');
    var timestampLabel = i18n.__('水印时间');
    var timestampPlaceholder = i18n.__('水印时间');
    var formatLabel = i18n.__('时间格式');
    var defaultLabel = i18n.__('默认');
    var defaultFormat = 'YYYY-MM-DD HH:mm';
    var formatlist = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm", "YYYY-MM-DD HH", "YYYY-MM-DD", "YYYY-MMMM", "YYYY-MM", "YYYY"];
    var timeFormatList = '<option value="" >' + defaultLabel + '(' + defaultFormat + ')</option>';
    for (var fi = 0; fi < formatlist.length; fi++) {
      timeFormatList += '<option value="' + formatlist[fi] + '">' + formatlist[fi] + '</option>';
    }
    this.target = $('<div class="hiprint-option-item hiprint-option-item-row"><div class="hiprint-option-item-label">' + label + '</div></div>');
    this.content = $('<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">' + contentLabel + ':</div><input style="width:75%" type="text" placeholder="' + contentPlaceholder + '" class="auto-submit"></div>');
    this.fillStyle = $('<div class="hiprint-option-item-field" style="display: flex;align-items: center;margin-top: 4px"><div style="width:25%">' + fillStyleLabel + ':</div><input style="width:110%" data-format="rgb" data-opacity="0.3" type="text" placeholder="' + fillStylePlaceholder + '" class="auto-submit"></div>');
    this.fontSize = $('<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">' + fontSizeLabel + ':</div><input style="width:75%" type="range" min="10" max="80" placeholder="' + fontSizePlaceholder + '" class="auto-submit"></div>');
    this.rotate = $('<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">' + rotateLabel + ':</div><input style="width:75%" type="range" min="0" max="180" placeholder="' + rotatePlaceholder + '" class="auto-submit"></div>');
    this.width = $('<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">' + widthLabel + ':</div><input style="width:75%" type="range" min="100" max="800" placeholder="' + widthPlaceholder + '" class="auto-submit"></div>');
    this.height = $('<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">' + heightLabel + ':</div><input style="width:75%" type="range" min="100" max="800" placeholder="' + heightPlaceholder + '" class="auto-submit"></div>');
    this.timestamp = $('<div class="hiprint-option-item-field" style="display: flex;align-items: center;"><div style="width:25%">' + timestampLabel + ':</div><input style="width:18px;height:18px;margin:0 0 4px 0;" type="checkbox" placeholder="' + timestampPlaceholder + '" class="auto-submit"></div>');
    this.format = $('<div class="hiprint-option-item-field" style="display: flex;align-items: baseline;"><div style="width:25%">' + formatLabel + ':</div><select style="width:75%" class="auto-submit">' + timeFormatList + '</select></div>');
    this.target.append(this.content);
    this.target.append(this.fillStyle);
    this.target.append(this.fontSize);
    this.target.append(this.rotate);
    this.target.append(this.width);
    this.target.append(this.height);
    this.target.append(this.timestamp);
    this.target.append(this.format);
    return this.target;
  };
  Opt.prototype.getValue = function () {
    var opt = {
      content: this.content.find('input').val(),
      fillStyle: this.fillStyle.find('input').val() || "rgba(184, 184, 184, 0.3)",
      fontSize: parseInt(this.fontSize.find('input').val() || "14") + "px",
      rotate: parseInt(this.rotate.find('input').val() || "25"),
      width: parseInt(this.width.find('input').val() || "200"),
      height: parseInt(this.height.find('input').val() || "200"),
      timestamp: this.timestamp.find('input').is(':checked'),
      format: this.format.find('select').val() == "" ? "YYYY-MM-DD HH:mm" : this.format.find('select').val()
    };
    return Object.assign({}, this.options, opt);
  };
  Opt.prototype.setValue = function (value) {
    this.options = value;
    this.content.find("input").val(value.content || "");
    this.fillStyle.find("input").val(value.fillStyle || "rgba(184, 184, 184, 0.3)");
    this.fillStyle.find("input").minicolors({ format: "rgb", opacity: true, theme: "bootstrap" });
    var fontSize = parseInt(value.fontSize || "14");
    this.fontSize.find("input").val(fontSize);
    this.rotate.find("input").val(value.rotate || 25);
    this.width.find("input").val(value.width || 200);
    this.height.find("input").val(value.height || 200);
    this.timestamp.find('input').attr("checked", value.timestamp == void 0 ? false : value.timestamp);
    this.format.find("select").val(value.format || "YYYY-MM-DD HH:mm");
  };
  Opt.prototype.destroy = function () { this.target.remove(); };
  return Opt;
}();

// ==================== PrintElementOptionItemsFactory ====================

export var printElementOptionItems = [
  new fontFamily(), new fontSize(), new fontWeight(), new letterSpacing(), new textAlign(), new hideTitle(),
  new tableBorder(), new tableHeaderBorder(), new tableHeaderCellBorder(), new tableFooterBorder(), new tableFooterCellBorder(), new tableHeaderRowHeight(), new tableHeaderFontSize(), new tableHeaderFontWeight(), new tableBodyCellBorder(), new tableBodyRowHeight(), new tableHeaderBackground(), new tableBodyRowBorder(),
  new borderWidth(), new barcodeMode(), new qrCodeLevel(), new color(), new textDecoration(), new field(), new title(), new testData(),
  new coordinate(), new widthHeight(), new src(), new imageFit(), new borderColor(), new paperNumberFormat(), new paperNumberDisabled(), new paperNumberContinue(),
  new watermarkOptions(), new longTextIndent(), new showInPage(), new pageBreak(), new panelPaperRule(), new panelPageRule(),
  new leftSpaceRemoved(), new firstPaperFooter(), new lastPaperFooter(), new evenPaperFooter(), new oddPaperFooter(),
  new fixed(), new axis(), new topOffset(), new leftOffset(), new lHeight(), new unShowInPage(),
  new transform(), new zIndex(), new borderRadius(), new optionsGroup(),
  new borderTop(), new borderLeft(), new borderRight(), new borderBottom(),
  new contentPaddingLeft(), new contentPaddingTop(), new contentPaddingRight(), new contentPaddingBottom(),
  new borderStyle(), new backgroundColor(), new orient(), new textContentVerticalAlign(), new textWrap(),
  new tableColumns(), new gridColumns(), new panelLayoutOptions(), new gridColumnsGutter(), new tableHeaderRepeat(),
  new paddingLeft(), new paddingRight(), new dataType(), new formatter(), new styler(), new footerFormatter(),
  new rowsColumnsMerge(), new rowsColumnsMergeClean(), new groupSequenceContinue(), new groupFieldsFormatter(),
  new groupFormatter(), new groupFooterFormatter(), new gridColumnsFooterFormatter(), new rowStyler(),
  new align(), new halign(), new vAlign(), new styler2(), new stylerHeader(), new renderFormatter(),
  new formatter2(), new autoCompletion(), new maxRows(), new tableFooterRepeat(),
  new tableColumnHeight(), new tableBarcodeMode(), new tableQRCodeLevel(), new tableTextType(),
  new tableSummaryTitle(), new tableSummaryText(), new tableSummaryColspan(), new tableSummary(),
  new tableSummaryAlign(), new tableSummaryNumFormat(), new tableSummaryFormatter(),
  new showCodeTitle(), new upperCase(), new barcodeType(), new qrcodeType(), new barColor(),
  new barTextMode(), new barWidth(), new barAutoWidth(), new textType(),
];

export class PrintElementOptionItemsFactory {
  static printElementOptionItems = null;
  static _printElementOptionItems = printElementOptionItems;

  static init() {
    if (!PrintElementOptionItemsFactory.printElementOptionItems) {
      PrintElementOptionItemsFactory.printElementOptionItems = {};
      PrintElementOptionItemsFactory._printElementOptionItems.forEach(function (item) {
        PrintElementOptionItemsFactory.printElementOptionItems[item.name] = item;
      });
    }
  }

  static registerItem(item) {
    if (!item.name) throw new Error("styleItem must have name");
    PrintElementOptionItemsFactory.init();
    PrintElementOptionItemsFactory.printElementOptionItems[item.name] = item;
  }

  static getItem(name) {
    PrintElementOptionItemsFactory.init();
    return PrintElementOptionItemsFactory.printElementOptionItems[name];
  }
}
