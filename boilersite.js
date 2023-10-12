

document.getElementById('showStyles').onclick = function() {
    var $lorem =  document.getElementById('ipsum');

    var $code = document.getElementById('code');
    var rules = CSSDICT.getCustomCssRulesOnElement($lorem);
    console.log(rules);
  
    for (var i = 0; i < rules.length; i++) {
      $code.innerText += '\n\n//Order: ' + rules[i].order 
                       + ' | Media:'     + rules[i].media + '\n' 
                                         + rules[i].content;
    }
  }
  
  var CSSDICT = function() {
    var getCustomCssRulesOnElement = function(elm) {
      var elementRules = [];
      var slice = Function.call.bind(Array.prototype.slice);
  
      var isCssMediaRule = function(cssRule) {
        return cssRule.type === cssRule.MEDIA_RULE; //cssRule.getName() === 'CSSMediaRule';
      }
  
      var mediaRuleMatchesDocument = function(cssRule) {
        var match = window.matchMedia( cssRule.media.mediaText ).matches;
        if (!match) console.log(cssRule.media.mediaText + ' does not apply to doc.');
        return match;
      }
      
      var isCssStyleRule = function(cssRule) {
        return cssRule.type === cssRule.STYLE_RULE; //cssRule.getName() === 'CSSStyleRule';
      }
  
      // Here we get the cssRules across all the stylesheets in one array
      var cssRules = slice(document.styleSheets).reduce(function(rules, styleSheet) {
        return rules.concat(slice(styleSheet.cssRules));
      }, []);
  
      var mediaRules = cssRules.filter(isCssMediaRule)
                               .filter(mediaRuleMatchesDocument);
  
      cssRules = cssRules.filter(isCssStyleRule);
  
      cssRules = cssRules.concat(slice(mediaRules).reduce(function(rules, mediaRule) {
        return rules.concat(slice(mediaRule.cssRules));
      }, []));
  
      console.log(cssRules);
  
      // get only the css rules that matches that element
      var rulesOnElement = cssRules.filter(isElementMatchWithCssRule.bind(null, elm));
      var elementRule = function(order, content, media) {
        if (media === undefined || media == null || media == '') {
          media = 'all';
        }
        this.order = order;
        this.content = content;
        this.media = media;
      }
      if (rulesOnElement.length) {
        for (var i = 0; i < rulesOnElement.length; i++) {
          var e = rulesOnElement[i];
          var order = i;
          var content = e.cssText;
          var media = e.parentRule == null 
                      ? e.parentStyleSheet == null 
                        ? 'all' 
                        : e.parentStyleSheet.media.mediaText 
                      : e.parentRule.media.mediaText;
  
          var _elementRule = new elementRule(order, content, media);
          elementRules.push(_elementRule);
        }
      }
  
      if (elm.getAttribute('style')) {
        var _elementRule = new elementRule(rulesOnElement.length, 'style {' + elm.getAttribute('style') + '}')
        elementRules.push(_elementRule);
      }
      return elementRules;
    };
  
    var isElementMatchWithCssRule = function(element, cssRule) {
      var proto = Element.prototype;
      var matches = Function.call.bind(proto.matchesSelector ||
        proto.mozMatchesSelector || proto.webkitMatchesSelector ||
        proto.msMatchesSelector || proto.oMatchesSelector);
      return matches(element, cssRule.selectorText);
    };
  
    return {
      getCustomCssRulesOnElement: function(element) {
        return getCustomCssRulesOnElement(element);
      }
    }
  
  }()
  