# The Kata: Shopping List

We need a web app to manage a list of items. The list of requirements:
* An item has a name with more than 0 characters
* The user can add an item
* The user can remove a selected item
* The user can modify the name of an item
* The user can delete an item
* The quantity of items of a name, should be shown.
* The user can delete all the items, but it should be warned about this action

The user interface must allow to the user to do this actions. Some recomendations:
* A button for each action is a good option for the user
* An input text for the name of theitem, is a good option for the user
* Not more than 10 items should be presented in the screen at once
* The name and the quantity in format of row of a table is a good option for the user
* The pop up message is a good option for critical warnings which needs a confirmation of the user
* Message for validations should be shown like little message below the input message 

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
