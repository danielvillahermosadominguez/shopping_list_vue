# Log book.

05.03.2023

- Now I'm with the first acceptance test. With the unit tests for the component Shopping List
- Also, we need to finish the integration test with the Apollo integration, so we will need to implement the App Service methods
- In addition, I suppose we need to create a little server of apollo which can work like a Fake
  - It could be interesting research if we could use wiremock or something like that for this.
  - The main idea is to work on the backend part, but with kotlin
- Detected bugs:
  - [BUG]The about and home, doesn't work properly
- Detected improvements:
  - Works in styles could be interesing. For example, the table, could need some lines.


07.03.2023

- doing a test to connect the apollo client in the integration test
https://www.apollographql.com/docs/react/get-started/

Now the code is not working and you are doing dirty code in the AppService: Proof of concept

08.03.2023

- doint a test to connect the apollo cliente in the integration test.
  - We have created the mini-server with a fixture. We can run the apollo server and send queries and mutations
  - We try to connect with two queries but we dont receive anything


10/03/2023

- I got to connect with apollo client to server client.
- Now a problem with the test and the calls which are asynchronous.
- We want to simulate a server service but it is not syncronous, so, for the clear mocks we need to look for some wind of wait for
- And we need to use await for calls to asyncrhonous methods.
- In the ShoppingList component, when I add an item, don't paint it (the server return always the same list). But reloading the page
  we have all the items.

11/03/2023
- We have the acceptance test running and with the server as a fixture
- Next steps are:
  - Refactoring
  - Think about to use the ViewModel Pattern
  - Validation of the name. It should be unique and show a message of error.

12/03/2023
- We have include environment variables management for test
- We have improved the mechanism to wait for the service fixture
- First feature has finished: An user can add an item to the list
- Next steps are:    
  - Validation of the name. It should be unique and show a message of error.
  - Working on the new acceptance test: An item has a name with more than 0 characters
  - Writing the readme and conclusions after the first feature.
- Parking lot:
  - ViewModel pattern.
  - Login


13/03/2023
- We have started the Validation of the name. It should be unique and show a message of error.
  - Acceptance test failing for the right error and first unit test failing
- Next steps are:        
  - Writing the readme and conclusions after the first feature.
- Parking lot:
  - ViewModel pattern.
  - Login

14/03/2023

- We have the validation of the name, but we need:
  - include more cases for the unit testing
  - to think about the format of the label,maybe an style
- Next steps are:        
  - Finish this feature and push to master
  - Writing the readme and conclusions after the first feature.
  - to get a new feature
  - Styles
- Parking lot:
  - ViewModel pattern.
  - Login

15/03/2023
- Improvement of styles
- finished the validation tests
-Next steps are:         
  - to get a new feature: The user can remove a selected item + delete all items
  - Writing the readme and conclusions after the first feature.  
  - Common styles for all the application
- Parking lot:
  - ViewModel pattern.
  - Login

19/03/2023
  - Implementation of delete all - Unit test and acceptance tests
  - Question dialog (without tests) + some styles
-Next steps are:         
  - Review and refactor of the test and code.
  - to get a new feature: The user can remove a selected item
  - Writing the readme and conclusions after the first feature.  + remember to include:
    - flush
  - Common styles for all the application
- Parking lot:
  - ViewModel pattern.
  - Login

BUGS:
- CI = The first time I execute acceptance tests they fail.
- UI = the HTML elements change their size. To improve for better experience
- UI = About page is not working


20/03/2023
- Implementation of delete one element
- Implementation of update one element: quantity + and -
-Next steps are:         
  - edition of the name: several problems. We need to solve it.
  - Implementation of update one element: name (the last basic feature and we have created the updated form). After this, we need to refactor and review all the problems.
  - Review and refactor of the test and code.
  - Review every flaky tests: we have a lot.
  - to get a new feature: The user can decrease and increment a selected item
  - Writing the readme and conclusions after the first feature.  + remember to include:
    - flush
  - Common styles for all the application
- Parking lot:
  - ViewModel pattern.
  - Login

BUGS/PROBLEMS:
- Strange configuration of the test in tsconfig. Something is wrong. Why we need to include  "tests/component/ShoppingList.vue" ? If i remove it
  tests are not working. Review it. In addition, I cannot, create other test in the same folder. It must be a problem of configuration.
- CI = The first time I execute acceptance tests they fail.
    - We have several flaky tests. We should review them (too much flaky tests)
- UI = the HTML elements change their size. To improve for better experience
- UI = About page is not working

