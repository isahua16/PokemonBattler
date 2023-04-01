function user_attack(event)
{
    let user_health_display = document.querySelector(`#user_health_display`);
    let computer_health_display = document.querySelector(`#computer_health_display`);
    if((user_mana - Number(event[`target`].getAttribute(`attack_mana`))) >= 0)
    {
        title[`innerHTML`] = `Fight your Opponent!`;
        user_mana = user_mana - Number(event[`target`].getAttribute(`attack_mana`));
        computer_health = computer_health - Number(event[`target`].getAttribute(`attack_power`));
    }
    else
    {
        title[`innerHTML`] = `You cannot cast this attack during this battle anymore`;
        return;
    }

    if (computer_health <= 0)
    {
        computer_health = 0;
        computer_health_display[`innerHTML`] = `${computer_health} HP`;
        title[`innerHTML`] = `You have won the battle!`;
        for(let i = 0; i < attack_button.length; i++)
        {
            attack_button[i].remove();
        }
        return;
    }
    else
    {
        computer_health_display[`innerHTML`] = `${computer_health} HP`;
        Cookies.set(`computer_health`, JSON.stringify(computer_health));   
    }
    
    user_health = user_health - random_integer_between(5, 30);        
    if(user_health <= 0)
    {
        user_health = 0;
        user_health_display[`innerHTML`] = `${user_health} HP`;
        title[`innerHTML`] = `You have lost the battle!`
        Cookies.remove(`computer_health`);
        Cookies.remove(`user_health`);
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

//Select a computer pokemon from the selection list. The random_integer_between function will choose a number between 0 and the legnth of the pokemon roster - 1 (to account for the 0 base array).

let computer_pokemon_json = Cookies.get(`computer_pokemon`);
let computer_pokemon;
if (computer_pokemon_json !== undefined)
{
    computer_pokemon = JSON.parse(computer_pokemon_json);
}
else
{
    computer_pokemon = pokemon_roster[random_integer_between(0, pokemon_roster.length - 1)];
    Cookies.set(`computer_pokemon`, JSON.stringify(computer_pokemon));
}


//Initialize Computer Pokemon Health. First, get the computer health cookie.
let computer_health_json = Cookies.get(`computer_health`);
// Set the computer health to the computer's pokemon set health points.
let computer_health = computer_pokemon[`health_points`];
// If the computer health cookie has a value other than undefined, set computer health to that value. This behaviour will recover the last game that was not finished.
if(computer_health_json !== undefined)
{
    computer_health = JSON.parse(computer_health_json);
}

let computer_pokemon_display = document.querySelector(`#computer_pokemon`);

computer_pokemon_display.insertAdjacentHTML(`afterbegin`, 
`<img src="${computer_pokemon[`image_url`]}" alt="Image of ${computer_pokemon[`name`]}">
<h2>${computer_pokemon[`name`]}</h2>
<h3 id="computer_health_display">${computer_health} HP</h3>`);


//Initialize User
let user_health_json = Cookies.get(`user_health`);
let user_health;
let user_mana = 20;
let selected_pokemon_json = Cookies.get(`selected_pokemon`);
let selected_pokemon;

let title = document.querySelector(`#title`);
let user_pokemon = document.querySelector(`#user_pokemon`);
if(selected_pokemon_json === undefined)
{
    title[`innerHTML`] = `You have not selected a Pokémon!`;
}
else
{

    selected_pokemon = JSON.parse(selected_pokemon_json);
    user_pokemon.insertAdjacentHTML(`afterbegin`,
    `<img src="${selected_pokemon[`image_url`]}" alt="Image of ${selected_pokemon[`name`]}">
    <h2>${selected_pokemon[`name`]}</h2>
    <h3 id="user_health_display"></h3>
    <button attack_mana="0" attack_power="${selected_pokemon[`primary_attack_power`]}" class="attack_button">${selected_pokemon[`primary_attack`]}:${selected_pokemon[`primary_attack_power`]}</button>
    <button attack_mana="5" attack_power="${selected_pokemon[`secondary_attack_power`]}" class="attack_button"> ${selected_pokemon[`secondary_attack`]}:${selected_pokemon[`secondary_attack_power`]}</button>
    <button attack_mana="10" attack_power="${selected_pokemon[`tertiary_attack_power`]}" class="attack_button">${selected_pokemon[`tertiary_attack`]}:${selected_pokemon[`tertiary_attack_power`]}</button>`);

    if(user_health_json !== undefined)
    {
        user_health = JSON.parse(user_health_json);
        user_health_display[`innerHTML`] = `${user_health} HP`;
    }
    else
    {
        user_health = `${Number(selected_pokemon[`health_points`])}`;
        user_health_display[`innerHTML`] = `${user_health} HP`;
    }
}

let attack_button = document.querySelectorAll(`.attack_button`);
for(let i = 0; i < attack_button.length; i++)
{
    attack_button[i].addEventListener(`click`, user_attack);
}

let flee_button = document.querySelector(`#flee_button`);
flee_button.addEventListener(`click`, reset_game);




