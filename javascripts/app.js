var App;
App = (function() {
  function App(element) {
    this.root = element;
    this.document = data.document;
    this.write(this.root);
    this.bindEvents();
    window.setTimeout(function() {
      return $(".logo").each(function() {
        return $(this).css({
          "margin-top": (($(this).parent().height() - $(this).height()) / 2) + "px",
          "width": "auto"
        });
      });
    }, 10);
  }
  App.prototype.bindEvents = function() {
    $(".items > *").live("click", function(e) {
      if (!$(this)[0].nodeName.match(/A/)) {
        if ($(this).hasClass("expanded") && !$(e.target)[0].className.match(/name|description|website/)) {
          return $(this).removeClass("expanded");
        } else {
          return $(this).addClass("expanded");
        }
      }
    });
    return $(".category").live("click", function(e) {
      var items;
      items = $(this).siblings(".items").children();
      if ($(items).hasClass("expanded")) {
        return $(items).removeClass("expanded");
      } else {
        return $(items).addClass("expanded");
      }
    });
  };
  App.prototype.write = function(element) {
    $(element).hide();
    $(element).append(this.htmlify(this.document));
    $(element).append(document.createElement("pre")).find("pre").text(this.htmlify(this.document, true));
    return $(element).fadeIn("fast");
  };
  App.prototype.tagify = function(tag, content) {
    var attributes, matches, node;
    if (content == null) {
      content = "";
    }
    if (tag && tag.indexOf("(") > 0 && tag.indexOf(")") > 0) {
      attributes = tag.split("(")[1].split(")")[0];
      tag = tag.split("(")[0];
    } else {
      attributes = "";
    }
    matches = tag.match(/a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|device|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|menu|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|ul|var|video|wbr/);
    if (matches && matches[0].length === tag.length && !matches[0].match(/title/)) {
      if (parseInt(tag) > 0 && parseInt(tag).toString().length === tag.toString().length) {
        tag = "n" + tag;
      }
      return "<" + tag + ">" + content + "</" + tag + ">";
    } else {
      node = "div";
      if ((attributes && attributes.match(/href/)) || content.indexOf('http') === 0) {
        node = "a";
        attributes = "href='" + content + "'";
        if (!attributes.match(window.location.href)) {
          attributes += " target='_blank'";
        }
      }
      if (content.match(/\.jpg$|\.png$/)) {
        return "<img class='" + tag + "' src='" + content + "' />";
      }
      return "<" + node + " class=\"" + tag + "\"" + attributes + ">" + content + "</" + node + ">";
    }
  };
  App.prototype.process = function(type, input) {
    if (type == null) {
      type = "value";
    }
    return input;
  };
  App.prototype.htmlify = function(object, prettify) {
    var item, result, _i, _len;
    if (prettify == null) {
      prettify = false;
    }
    result = "";
    if (object instanceof Array) {
      for (_i = 0, _len = object.length; _i < _len; _i++) {
        item = object[_i];
        item = this.process("value", item);
        result += this.tagify("li", item);
      }
      result = this.tagify("ul", result);
    } else if (object instanceof Object) {
      for (item in object) {
        switch (typeof object[item]) {
          case "string":
            result += this.tagify(item, this.htmlify(object[item]));
            break;
          case "object":
            result += this.tagify(item, this.htmlify(object[item]));
        }
      }
    } else {
      return this.process("value", object);
    }
    if (prettify) {
      result = indent(result, null);
    }
    return result;
  };
  return App;
})();