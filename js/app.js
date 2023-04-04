function select_pokemon(event)
{
    //Create a pokemon object and save it as the user selection in a cookie.
    let selected_pokemon = {
        name: event[`target`].getAttribute(`pokemon_name`),
        description: event[`target`].getAttribute(`pokemon_description`),
        health_points: event[`target`].getAttribute(`pokemon_health_points`),
        primary_attack: event[`target`].getAttribute(`primary_attack_name`),
        primary_attack_power: event[`target`].getAttribute(`primary_attack_power`),
        secondary_attack: event[`target`].getAttribute(`secondary_attack_name`),
        secondary_attack_power: event[`target`].getAttribute(`secondary_attack_power`),
        tertiary_attack: event[`target`].getAttribute(`tertiary_attack_name`),
        tertiary_attack_power: event[`target`].getAttribute(`tertiary_attack_power`),
        image_url: event[`target`].getAttribute(`pokemon_image_url`)
    }
    Cookies.set(`selected_pokemon`, JSON.stringify(selected_pokemon));
}

//Add event listeners to the selection buttons.
let select_button = document.querySelectorAll(`.select_button`);
for(let i = 0; i < select_button.length; i++)
{
    select_button[i].addEventListener(`click`, select_pokemon);
}

