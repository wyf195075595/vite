<!--
 * @Description:
 * @Author:
 * @Date: 2022-08-05 11:07:09
 * @LastEditTime: 2022-12-19 11:29:53
 * @LastEditors:  
-->

# Vite

This directory is a brief example of a Vite/Vue.js site that can be deployed to Vercel with zero configuration.

While this project uses Vue.js, Vite supports many popular JS frameworks. [See all the supported frameworks](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

## Deploy Your Own

Deploy your own Vite project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/vite&template=vite)

_Live Example: https://vite-vue-template.vercel.app_

### How We Created This Example

To get started with Vue.js deployed with Vercel, you can use Vite (https://vitejs.dev/guide/#scaffolding-your-first-vite-project) to initialize the project:

```shell
$ yarn create @vitejs/app
```

### Deploying From Your Terminal

You can deploy your new Vite project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
$ vercel
```

```js

{
  base: {
    range: '@range(3, 7)',
    string: '@string(7, 20)',
    character: '@character("abcde")',
    float: '@float(60, 100)',
    integer: '@integer(60, 100)',
    natural: '@natural(60, 100)',
    boolean: '@boolean'
  },
  date: { date: '@date', time: '@time', datetime: '@datetime', now: '@now' },
  image: { image: '@image("200x200", "#50B347", "#FFF", "FastMock")' },
  color: {
    color: '@color',
    hex: '@hex',
    rgb: '@rgb',
    rgba: '@rgba',
    hsl: '@hsl'
  },
  text: {
    paragraph: '@paragraph(1, 3)',
    sentence: '@sentence(3, 5)',
    word: '@word(3, 5)',
    title: '@title(3, 5)',
    cparagraph: '@cparagraph(1, 3)',
    csentence: '@csentence(3, 5)',
    cword: '@cword("零一二三四五六七八九十", 5, 7)',
    ctitle: '@ctitle(3, 5)'
  },
  name: {
    first: '@first',
    last: '@last',
    name: '@name',
    cfirst: '@cfirst',
    clast: '@clast',
    cname: '@cname'
  },
  web: {
    url: '@url',
    domain: '@domain',
    protocol: '@protocol',
    tld: '@tld',
    email: '@email',
    ip: '@ip'
  },
  address: {
    region: '@region',
    province: '@province',
    city: '@city(true)',
    county: '@county(true)',
    zip: '@zip'
  },
  helper: {
    capitalize: '@capitalize("hello")',
    upper: '@upper("hello")',
    lower: '@lower("HELLO")',
    pick: '@pick(["h", "e", "llo"])',
    shuffle: '@shuffle(["h", "e", "llo"])'
  },
  miscellaneous: { id: '@id', guid: '@guid', increment: '@increment(1000)' }
}
```
