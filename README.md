# The Kata: Shopping List

We need a web app to manage a list of items. The list of requirements:
* An item has a name must start with A-Z or a-z or a number but no spaces before the first character
* The user can add an item
* The user can remove a selected item
* The user can modify the name of an item
* The quantity of items of a name, should be shown.
* The user can delete all the items, but it should be warned about this action

The user interface must allow to the user to do this actions. Some recomendations:
* A button for each action is a good option for the user, but it should be interested to have a button in the own item to remove and update.
* An input text for the name of the item, is a good option for the user whe he/she is adding a new item or deleting all the items.
* Not more than 10 items should be presented in the screen at once
* The name and the quantity in format of row of a table is a good option for the user
* The pop up message is a good option for critical warnings which needs a confirmation of the user or if he/she is asked for something
* Message for validations should be shown like little message below the inputs fields.
* Every user should have their own shopping list and they should see the shopping list of other users

# Labels in the repository
* BASE_APOLLO => here you have a first project with everything you need to start the kata with apollo and graphql + VUE
* ADD_ITEM => here you have the implementation of the first feature by ATDD
# Types of tests

We are using vue and the testing types for vue are:
* unit: focused on the class behaviours
* component: focused on the component behaviours without to take into account integrations
* end to end: we haven't done this kind of tests in this kata. You should use cypress or a similar tool.
* We have included a folder which is not part of the recomendations for vue:
  * integration: the integration between pages- components and other classes, trying to test the correct integration
  * in this case, if we want to practice TDD-outside in, we would start with the page or main component
  * Ideally, you should use e2e test with cypress, but in this case, it is not the focus of the kata.

To do it, you will need to configurate jest. In jest, by default it is going to look for test in: default: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]
https://jestjs.io/docs/configuration#testmatch-arraystring

In jest.config.js you should add:
``` ts
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
     "**/__tests__/**/*.[jt]s?(x)",
     "**/?(*.)+(spec|test).[tj]s?(x)"
   ]
}
```

And also, for ATDD we are going to use the exception:  throw new Error("Not implemented");  when a method or acceptance test is not implemented yet.

# Activate Test coverage
You need to configure the collectCoverage and CollectCoverageFrom 
``` js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue, ts}',
    '!src/main.js', // No need to cover bootstrap file
  ],
}

```
Now, when you execute "npm run test:unit" you will see the coverage when the test are executed and a folder will be crated: coverage
# Apollo Client - some notes
I have created an application service to encaptusate the calls to apollo. In addition, we have created a fixture for the acceptance tests (not end to end).
 * The class AppService contains all the code to configure the client. Some relevant libraries

``` bash
npm install --save apollo-client
npm install --save cross-fetch
npm install --save apollo-link-http
npm install --save apollo-cache-inmemory
```
 * the mutations and queries are in the same file: graphql\shoppinglist.ts
 * 

# Apollo Server

We are going to use an apollo server in local to mock the calls to the server. So we will need intall:

``` bash
npm install apollo-server
npm install uuid //This to generate uids for your mock service
```

And you need to include in the package.json
```json
...
"type": "module", 
...
```

You can execute the server with the following command:

```
node index.js
```

# Vue installation

## Creation of the repository
To install vue you will need to execute:

``` bash
npm install -g @vue/cli
vue --version
```

Once you have installed vue, you could create the vue project:

``` bash
vue create shopping_list_vue
```
You must follow the instructions. Choose the following options:
* Manually select features
* Select: Babel, Typescript, router, Linter/Formatter and unit testing
* 2.x <- version of vue.js
* Use class-style component syntax
* Use bablel alongside typescript
* historymode for router = no
* ESLint with error prevention only
* Lint on save
* Jest
* Config for babel, eslint, etc: in dedicated config files
* save this as a preset for future projects = no

When you finish the creation of the repository you could use the following commands:
 
 ``` bash
    npm run serve // launch the project
    npm run build // build the solution
    npm run test:unit // unit tests
    npm run lint // linter
 ```
## The NVM windows installation

You could want to use nvm for windows (we are using windows to develop). In this case you could choose a version of node and all the dependencies will be 
installed on it.

https://github.com/coreybutler/nvm-windows


 ## Push the repository
 If you have created in Github an empty repository you should follow the following instructions:
 ``` bash
   // git init => you don't need to do it because during the creation of the vue repository, this includes this step
   git branch -m main // change the name of the branch from master to main
   git remote add origin git@github.com:danielvillahermosadominguez/shopping_list_vue.git
   git push -u -f origin main
```
When you commit and push something, you should use the convenctions for git:
https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/

# Including Testing library

You have testing library in: https://testing-library.com/

With the creation of the project you have installed the default framework for tests: test-utils. Now you should change it.

The current example test with test utils is:
``` ts
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```

You must install testing library with:

``` bash
npm install --save-dev @testing-library/vue@5 //for vue2. in case of vue2
npm install --save-dev @testing-library/jest-dom

```

NOTE: --save-dev or -D option is used to install and save you project dependencies under the devDependencies object. They will be ignored when you run a production build

Now, we are going to make some changes in the test:
``` ts
import {render} from '@testing-library/vue';
import '@testing-library/jest-dom'
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const {getByText} = render(HelloWorld, {
      propsData: {msg}
    });
    
    expect(getByText(msg)).toBeInTheDocument();
  })
});
```