21/03/2023
- edition of the name: several problems. Solved. 
-Next steps are:         
  - Remove ChangeParametersItem.vue, it is not being used.
  - Review and refactor of the test and code.
  - Review every flaky tests: we have a some of them.  
  - Writing the readme and conclusions after the first feature.  + remember to include:
    - flush
  - Common styles for all the application
- Parking lot:
  - ViewModel pattern.
  - Login

BUGS/PROBLEMS:
- Strange configuration of the test in tsconfig. Something is wrong. Why we need to include  "tests/component/ShoppingList.vue" ? If i remove it
  tests are not working. Review it. In addition, I cannot, create other test in the same folder. It must be a problem of configuration.
- CI = The first time I execute acceptance tests they fail.
    - We have several flaky tests. We should review them (too much flaky tests)
- UI = the HTML elements change their size. To improve for better experience
- UI = About page is not working

22/03/2023

- include the validation of the name in the edition
- Remove ChangeParametersItem.vue
- UI = About page is not working => now it is working
- Some general refators
- UI = the HTML elements change their size. To improve for better experience
-Next steps are:          
  - Review every flaky tests: we have a some of them.  
  - Review and refactor of the test and code.  
  - Writing the readme and conclusions after the first feature.  + remember to include:
    - flush  
- Parking lot:
  - ViewModel pattern.
  - Login
  - Common styles for all the application
  - Use the controls vuetify

BUGS/PROBLEMS:
  - Style for errors. Review it. In the edit, it doesn't adapt to the size of the window.

23/03/2023
  - Review every flaky tests: we have a some of them.  Solved.

-Next steps are:          
  - Review and refactor of the test and code.  
  - Writing the readme and conclusions after the first feature.  + remember to include:
    - flush  
- Parking lot:
  - ViewModel pattern.
  - Login
  - Common styles for all the application
  - Use the controls vuetify

BUGS/PROBLEMS:
  - Style for errors. Review it. In the edit, it doesn't adapt to the size of the window.

25/03/2023
- CI with github actions
- Review and refactor of the test and code.  
- script to run the fixtureServiceMemoryStorage
- change in the name of the test folder: __tests__
- refactoring of acceptance tests
- refactoring of component tests
- Factory for the fixture
- Factory for the AppService
- Load several configurations for acceptance tests

-Next steps are:      
  - flacky tests again after refactoring. I removed some unnecesary asserts
  - Validation in edit form doesn't work the style
  - Fix fields for the Table. The fields are adapted to the text and it is strange
  - Writing the readme and conclusions after the first feature.  + remember to include:
    - flush  
  - Increase the coverage for some classes. (Utilities and fixtures).
- Parking lot:
  - resources for text in front (multilanguage)
  - ViewModel pattern.
  - Login
  - Common styles for all the application
  - Use the controls vuetify
  - features toggle with configcat
  - BDD for acceptance tests


26/03/2023
- Sonarqube configuration in Github actions
- Validation in edit form doesn't work the style
- i18n = for internalization
- Fix fields for the Table. The fields are adapted to the text and it is strange
- description of the kata in the about
  
-Next steps are:          

  -[First Pilot] Writing the readme and conclusions after the first feature.  + remember to include:
    - flush   
  -[First Pilot] Review - Feedback session
- Some requirements we haven't implemented yet:
  - Maximum number of rows (pagination) - we don't haver persistency -> mvp 2
  - Login and a list for each user - users don't need to login now -> mvp 2

- Backlog:
  - [MVP 1.0] Implementation of AppService with the own storage. A way to deploy and use the App. And also, we can study the storage.
  - [MVP 1.0] Deployment in Azure.
  - [MVP 1.0] ViewModel pattern.
  - [MVP 1.0] Login
  - [MVP 1.0] BDD for acceptance tests
  - [Tech debt] Increase the coverage for some classes. (Utilities and fixtures).
  - [Tech debt] flacky tests again after refactoring. I removed some unnecesary asserts. Review it.  
  - [Tech debt] sometimes the fixture for acceptance tests don't finish correctly and we need to terminate the process    
  - [Tech debt] Common styles for all the application
  - [MVP 2.0] Maximum number of rows (pagination)
  - [MVP 2.0] Use the controls vuetify - Include real backend in spring boot
  - [MVP 2.0]features toggle with configcat - Include real backend in spring boot
  
28/03/2023

- README => We have decided create an evolutive kata exercise and describe the specific decisions for this part. First Draft
  
-Next steps are:          
  - [Chore] - Cloud basic deployment and dockerization
  - README => Cloud deployment
  - README => Format of the review  
  - README => Review and fix errors in the document.
  -[First Pilot] Review - Feedback session
