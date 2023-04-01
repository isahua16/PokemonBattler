function user_attack(event)
{
    // Get both the computer's and the user's health displays from the page so that we can update them later
    let user_health_display = document.querySelector(`#user_health_display`);
    let computer_health_display = document.querySelector(`#computer_health_display`);
    
    //Check to see if the user can cast the ability they clicked on. 
    if((user_mana - Number(event[`target`].getAttribute(`attack_mana`))) >= 0)
    {
        
        //This HTML insertion is to reset the message to the original if this happens to not be the first attack.
        title[`innerHTML`] = `Fight your Opponent!`;
        
        //If the user has enough mana, update the mana based on the cost of that ability which comes from the button attribute.
        user_mana = user_mana - Number(event[`target`].getAttribute(`attack_mana`));
        //And deal the damage to the computer's health.
        computer_health = computer_health - Number(event[`target`].getAttribute(`attack_power`));
    }
    else
    {
        //if the player does not have enough mana, give them a message and leave the function.
        title[`innerHTML`] = `You cannot cast this attack during this battle anymore`;
        return;
        //This returns undefined, but we don't store that value because we don't need it.
    }

    //After you dealt damage to the computer, we need to check for a win state.
    if (computer_health <= 0)
    {
        //If the computer's health is 0 or lower, set the computer's health to 0 and display it on the page
        computer_health = 0;
        computer_health_display[`innerHTML`] = `${computer_health} HP`;
        //Display a win message to the user.
        title[`innerHTML`] = `You have won the battle!`;
        // Loop over the attack button array to remove them from the page.
        for(let i = 0; i < attack_button.length; i++)
        {
            attack_button[i].remove();
        }
        
        //Leave the function at this point so that the computer does not have a chance to attack next. The game is over.
        return;
    }
    else
    {
        //If the computer has more than 0 health, display the the health on the page and store that new value in a cookie.
        computer_health_display[`innerHTML`] = `${computer_health} HP`;
        Cookies.set(`computer_health`, JSON.stringify(computer_health));   
    }
    
    //The compute attacks the user's health. The attack power will be a number between 5 and 30.
    user_health = user_health - random_integer_between(5, 30);
    //Check for a loss state        
    if(user_health <= 0)
    {
        //If the user's health is 0 or below, set the user's health to 0 and display that value.
        user_health = 0;
        user_health_display[`innerHTML`] = `${user_health} HP`;
        //Give the player a defeat message
        title[`innerHTML`] = `You have lost the battle!`

        for(let i = 0; i < attack_button.length; i++)
        {
            attack_button[i].remove();
        }
        return;
    }
    else
    {
        user_health_display[`innerHTML`] = `${user_health} HP`;
        Cookies.set(`user_health`, JSON.stringify(user_health));
    }    
}

function random_integer_between(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function reset_game(event)
{
    Cookies.remove(`computer_health`);
    Cookies.remove(`user_health`);
    Cookies.remove(`selected_pokemon`);
    Cookies.remove(`computer_pokemon`);
}

//Get the computer selection cookie.
let computer_pokemon_json = Cookies.get(`computer_pokemon`);
let computer_pokemon;
if (computer_pokemon_json !== undefined)
{
    //If that cookie contains something, assign it to a variable
    computer_pokemon = JSON.parse(computer_pokemon_json);
}
else
{
    //Otherwise, select a computer pokemon from the selection list. The random_integer_between function will choose a number between 0 and the legnth of the pokemon roster - 1 (to account for the 0 base array)
    computer_pokemon = pokemon_roster[random_integer_between(0, pokemon_roster.length - 1)];
    //Save that selection in a cookie
    Cookies.set(`computer_pokemon`, JSON.stringify(computer_pokemon));
}


//Get the computer health cookie.
let computer_health_json = Cookies.get(`computer_health`);
// Set the computer health to the computer's pokemon set health points.
let computer_health = computer_pokemon[`health_points`];
// If the computer health cookie has a value other than undefined, set computer health to that value.
if(computer_health_json !== undefined)
{
    computer_health = JSON.parse(computer_health_json);
}

//Get the HTML element that will display the computer_pokemon's information.
let computer_pokemon_display = document.querySelector(`#computer_pokemon`);

//Insert the computer_pokemon's information on the page.
computer_pokemon_display.insertAdjacentHTML(`afterbegin`, 
`<img src="${computer_pokemon[`image_url`]}" alt="Image of ${computer_pokemon[`name`]}">
<h2>${computer_pokemon[`name`]}</h2>
<h3 id="computer_health_display">${computer_health} HP</h3>`);


//Get the user_health cookie.
let user_health_json = Cookies.get(`user_health`);
//Create an empty user_health variable that will get a value below.
let user_health;
//Initialize a mana amount for the user that will control the amount of times they can cast certain abilities.
let user_mana = 20;
//Get the selected pokemon cookie
let selected_pokemon_json = Cookies.get(`selected_pokemon`);
//Create an empty variable that will hold the pokemon object below
let selected_pokemon;
//Get the title HTML element to give messages to the player
let title = document.querySelector(`#title`);
//Get the HTML element that will display the user's pokemon information and abilities
let user_pokemon = document.querySelector(`#user_pokemon`);
if(selected_pokemon_json === undefined)
{
    //If the selected_pokemon cookie is empty, tell the player that they have not selection a pokemon.
    title[`innerHTML`] = `You have not selected a Pokémon!`;
}
else
{
    //otherwise, assign the cookie's value to the selected_pokemons variable declared above.
    selected_pokemon = JSON.parse(selected_pokemon_json);
    //Insert the pokemon's information onto the page.
    user_pokemon.insertAdjacentHTML(`afterbegin`,
    `<img src="${selected_pokemon[`image_url`]}" alt="Image of ${selected_pokemon[`name`]}">
    <h2>${selected_pokemon[`name`]}</h2>
    <h3 id="user_health_display">${Number(selected_pokemon[`health_points`])}</h3>
    <button attack_mana="0" attack_power="${selected_pokemon[`primary_attack_power`]}" class="attack_button">${selected_pokemon[`primary_attack`]}:${selected_pokemon[`primary_attack_power`]}</button>
    <button attack_mana="5" attack_power="${selected_pokemon[`secondary_attack_power`]}" class="attack_button"> ${selected_pokemon[`secondary_attack`]}:${selected_pokemon[`secondary_attack_power`]}</button>
    <button attack_mana="10" attack_power="${selected_pokemon[`tertiary_attack_power`]}" class="attack_button">${selected_pokemon[`tertiary_attack`]}:${selected_pokemon[`tertiary_attack_power`]}</button>`);

    //We assign the user's health here based on the following logic:
    if(user_health_json !== undefined)
    {
        //if the user health cookie has a value, assign this value to the user_health variable, and display that value on the page in the right spot.
        user_health = JSON.parse(user_health_json);
        user_health_display[`innerHTML`] = `${user_health} HP`;
    }
    else
    {
        //Otherwise, assign its full health to the user_health variable.
        user_health = `${Number(selected_pokemon[`health_points`])}`;
    }
}

//For each button attack button, add an event listener.
let attack_button = document.querySelectorAll(`.attack_button`);
for(let i = 0; i < attack_button.length; i++)
{
    attack_button[i].addEventListener(`click`, user_attack);
}
//Add an event listener to the leave game button.
let flee_button = document.querySelector(`#flee_button`);
flee_button.addEventListener(`click`, reset_game);




