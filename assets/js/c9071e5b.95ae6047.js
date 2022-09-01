"use strict";(self.webpackChunkjest_automation=self.webpackChunkjest_automation||[]).push([[72],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>h});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),u=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=u(e.components);return a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(t),h=r,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||o;return t?a.createElement(m,i(i({ref:n},c),{},{components:t})):a.createElement(m,i({ref:n},c))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var u=2;u<o;u++)i[u]=t[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},4594:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>l,metadata:()=>u,toc:()=>p});var a=t(7462),r=t(3366),o=(t(7294),t(3905)),i=["components"],l={},s="Intro",u={unversionedId:"cucumber/intro",id:"cucumber/intro",title:"Intro",description:"Jest-Automation is a runner for Cucumber which runs on Jest.",source:"@site/docs/cucumber/1_intro.md",sourceDirName:"cucumber",slug:"/cucumber/intro",permalink:"/jest-automation/docs/cucumber/intro",draft:!1,editUrl:"https://github.com/Bendat/jest-automation/docs/cucumber/1_intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",next:{title:"Automatic Scenarios",permalink:"/jest-automation/docs/cucumber/all-steps"}},c={},p=[{value:"Backgrounds",id:"backgrounds",level:2},{value:"Background In Feature File",id:"background-in-feature-file",level:3},{value:"Background in Steps Only",id:"background-in-steps-only",level:3},{value:"Rules",id:"rules",level:2}],d={toc:p};function h(e){var n=e.components,t=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"intro"},"Intro"),(0,o.kt)("p",null,"Jest-Automation is a runner for ",(0,o.kt)("a",{parentName:"p",href:"https://cucumber.io/"},"Cucumber")," which runs on ",(0,o.kt)("a",{parentName:"p",href:"https://jestjs.io/"},"Jest"),"."),(0,o.kt)("p",null,"It replaces Cucumber with a callback style of test using ",(0,o.kt)("inlineCode",{parentName:"p"},"Scenarios"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Scenario Outlines")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Given")," ",(0,o.kt)("inlineCode",{parentName:"p"},"When")," ",(0,o.kt)("inlineCode",{parentName:"p"},"Then")," etc steps."),(0,o.kt)("p",null,"This library was inspired by ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/bencompton/jest-cucumber"},"jest-cucumber")),(0,o.kt)("h1",{id:"getting-started"},"Getting Started"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title="Install Jest-Automation"',title:'"Install','Jest-Automation"':!0},"npm i -D @jest-automation/cucumber\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'"testMatch": [\n    "**/*.steps.js"\n],\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-gherkin",metastring:'title="Add a Feature File"',title:'"Add',a:!0,Feature:!0,'File"':!0},"Feature: Search For Houses\n    Scenario: I Can Search For A House In London\n        Given I am looking for a house in 'London'\n        When I search for houses\n        Then I receive a list of results\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Create a Steps file"',title:'"Create',a:!0,Steps:!0,'file"':!0},"import { Feature } from '@jest-automation/cucumber';\n\nFeature(() => {}, './features/SearchHouses.feature');\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Feature")," function takes a callback which provides as an argument an object containing the following test functions:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"Scenario")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"ScenarioOutline")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"All"))),(0,o.kt)("p",null,"Also provided is a shared step ",(0,o.kt)("inlineCode",{parentName:"p"},"Background")," function which will be applied to all relevant scenarios, and a ",(0,o.kt)("inlineCode",{parentName:"p"},"Rule"),", which behaves like\na ",(0,o.kt)("inlineCode",{parentName:"p"},"Feature")," and provides ",(0,o.kt)("inlineCode",{parentName:"p"},"Scenario")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"ScenarioOutline"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Add a Scenario"',title:'"Add',a:!0,'Scenario"':!0},"import { Feature } from '@jest-automation/cucumber';\n\nFeature(({ Scenario }) => {\n  Scenario('I Can Search For A House In London', () => {});\n}, './features/SearchHouses.feature');\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"N.b ensure that scenarios have complete, unique names.")),(0,o.kt)("p",null,"The callback objects like ",(0,o.kt)("inlineCode",{parentName:"p"},"Scenario")," also take a callback, which\nprovides the step functions."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="Add Steps"',title:'"Add','Steps"':!0},"import { Feature } from '@jest-automation/cucumber';\nimport { Searcher } from '../src/test-actions';\n\nFeature(({ Scenario }) => {\n  Scenario('I Can Search For A House In London', ({ Given, When, Then }) => {\n    Given('I am looking for a house in London', () => {\n      Searcher.setLocation('London');\n    });\n\n    When('I search for houses', () => {\n      Searcher.executeSearch();\n    });\n\n    Then('I receive a list of results', () => {\n      const expected = [\n        { address: '1 Pilsbury Lane', bedrooms: 2, bathrooms: 'cost extra' },\n      ];\n      expect(Searcher.result).toStrictEqual(expected);\n    });\n  });\n}, './features/SearchHouses.feature');\n")),(0,o.kt)("h2",{id:"backgrounds"},"Backgrounds"),(0,o.kt)("p",null,"Backgrounds are another test callback. Steps in a Background\nwill be reused across any scenarios within scope of that Background - i.e a Background inside a rule is not relevant to a Scenario outside a rule."),(0,o.kt)("p",null,"Backgrounds in Jest-Automation do not have to match the Background blocks in a Feature file - They can be ignored entirely or used to reduce initialization steps that don't have a Background in Feature."),(0,o.kt)("h3",{id:"background-in-feature-file"},"Background In Feature File"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-gherkin"},"Feature: A Feature\n    Background:\n        Given a setup step\n\n    Scenario: A Scenario\n        When a when step\n")),(0,o.kt)("p",null,"The steps for this can be:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"Feature(({ Background, Scenario }) => {\n  Background(({ Given }) => {\n    Given('a setup step', () => {});\n  });\n\n  Scenario('A Scenario', () => {\n    When('a when step', () => {});\n  });\n});\n")),(0,o.kt)("p",null,"or"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"Feature(({ Scenario }) => {\n  Scenario('A Scenario', () => {\n    Given('a setup step', () => {});\n    When('a when step', () => {});\n  });\n});\n")),(0,o.kt)("p",null,"As the Background is optional."),(0,o.kt)("h3",{id:"background-in-steps-only"},"Background in Steps Only"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-gherkin"},"Feature: A Feature\n    Scenario: A Scenario\n        Given a setup step\n        When a when step\n\n    Scenario: Another Scenario\n        Given a setup step\n        When another when step\n")),(0,o.kt)("p",null,"The steps for this can be:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"Feature(({ Background, Scenario }) => {\n  Background(({ Given }) => {\n    Given('a setup step', () => {});\n  });\n\n  Scenario('A Scenario', ({ When }) => {\n    When('a when step', () => {});\n  });\n\n  Scenario('Another Scenario', ({ Then }) => {\n    When('a when step', () => {});\n  });\n});\n")),(0,o.kt)("h2",{id:"rules"},"Rules"),(0,o.kt)("p",null,"Rules behave similarly to the ",(0,o.kt)("inlineCode",{parentName:"p"},"Feature")," function. It is a function\nprovided by the ",(0,o.kt)("inlineCode",{parentName:"p"},"Feature")," and which provides it's own copy of ",(0,o.kt)("inlineCode",{parentName:"p"},"Scenario"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"ScenarioOutline")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Background")," which map to a\nRule in the Feature File"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-gherkin"},"Feature: A User Can Log In\n    Background:\n        Given a user\n\n    Scenario: A User Successfully Logs In\n        Given they enter their credentials\n        When they log in\n        The they are presented with their profile\n\n    Rule: If a username is invalid, then the log in will fail\n        Scenario: A User Cannot Log In Without A Username\n            Given they do not provide a username\n            When they log in\n            Then log in fails\n\n        Scenario: A User Cannot Log In With The Wrong Username\n            Given they provide the wrong username\n            When they log in\n            Then log in fails\n\n")),(0,o.kt)("p",null,"Which can be expressed as"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"Feature(({ Background, Scenario, Rule })=>{\n    Background(({ Given })=>{\n        Given('a user', ()=>{})\n    });\n\n    Scenario(' A User Successfully Logs In', ({ Given, When, Then })=>{\n        Given('they enter their credentials', ()=>{})\n        When('they log in', ()=>{})\n        Then('they are presented with their profile', ()=>{})\n    });\n\n    Rule('If a username is invalid, then the log in will fail', ({ Scenario })=>{\n        Scenario('A User Cannot Log In Without A Username', ()=>{...})\n        Scenario('A User Cannot Log In With The Wrong Username', ()=>{...})\n    })\n}, './file.feature')\n\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"note: Rules can also have a Background")))}h.isMDXComponent=!0}}]);