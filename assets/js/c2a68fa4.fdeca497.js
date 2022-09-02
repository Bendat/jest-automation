"use strict";(self.webpackChunkjest_automation=self.webpackChunkjest_automation||[]).push([[408],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),g=u(n),d=a,m=g["".concat(s,".").concat(d)]||g[d]||p[d]||o;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},8419:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={},s="Flags",u={unversionedId:"cucumber/Configuration/flags",id:"cucumber/Configuration/flags",title:"Flags",description:"Flags are toggles which can be method chained.",source:"@site/docs/cucumber/Configuration/2_flags.md",sourceDirName:"cucumber/Configuration",slug:"/cucumber/Configuration/flags",permalink:"/jest-automation/docs/cucumber/Configuration/flags",draft:!1,editUrl:"https://github.com/Bendat/jest-automation/docs/cucumber/Configuration/2_flags.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Setup & Configuration",permalink:"/jest-automation/docs/cucumber/Configuration/setup"},next:{title:"DTO & Builder Pattern",permalink:"/jest-automation/docs/utilities/dto-builder"}},c={},p=[{value:"Available Flags:",id:"available-flags",level:2},{value:"enableLoggingGroups()",id:"enablelogginggroups",level:3}],g={toc:p};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"flags"},"Flags"),(0,o.kt)("p",null,"Flags are toggles which can be method chained.\nThey are accessible through the ",(0,o.kt)("inlineCode",{parentName:"p"},"Flags")," object"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:"title='jest-automation.setup.ts'",title:"'jest-automation.setup.ts'"},"import { Flags } from '@jest-automation/cucumber';\n\nFlags.enableLoggingGroups();\n")),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"Flag methods return a ",(0,o.kt)("inlineCode",{parentName:"p"},"Flags")," instance and can\nbe chained.")),(0,o.kt)("h2",{id:"available-flags"},"Available Flags:"),(0,o.kt)("h3",{id:"enablelogginggroups"},"enableLoggingGroups()"),(0,o.kt)("p",null,"Enables logging groups. When enabled, logs\nwill be indented and unindented as tests and\nsteps complete, making it easier to understand the execution\nof your test."),(0,o.kt)("p",null,"Will not work as expected if used asynchronously or concurrently - while\nasync code can be run inside a group, groups should not be created in async code\nthat is not forced to synchronize."),(0,o.kt)("p",null,"It will also likely display incorrectly when running multiple files in jest at once,\nas they will be run concurrently. This can be worked around with ",(0,o.kt)("inlineCode",{parentName:"p"},"--runInBand"),", however this may\nhurt performance."),(0,o.kt)("p",null,"If the environment variable ",(0,o.kt)("inlineCode",{parentName:"p"},"USE_LOGGING_GROUPS")," is set, it will take priority."),(0,o.kt)("p",null,"When enabled, test logs will take the shape of their gherkin counterpart"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Feature: Some Feature\n    Scenario: Some Scenario\n        Given some given step\n            [Log]\n            some user generated log\n            /path/to/log:8:40\n        When some when step\n            [Info]\n            http client recieved response: {message: 'howdy'}\n            /path/to/log:11:9\n\n")))}d.isMDXComponent=!0}}]);