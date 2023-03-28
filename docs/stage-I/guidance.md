  Choose a repository provider. Some people like gihub other gitlab (maybe Bitbucket?). Choose one, but also think about what technology you want to learn or explore during this kata (Github actions? Gitlab pipelines?). This will be one of your first selections. Imagine you choose github.
  - Create your own github account (https://github.com/)
  - Create your local repository (git init)
  - Push your repository into github 
  - Use your favorite IDEA (IntelijIDEA, Eclipse, Netbeans, etc). 
  - Create the appropiate Application in your Git Local Repository
  - add .gitignore file in the app directory (you can generate it from https://www.gitignore.io/)
  - Commit your code anytime when you are sure with that code, don't forget to add the meaningful message in each commit. Maybe, in some moment you could practice trunk base development and feature toggles? Read about it:https://trunkbaseddevelopment.com/
  - Don't forget to push your code into your Git repository at least once every day. Think, you commits could be very useful to remind your decisions: https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716

  - Package your application into an executable file. Java has `jar` for example. Package it in the best way you find (Docker is allowed)
  - Use TDD to develop the solution. You could use outside-in or inside out.
  - You can use the test cases provided in the review section as acceptance tests.  In addition, you could choose a BDD framework like Cucumber or maybe Fitness.
  - Provide a github actions pipeline that can automate the CI aspect of your app (we'll deal with CD later). In this case, you could think about:
    - Use sonarqube and integrate with your pipeline.
    - Think about how to deploy the application. Maybe you would want to learn a cloud provider like AWS or Azure.
  