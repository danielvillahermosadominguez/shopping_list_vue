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
