<!DOCTYPE html>
<html>
<head>
    <title>${modName}</title>
    <meta http-equiv=Content-Type content="text/html;charset=utf-8">
    <link href="http://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css" type="text/css" rel="stylesheet" />
    <link rel="stylesheet" href="${css}" charset="utf-8">
    <style>
        .hljs {
            display: block;
            overflow-x: auto;
            padding: 0.5em;
            color: #333;
            background: #f8f8f8;
            -webkit-text-size-adjust: none;
        }

        .hljs-comment,
        .diff .hljs-header,
        .hljs-javadoc {
            color: #998;
            font-style: italic;
        }

        .hljs-keyword,
        .css .rule .hljs-keyword,
        .hljs-winutils,
        .nginx .hljs-title,
        .hljs-subst,
        .hljs-request,
        .hljs-status {
            color: #333;
            font-weight: bold;
        }

        .hljs-number,
        .hljs-hexcolor,
        .ruby .hljs-constant {
            color: #008080;
        }

        .hljs-string,
        .hljs-tag .hljs-value,
        .hljs-phpdoc,
        .hljs-dartdoc,
        .tex .hljs-formula {
            color: #d14;
        }

        .hljs-title,
        .hljs-id,
        .scss .hljs-preprocessor {
            color: #900;
            font-weight: bold;
        }

        .hljs-list .hljs-keyword,
        .hljs-subst {
            font-weight: normal;
        }

        .hljs-class .hljs-title,
        .hljs-type,
        .vhdl .hljs-literal,
        .tex .hljs-command {
            color: #458;
            font-weight: bold;
        }

        .hljs-tag,
        .hljs-tag .hljs-title,
        .hljs-rules .hljs-property,
        .django .hljs-tag .hljs-keyword {
            color: #000080;
            font-weight: normal;
        }

        .hljs-attribute,
        .hljs-variable,
        .lisp .hljs-body {
            color: #008080;
        }

        .hljs-regexp {
            color: #009926;
        }

        .hljs-symbol,
        .ruby .hljs-symbol .hljs-string,
        .lisp .hljs-keyword,
        .clojure .hljs-keyword,
        .scheme .hljs-keyword,
        .tex .hljs-special,
        .hljs-prompt {
            color: #990073;
        }

        .hljs-built_in {
            color: #0086b3;
        }

        .hljs-preprocessor,
        .hljs-pragma,
        .hljs-pi,
        .hljs-doctype,
        .hljs-shebang,
        .hljs-cdata {
            color: #999;
            font-weight: bold;
        }

        .hljs-deletion {
            background: #fdd;
        }

        .hljs-addition {
            background: #dfd;
        }

        .diff .hljs-change {
            background: #0086b3;
        }

        .hljs-chunk {
            color: #aaa;
        }

        .highlight {
            background-color: transparent;
            padding-top: 1px;
            position: relative;
        }

        .highlight pre {
            font-family: Consolas, "Liberation Mono", Courier, monospace;
            margin: 6px 0;
            border: 1px solid #eee;
            padding: 6px 10px;
            overflow: auto;
            border-radius: 2px;
            background-color: #f8f8f9;
            line-height: 19px;
            font-size: 13px;
            white-space: pre;
        }

        .highlight pre code {
            color: #5D6A6A;
            background-color: transparent;
            margin: auto;
            padding: 0;
        }
    </style>
    <!--[if lt IE 9]>
  <script>
  // Console-polyfill. MIT license.
  // https://github.com/paulmillr/console-polyfill
  // Make it safe to do console.log() always.
  (function(global) {
    'use strict';
    global.console = global.console || {};
    var con = global.console;
    var prop, method;
    var empty = {};
    var dummy = function() {};
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
       'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
       'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
    while (prop = properties.pop()) con[prop] = con[prop] || empty;
    while (method = methods.pop()) con[method] = con[method] || dummy;
  })(typeof window === 'undefined' ? this : window);
  // Using `this` for web workers while maintaining compatibility with browser
  // targeted script loaders such as Browserify or Webpack where the only way to
  // get to the global object is via `window`.
  </script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.0/es5-shim.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.0/es5-sham.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.js"></script>
  <![endif]-->
    <script src="../../lib/react.js"></script>
</head>

<body>
    <h1>${modName}</h1>
    <div id="demo"></div>
    <script src="${common}?nowrap"></script>
    <script src="${app}?nowrap"></script>
    <div class="highlight">
        <pre>
            ${code}
        </pre>
    </div>
</body>

</html>
