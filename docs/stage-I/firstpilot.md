# The first pilot

Your client wants a first version of this application very fast because they are very interested in this app. They want to do a demo and for them the most important is the frontend.

You will need to choose frontend frameworks and libraries to start and build an application to cover the requirements but don't break these rules:

- You will need acceptance tests
- You will need component tests
- You will need unit tests

You cannot create any production code without to start with a test. So, you should have an idea about what strategy for testing and design you want to follow. We recommend to use an outside-in approach and think about how to apply it in this context.

If you haven't done TDD outside-in before, I recomend to practice before to start with this..

# Real example: Decisions for the solution in this repository

## Decisions and motivations 

* **We chose Vue 2.0** and **typescript** because we would want to learn these frameworks and language. The version 2.0 is no the last one and there are several differences with the last version at this moment (3.0). Our motivation for this decisions has been to learn and compare both versions because we want to do a migration in other iteration and we have a client with this topic on the table.
  
* We have chosen **graphql** (https://graphql.org/) to communicate the frontend with the backend by using **apollo client** (https://www.apollographql.com/). For this version, we won't have backend yet, and the idea is to focus on the front to get feedback from the client. The selection of this technology has been driven by the context of a client who have this technology in their legacy code. In this case the advantages to use graphql are:
``` 
|                              PROS                               |
|-----------------------------------------------------------------|
| *Performance. You choose the specific data you getin each moment |
| *strongly typed. Queries are validated against an scheme         |
|-----------------------------------------------------------------|

|                              CONS                               |
|-----------------------------------------------------------------|
| *always return 200 as status code                               |
| * lack of build-in caching support                              |
| * complexity. if you have a simple API= ok, changes data=ko     |
|-----------------------------------------------------------------|
```
https://stablekernel.com/article/advantages-and-disadvantages-of-graphql/

* We have choosen **test library** as a testing framework because we want to learn this framework  https://testing-library.com/. Several motivations for this decision:
  * Our client is using this framework and we want to explore the best practices.
  * We want to write tests that are not focused on implementation details i.e testing how the solution is implemented rather than if it produces the desired output.

  * We want to write tests that focus on the actual DOM nodes and not rendered Vue components.

  * You want to write tests that query the DOM in the same way a user would.
  
https://www.smashingmagazine.com/2020/11/vue-applications-vue-testing-library/

* **Testing: Our strategy**
  * unit: focused on the class behaviours = jest
  * component: focused on the component behaviours without to take into account integrations with other components or pages = testing library + jest
  * Page: For us, our aceptance test. Integration of the components and graphql. For this purpose, we have created a fixture which is a light backend with the data in memory.
  * end to end: we haven't done this kind of tests in this kata. You should use cypress or a similar tool but we think they are not neccesary at this moment.
* **Continuous Delivery**. We use github actions to transpile the application, pass the acceptance, component and unit tests and scan the code quality with sonarqube.
*  ** Deployment **. We have used Azure to deploy and docker. Github actions do it in a job.





  