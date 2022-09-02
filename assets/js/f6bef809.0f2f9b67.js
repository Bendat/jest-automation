"use strict";(self.webpackChunkjest_automation=self.webpackChunkjest_automation||[]).push([[379],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>b});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(n),b=a,d=m["".concat(l,".").concat(b)]||m[b]||p[b]||o;return n?r.createElement(d,i(i({ref:t},u),{},{components:n})):r.createElement(d,i({ref:t},u))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9406:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>b,frontMatter:()=>s,metadata:()=>c,toc:()=>p});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={},l="Variables, Regex and Expressions",c={unversionedId:"cucumber/variables",id:"cucumber/variables",title:"Variables, Regex and Expressions",description:"Variables can be extracted from a Gherkin step using either",source:"@site/docs/cucumber/4_variables.md",sourceDirName:"cucumber",slug:"/cucumber/variables",permalink:"/jest-automation/docs/cucumber/variables",draft:!1,editUrl:"https://github.com/Bendat/jest-automation/docs/cucumber/4_variables.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Reusing Steps",permalink:"/jest-automation/docs/cucumber/shared-steps"},next:{title:"Asynchronous Step Definitions",permalink:"/jest-automation/docs/cucumber/async"}},u={},p=[{value:"Cucumber Expressions Example",id:"cucumber-expressions-example",level:2}],m={toc:p};function b(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"variables-regex-and-expressions"},"Variables, Regex and Expressions"),(0,o.kt)("p",null,"Variables can be extracted from a Gherkin step using either\nRegex or ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cucumber/cucumber-expressions#readme"},"Cucumber Expressions"),"."),(0,o.kt)("p",null,"Once extracted, the variable will be passed to the argument list\nof the Step function being executed."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"N.b while the expression or regex might match a non-string value, a string value may still be returned. In most cases expression strings should transform the type of the data. Custom parameter transformers are not currently supported.")),(0,o.kt)("h2",{id:"cucumber-expressions-example"},"Cucumber Expressions Example"),(0,o.kt)("p",null,"Cucumber Expressions match a ",(0,o.kt)("inlineCode",{parentName:"p"},"{keyword}")," from the step definition string, to a piece of text in the feature file step string."),(0,o.kt)("p",null,"E.g to match an alphanumeric word as a string, ",(0,o.kt)("inlineCode",{parentName:"p"},"{string}")," is used, other options include ",(0,o.kt)("inlineCode",{parentName:"p"},"{int}"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"{float}"),", and others."),(0,o.kt)("p",null,"Take the following step:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-gherkin"},"Scenario Outline: A Scenario Outline\n    Given a <object> with <count> crabs inside\n\n    Examples:\n      | object | count |\n      | bucket | 50    |\n      | bowl   | 3     |\n...\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"N.b expressions work with normal scenarios, or outlines with variables inject, even on steps with no variables.")),(0,o.kt)("p",null,"The step definition would then be"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"...\nGiven('a {word} with {int} crabs inside', ()=>{})\n...\n")),(0,o.kt)("p",null,"The values extracted can be taken from the argument list"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"...\nGiven('a {word} with {int} crabs inside', (obj: string, count: number)=>{\n    console.log(obj) // prints 'bucket' then 'bowl'\n    console.log(count) // prints 1 then 2\n})\n...\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Currently type transformation is only possible with Cucumber Expressions, and is not available for Regex")),(0,o.kt)("h1",{id:"tables"},"Tables"),(0,o.kt)("p",null,"The last or second to last variable passed to a step will\nbe its table, if one is defined:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-gherkin"},"Given a list of books and authors\n| book                            | author      |\n| The Good, The BDD, and The Ugly | Joe Millard |\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Step Definition"',title:'"Step','Definition"':!0},"Given('a list of books and authors', (table: GherkinTable)=>{\n    const [firstItem] = table.rows;\n    const [book, author] = firstItem;\n    expect(book).toBe('The Good, The BDD, and The Ugly')\n    expect(author).toBe('Joe Millard)\n})\n")))}b.isMDXComponent=!0}}]);