- Some requirements we haven't implemented yet:
  - Maximum number of rows (pagination) - we don't haver persistency -> mvp 2
  - Login and a list for each user - users don't need to login now -> mvp 2

- Backlog:
  - [MVP 1.0] Implementation of AppService with the own storage. A way to deploy and use the App. And also, we can study the storage. Vuex
  - [MVP 1.0] Deployment in Azure.
  - [MVP 1.0] ViewModel pattern.
  - [MVP 1.0] Login
  - [MVP 1.0] BDD for acceptance tests
  - [Tech debt] Increase the coverage for some classes. (Utilities and fixtures).
  - [Tech debt] flacky tests again after refactoring. I removed some unnecesary asserts. Review it.  
  - [Tech debt] sometimes the fixture for acceptance tests don't finish correctly and we need to terminate the process    
  - [Tech debt] Common styles for all the application
  - [MVP 2.0] Maximum number of rows (pagination)
  - [MVP 2.0] Use the controls vuetify - Include real backend in spring boot
  - [MVP 2.0]features toggle with configcat - Include real backend in spring boot
  - [MVP 2.0] Nuxt? We can apply this framework?


16/04/2023
- [Chore] - Cloud basic deployment and dockerization
  - The pipeline push a dockerfile which works in local
    - We load in the same docker container the server in memory and the vue app. It is working.
  - Trying to use azure to deploy the docker file in azure (manually) with a web app- it wasn't sucessfull
    - The configuration is simple but for some reason, the web app doesn't pull the docker image correctly  
-Next steps are:           
  - README => Cloud deployment
  - README => Format of the review  
  - README => Review and fix errors in the document.
  -[First Pilot] Review - Feedback session
- Some requirements we haven't implemented yet:
  - Maximum number of rows (pagination) - we don't haver persistency -> mvp 2
  - Login and a list for each user - users don't need to login now -> mvp 2

- Backlog:
  - [MVP 1.0] Implementation of AppService with the own storage. A way to deploy and use the App. And also, we can study the storage. Vuex
  - [MVP 1.0] Deployment in Azure.
  - [MVP 1.0] ViewModel pattern.
  - [MVP 1.0] Login
  - [MVP 1.0] BDD for acceptance tests
  - [Tech debt] Increase the coverage for some classes. (Utilities and fixtures).
  - [Tech debt] flacky tests again after refactoring. I removed some unnecesary asserts. Review it.  
  - [Tech debt] sometimes the fixture for acceptance tests don't finish correctly and we need to terminate the process    
  - [Tech debt] Common styles for all the application
  - [MVP 2.0] Maximum number of rows (pagination)
  - [MVP 2.0] Use the controls vuetify - Include real backend in spring boot
  - [MVP 2.0]features toggle with configcat - Include real backend in spring boot
  - [MVP 2.0] Nuxt? We can apply this framework?

23/04/2023
- [Chore] - Cloud basic deployment and dockerization
    - The pipeline push a dockerfile which works in local
    - We load in the same docker container the server in memory and the vue app. It is working.
    - We can deploy in docker hub with github actions 
    - We can deploy in register provider in Azure
    - We can deploy in a web app with docker. We haver the web service created and start/stop the service in each deployment
    - We have a delay since the deploy is working, surely we can use a blue green deployment
    - the configuration of the web app should use the memory to store the data in this first version (by configuration)
-Next steps are:           
  - README => Cloud deployment
  - README => Format of the review  
  - README => Review and fix errors in the document.
  -[First Pilot] Review - Feedback session
- Some requirements we haven't implemented yet:
  - Maximum number of rows (pagination) - we don't haver persistency -> mvp 2
  - Login and a list for each user - users don't need to login now -> mvp 2

- Backlog:
  - [MVP 1.0] Implementation of AppService with the own storage. A way to deploy and use the App. And also, we can study the storage. Vuex
  - [MVP 1.0] Deployment in Azure.
  - [MVP 1.0] ViewModel pattern.
  - [MVP 1.0] Login
  - [MVP 1.0] BDD for acceptance tests
  - [Tech debt] Increase the coverage for some classes. (Utilities and fixtures).
  - [Tech debt] flacky tests again after refactoring. I removed some unnecesary asserts. Review it.  
  - [Tech debt] sometimes the fixture for acceptance tests don't finish correctly and we need to terminate the process    
  - [Tech debt] Common styles for all the application
  - [MVP 2.0] Maximum number of rows (pagination)
  - [MVP 2.0] Use the controls vuetify - Include real backend in spring boot
  - [MVP 2.0]features toggle with configcat - Include real backend in spring boot
  - [MVP 2.0] Nuxt? We can apply this framework?


