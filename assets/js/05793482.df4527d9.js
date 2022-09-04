"use strict";(self.webpackChunkjest_automation=self.webpackChunkjest_automation||[]).push([[371],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>d});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},l=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),m=u(t),d=a,y=m["".concat(s,".").concat(d)]||m[d]||p[d]||o;return t?r.createElement(y,c(c({ref:n},l),{},{components:t})):r.createElement(y,c({ref:n},l))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=m;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var u=2;u<o;u++)c[u]=t[u];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},858:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>u,toc:()=>p});var r=t(7462),a=t(3366),o=(t(7294),t(3905)),c=["components"],i={},s="Asynchronous Step Definitions",u={unversionedId:"cucumber/async",id:"cucumber/async",title:"Asynchronous Step Definitions",description:"The callbacks for Feature, Scenario, Background etc do not allow for async functions so this should be avoided:",source:"@site/docs/cucumber/5_async.md",sourceDirName:"cucumber",slug:"/cucumber/async",permalink:"/jest-automation/docs/cucumber/async",draft:!1,editUrl:"https://github.com/Bendat/jest-automation/docs/cucumber/5_async.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Variables, Regex and Expressions",permalink:"/jest-automation/docs/cucumber/variables"},next:{title:"Tags & Filtering Tests",permalink:"/jest-automation/docs/cucumber/filtering"}},l={},p=[{value:"With Promises",id:"with-promises",level:2}],m={toc:p};function d(e){var n=e.components,t=(0,a.Z)(e,c);return(0,o.kt)("wrapper",(0,r.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"asynchronous-step-definitions"},"Asynchronous Step Definitions"),(0,o.kt)("p",null,"The callbacks for ",(0,o.kt)("inlineCode",{parentName:"p"},"Feature"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Scenario"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Background")," etc do not allow for async functions so this should be avoided:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"Feature(async ({ Scenario }) => {\n  Scenario('', async () => {});\n});\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Steps")," however ",(0,o.kt)("em",{parentName:"p"},"can")," be async or return a promise."),(0,o.kt)("p",null,"The following is allowed:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"Feature(({ Scenario }) => {\n  Scenario('', ({ Given }) => {\n    Given('', async () => {\n      await someActionAsync();\n    });\n  });\n});\n")),(0,o.kt)("h2",{id:"with-promises"},"With Promises"),(0,o.kt)("p",null,"You can avoid making a callback async by simply returning a promise directly at the end of the step"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"Feature(({ Scenario }) => {\n  Scenario('', ({ Given }) => {\n    Given('', () => {\n      return someActionAsync();\n    });\n  });\n});\n")),(0,o.kt)("p",null,"You can also declare functions which can be used directly by the step"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"async function someAsyncFunction(){\n    const response = await HTTP.getThing('something')\n    const updated = modifyResponse(response);\n    return updated\n}\n\nFeature(({ Scenario }) => {\n  Scenario('', ({ Given }) => {\n    Given('', someActionAsyncFunction);\n  });\n});\n")))}d.isMDXComponent=!0}}]);