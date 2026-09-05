import test from 'node:test'
import assert from 'node:assert/strict'
import { buildFullHtmlDocument } from '../src/hiprint/html-document.js'

test('builds a standalone printable HTML document', () => {
  const html = buildFullHtmlDocument('<div class="hiprint-printTemplate">label</div>', '@page { size: 82mm 30mm; }', { title: '双排标签' })
  assert.match(html, /^<!DOCTYPE html>/)
  assert.match(html, /<meta charset="UTF-8">/)
  assert.match(html, /<style>@page \{ size: 82mm 30mm; \}<\/style>/)
  assert.match(html, /hiprint-printTemplate/)
})

test('escapes document metadata', () => {
  const html = buildFullHtmlDocument('', '', { title: '<标签 & 打印>', lang: 'zh-CN" test' })
  assert.match(html, /<title>&lt;标签 &amp; 打印&gt;<\/title>/)
  assert.match(html, /lang="zh-CN&quot; test"/)
})