25/04/2023
- chore: The service, by configuration, doesn't use backend. In this way, we can deploy only the front.
- Some information about the configuration is included in the .env
  
-Next steps are:           
  - README => Cloud deployment
  - README => Format of the review  
  - README => Review and fix errors in the document.
  -[First Pilot] Review - Feedback session
- Some requirements we haven't implemented yet:
  - Maximum number of rows (pagination) - we don't haver persistency -> mvp 2
  - Login and a list for each user - users don't need to login now -> mvp 2

- Backlog:
  - [MVP 1.0] Implementation of AppService with the own storage. A way to deploy and use the App. And also, we can study the storage. Vuex
  - [MVP 1.0] Deployment in Azure.
  - [MVP 1.0] ViewModel pattern.
  - [MVP 1.0] Login
  - [MVP 1.0] BDD for acceptance tests
  - [Tech debt] Increase the coverage for some classes. (Utilities and fixtures).
  - [Tech debt] flacky tests again after refactoring. I removed some unnecesary asserts. Review it.  
  - [Tech debt] sometimes the fixture for acceptance tests don't finish correctly and we need to terminate the process    
  - [Tech debt] Common styles for all the application
  - [MVP 2.0] Maximum number of rows (pagination)
  - [MVP 2.0] Use the controls vuetify - Include real backend in spring boot
  - [MVP 2.0]features toggle with configcat - Include real backend in spring boot
  - [MVP 2.0] Nuxt? We can apply this framework?


01/05/2023
- [MVP 1.0] Deployment in Azure.
- Changing the deployment in azure in a webapp: not stop and start, just deploy
- README => Cloud deployment (working on) - working on it

-Next steps are:           
  - Solve problems and smells detected by sonarcloud + coverage configuration
  - README => Format of the review  
  - README => Review and fix errors in the document.
  -[First Pilot] Review - Feedback session
- Some requirements we haven't implemented yet:
  - Maximum number of rows (pagination) - we don't haver persistency -> mvp 2
  - Login and a list for each user - users don't need to login now -> mvp 2

- Backlog:
  - [MVP 1.0] Implementation of AppService with the own storage. A way to deploy and use the App. And also, we can study the storage. Vuex  
  - [MVP 1.0] ViewModel pattern.
  - [MVP 1.0] Login
  - [MVP 1.0] BDD for acceptance tests
  - [Tech debt] Increase the coverage for some classes. (Utilities and fixtures).
  - [Tech debt] flacky tests again after refactoring. I removed some unnecesary asserts. Review it.  
  - [Tech debt] sometimes the fixture for acceptance tests don't finish correctly and we need to terminate the process    
  - [Tech debt] Common styles for all the application
  - [MVP 2.0] Maximum number of rows (pagination)
  - [MVP 2.0] Use the controls vuetify - Include real backend in spring boot
  - [MVP 2.0]features toggle with configcat - Include real backend in spring boot
  - [MVP 2.0] Nuxt? We can apply this framework?

02/05/2023
- [MVP 1.0] Deployment in Azure - adding a VM with two ports 8080 and 4000, to test everything.
  - Solve problems and smells detected by sonarcloud + coverage configuration
  - README => Format of the review  
-Next steps are:           
  - README => Review and fix errors in the document.
  -[First Pilot] Review - Feedback session
- Some requirements we haven't implemented yet:
  - Maximum number of rows (pagination) - we don't haver persistency -> mvp 2
  - Login and a list for each user - users don't need to login now -> mvp 2

- Backlog:
  - [MVP 1.0] Implementation of AppService with the own storage. A way to deploy and use the App. And also, we can study the storage. Vuex  
  - [MVP 1.0] ViewModel pattern.
  - [MVP 1.0] Login
  - [MVP 1.0] BDD for acceptance tests
  - [Tech debt] Increase the coverage for some classes. (Utilities and fixtures).
  - [Tech debt] flacky tests again after refactoring. I removed some unnecesary asserts. Review it.  
  - [Tech debt] sometimes the fixture for acceptance tests don't finish correctly and we need to terminate the process    
  - [Tech debt] Common styles for all the application
  - [MVP 2.0] Maximum number of rows (pagination)
  - [MVP 2.0] Use the controls vuetify - Include real backend in spring boot
  - [MVP 2.0]features toggle with configcat - Include real backend in spring boot
  - [MVP 2.0] Nuxt? We can apply this framework?