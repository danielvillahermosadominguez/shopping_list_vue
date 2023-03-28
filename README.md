# Welcome to Shopping list evolutive Kata 

This exercise is a series of katas which let you practice different techniques, practices and technologies in a evolutive way.

Every Study case will sugest you to apply some practices and some generic patterns. You should choose the tools, frameworks, libraries with you
want to cover it. 

We have some recomendations:

1. Something good is doing this kata with other people. Today I think, it is a good idea to do it with a partner by pair programming. Also, you can practice other kind of practices as for example: Event Storming, Example Mapping and other kind of workshops.
2. You can do it alone. It is a good approach.
3. You could try to participate by mob programming. At this moment, I think the option 1 and 2 are the best options to face this Kata. But, you could try do it and give me feedback.
4. The kata could start with a brainstorming with your partner/s (or alone) reading the kata and Study Cases. You will have the oportunity to do a first ideas about the practices, frameworks, libraries you would want to include in each sesión. It is just a brainstorming and you will able to change by the way, but it is very motivating to start.
5. Remember to put a deadline to have a MVP - Minimum valuable Product in each Study case and to share it with other coleages to get feedback and share your learnings.
6. Don't lose the focus on objetives and MVPs. Create a backlog.
7. A logbook is something very useful. I only use a .md file where I write what I got in the last session and the next tasks to implement. 

We have build this kata by doing, so we will explain the result of every session, decisions, technologies, etc, in each sesion. But you could choose others. That depend on you and your needs.

# The Shopping List Kata

we need a web app to manage a list of items. The list of requirements:
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

# Study cases

- [Study Case I : Guidance](./docs/stage-I/guidance.md)
- [Study Case I : The first pilot](./docs/stage-I/firstpilot.md)




