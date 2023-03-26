<template>
  <div class="about">
    <h1>{{ $t("about-title") }}</h1>
    <span style="display:block">
      <p ALIGN=LEFT> We need a web app to manage a list of items. The list of requirements: </p>
      <ul>
        <li ALIGN=LEFT>An item has a name must start with A-Z or a-z or a number but no spaces before the first character</li>
        <li ALIGN=LEFT>The user can add an item </li>
        <li ALIGN=LEFT>The user can remove a selected item </li>
        <li ALIGN=LEFT>The user can modify the name of an item </li>
        <li ALIGN=LEFT>The quantity of items of a name, should be shown. </li>
        <li ALIGN=LEFT>The user can delete all the items, but it should be warned about this action </li>
      </ul>      
      <p ALIGN=LEFT>The user interface must allow to the user to do this actions. Some recomendations: </p>
      <ul>
        <li ALIGN=LEFT>A button for each action is a good option for the user, but it should be interested to have a button
        in the own item to remove and update.</li>
        <li ALIGN=LEFT>An input text for the name of the item, is a good option for the user whe he/she is adding a new
        item ordeleting all the items.</li>
        <li ALIGN=LEFT>Not more than 10 items should be presented in the screen at once </li>
        <li ALIGN=LEFT>The name and the quantity in format of row of a table is a good option for the user</li>
        <li ALIGN=LEFT>Message for validations should be shown like little message below the inputs fields. </li>
        <li ALIGN=LEFT>Every user should have their own shopping list and they should see the shopping list of other users </li>
      </ul>   
  </span>
</div></template>