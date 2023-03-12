# Tasks

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

