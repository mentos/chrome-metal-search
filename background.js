/* Pseudo sprintf */
var sprintf = function(haystack, needle) {
  return haystack.replace('%s', needle)
};

var createTab = function(id, selectionText) {
  var term = encodeURI(selectionText)
    , website = websites[id]
    , sUrl = sprintf(website.terms, term);

  chrome.tabs.create({ url: sUrl });
}

var websites = {
  'msMetalArchives': {
    title: 'Metal Archives',
    terms: 'http://www.metal-archives.com/search?searchString=%s&type=band_name'
  },
  'msBlabbermoutgnet': {
    title: 'Blabbermouth.net',
    terms: 'http://www.blabbermouth.net/search?s=%s'
  },
  'msMetalStormnet': {
    title: 'MetalStorm.net',
    terms: 'http://www.metalstorm.net/bands/index.php?b_where=b.bandname&b_what=%s'
  },
  'msMetalHammerGr': {
    title: 'Metal Hammer (GR)',
    terms: 'http://www.metalhammer.gr/component/search/?searchword=%s&searchphrase=all&Itemid=101'
  },
  'msMetalInvaderGr': {
    title: 'Metal Invader (GR)',
    terms: 'http://metalinvader.net/?s=%s'
  },
  'msForgottenScroll': {
    title: 'Forgotten Scroll',
    terms: 'http://fscroll.blogspot.gr/search?q=%s'
  },
  'msMetalSucks': {
    title: 'Metal Sucks',
    terms: 'http://www.metalsucks.net/?s=%s'
  },
  'msMetalRules': {
    title: 'Metal Rules',
    terms: 'http://www.metal-rules.com/metalnews/?s=%s'
  }
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({ type: 'separator'   , id: 'msSeparator1' , contexts: ['selection'] });
  chrome.contextMenus.create({ title: 'Search all' , id: 'msSearchAll'  , contexts: ['selection'] });
  chrome.contextMenus.create({ type: 'separator'   , id: 'msSeparator2' , contexts: ['selection'] });

  for (var key in websites) {
    chrome.contextMenus.create({
      title: websites[key].title,
      id: key,
      contexts: ['selection']
    });
  }
});

chrome.contextMenus.onClicked.addListener(function(obj, tab) {
  if (obj.menuItemId === 'msSearchAll') {
    var prompt = confirm('Are you sure?');

    if (prompt) {
      for (id in websites) {
        createTab(id, obj.selectionText);
      }
    }
  } else {
    createTab(obj.menuItemId, obj.selectionText);
  }
});
