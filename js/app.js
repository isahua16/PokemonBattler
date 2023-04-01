function select_pokemon(event)
{
    let selected_pokemon = {
        name: event[`target`].getAttribute(`pokemon_name`),
        description: event[`target`].getAttribute(`pokemon_description`),
        health_points: event[`target`].getAttribute(`pokemon_health_points`),
        primary_attack: event[`target`].getAttribute(`primary_attack_name`),
        primary_attack_power: event[`target`].getAttribute(`primary_attack_power`),
        image_url: event[`target`].getAttribute(`pokemon_image_url`)
    }
    Cookies.set(`selected_pokemon`, JSON.stringify(selected_pokemon));
}

let select_button = document.querySelectorAll(`.select_button`);
for(let i = 0; i < select_button.length; i++)
{
    select_button[i].addEventListener(`click`, select_pokemon);
}
