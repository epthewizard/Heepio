// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function linkTitle() {
  return 'Open this page on 12ft.io';
}

function pageTitle() {
  return 'Open this page on 12ft.io';
}

function setInit(url) {
  chrome.action.setBadgeBackgroundColor({ color: 'gray' });
  chrome.action.setBadgeText({ text: '...' });
  chrome.action.setTitle({ title: "Heepio'ing [" + url + "]" });
}

function setComplete() {
  chrome.action.setBadgeText({ text: '' });
  chrome.action.setTitle({ title: '' });
}

function outlineThis(url) {
  console.log('[Heepio] outlineThis(' + url + ')');
  
  const outlineUrl = 'https://12ft.io/';
  
  if (!url || (url.length == 0) || !/^http(s)?:\/\//i.test(url) || (url.substring(0, outlineUrl.length) == outlineUrl))
    return;
  
  setInit(url);
  
  chrome.tabs.create({ url: outlineUrl + url }, () => setComplete());
}

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
    console.log(`[Outliner] action.onClicked(tabs): ${JSON.stringify(tabs)}`);
    
    if (tabs && (tabs.length > 0)) {
      const url = tabs[0].url;
      outlineThis(url);
    }
  });
})