# Configuring Visual Studio Code

You can select Run->add configuration and "jest debug...". You will hava a folder with .vcode and a file called launch.json

Also, you will have in Testing a UI to run your tests.

``` json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        
        {
            "type": "node",
            "name": "vscode-jest-tests.v2",
            "request": "launch",
            "args": [
                "--runInBand",
                "--watchAll=false",
                "--testNamePattern",
                "${jest.testNamePattern}",
                "--runTestsByPath",
                "${jest.testFile}"
            ],
            "cwd": "${workspaceFolder}",
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "disableOptimisticBPs": true,
            "program": "${workspaceFolder}/node_modules/.bin/jest",
            "windows": {
                "program": "${workspaceFolder}/node_modules/jest/bin/jest"
            }
        }
    ]
}
```

# The first UI design

We are going to practice TDD with the user interface, but you will need to have the start page in white.

* go to the HomeView.vue and remove the Helloworld component
* Write "To be developed"

Now you can start the kata

# The graphQL configuration
For this kata we are going to create a create a simple backend with apollo, but the final idea is to connect this Front with
a bakend which will be created in other repository and with other technology. But for our tests, we will use  a simple apollo 
server.

Our front will use an apollo client to call to this fake server.

## The apollo client configuration
You have the instructions in apollo.vue.org. For Vue 3, the information is in:
https://apollo.vuejs.org/guide/installation.html#_3-apollo-provider

But in our case we are using Vue 2, so we will  need to review it:https://apollo.vuejs.org/migration/#plugin-setup

The steps to prepare the solution for the Apollo client are:
* Install apollo boost or Apollo client (more detailled configuration).  Apollo bost is a zero-config way to start using apollo clients with some sensible defautls. If we want to use the full configuration for Apollo client we need to configure more things.
``` bash
npm install --save vue-apollo graphql apollo-client apollo-link apollo-link-http apollo-cache-inmemory graphql-tag
for vue 2.x
npm install --save vue-apollo apollo-client@1.9.2
npm install --save subscriptions-transport-ws@0.7

```
You will need to have in your app an ApolloClient instance. You should include it in the main.js file.

make a look: https://www.npmjs.com/package/apollo-client?activeTab=versions: 1.9.2 is very 

``` ts
// vue3
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3020/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

```
* You will need to install the plugin into Vue
  
  ```ts
  import Vue from 'vue';
  import VueApollo from 'vue-apollo'
  Vue.use(VueApollo)
  ```

* The apollo provider allow to be used the apollo client for the components

``` ts
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
```

* And you could add in the app the apollo provider:

``` ts
new Vue({
  el: '#app',
  // inject apolloProvider here like vue-router or vuex
  apolloProvider,
  render: h => h(App),
})
```
Now you are ready to use apollo in your components

NOTE: For Visual Studio Code you have an extension. In this way you could have your "apollo.config.js" with the following 
configuration
```js
// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: 'http://localhost:3000/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}
```

NOTE: For vue 2, you need to take into account some changes.
https://apollo.vuejs.org/migration/#packages-2

``` ts
import Vue from 'vue';
import App from './App.vue';
import VueApollo from 'vue-apollo';
import router from './router';
import { ApolloClient, createNetworkInterface, createBatchingNetworkInterface}  from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
Vue.config.productionTip = false


// Create the network interface
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
})

// Create the subscription websocket client
const wsClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {
  reconnect: true,
})

// Extend the network interface with the subscription client
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
)

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'http://localhost:3020/graphql',
  }),
  connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo, {
  apolloClient,
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  // inject apolloProvider here like vue-router or vuex
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')
```

Ojo, todo esto de apollo tenemos que cambiarlo.

Además tener en cuenta que nos pide vuex, posiblemente por apollo? No lo se, pero para Vue2 tenemos que instalar esto:


## The apollo server (fake) configuration

+ load as a fixture with threads

```
npm install --save threads

```

# Environment and testing

You need to have into account you could access to the environment variables in Vue with a file .env and creating the variables with
the following prefix: VUE_APP_YOUR_VARIABLE.

These variables will be loaded and you will be able to access to them with:

process.env.VUE_APP_YOUR_VARIABLE

the problem will be with jest, because these variables will be loaded when you are doing:

```
npm run dev

```

And launching the app.

But to load environment variables indepent on it, for example, to run with the test with jest you have to
https://stackoverflow.com/questions/48033841/test-process-env-with-jest

1. npm install dotenv --save-dev dotenv that uses to access environment variable.
2. Create your .env file to the root directory of your application and add this line into it (in this case you don't need to use the prefix for vuex)
3. Create your custom module file as its name being someModuleForTest.js and add this line into it:

```
// someModuleForTest.js
require("dotenv").config()
```
4. Update your jest.config.js file like this:
```
module.exports = {
  setupFiles: ["./someModuleForTest"]
}
```
5.You can access an environment variable within all test blocks.
```
test("Some test name", () => {
  expect(process.env.APP_PORT).toBe("8080")
})
```

#Integrate Sonarcloud with github actions
https://github.com/SonarSource/sonarcloud-github-action

STeps : to be developed. And the problems and solutions:

error:You are running CI analysis while Automatic Analysis is enabled. Please consider disabling one or the other.
https://community.sonarsource.com/t/sonarcloud-task-fails-because-of-ci-analysis-and-auto-analysis-running/22937
