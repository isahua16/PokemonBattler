function user_attack(event)
{
    let user_health_display = document.querySelector(`#user_health_display`);
    let computer_health_display = document.querySelector(`#computer_health_display`);

    computer_health = computer_health - Number(event[`target`].getAttribute(`attack_power`));
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
        Cookies.set(`computer_health`, computer_health);   
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
        Cookies.set(`user_health`, user_health);
    }    
}

function random_integer_between(min, max)
{
    return Math.floor(Math.random() * (max-min) + min);
}

function reset_game(event)
{
    Cookies.remove(`computer_health`);
    Cookies.remove(`user_health`);
    Cookies.remove(`selected_pokemon`);
}

let computer_pokemon = {
    name: `Pikachu`,
    health_points: 50,
    primary_attack: `Thunder Shock`,
    primary_attack_power: 5,
    image_url: `/images/pikachu.png`
}

//Initialize Computer Pokemon Health
let computer_health_json = Cookies.get(`computer_health`);
let computer_health = computer_pokemon[`health_points`];
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
    <button attack_power="${selected_pokemon[`primary_attack_power`]}" class="attack_button">${selected_pokemon[`primary_attack`]}:${selected_pokemon[`primary_attack_power`]}</button>
    <button attack_power="${selected_pokemon[`secondary_attack_power`]}" class="attack_button"> ${selected_pokemon[`secondary_attack`]}:${selected_pokemon[`secondary_attack_power`]}</button>
    <button attack_power="${selected_pokemon[`tertiary_attack_power`]}" class="attack_button">${selected_pokemon[`tertiary_attack`]}:${selected_pokemon[`tertiary_attack_power`]}</button>`);

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




