let selected_pokemon_json = Cookies.get(`selected_pokemon`);
let title = document.querySelector(`#title`);
let user_pokemon = document.querySelector(`#user_pokemon`);

if(selected_pokemon_json === undefined)
{
    title.innerHTML = `You have not selected a Pokémon!`;
}
else
{
    let selected_pokemon = JSON.parse(selected_pokemon_json);
    user_pokemon.insertAdjacentHTML(`afterbegin`,
        `<img src="${selected_pokemon[`image_url`]}" alt="Image of ${selected_pokemon[`name`]}">
        <h2>${selected_pokemon[`name`]}</h2>
        <h3>${selected_pokemon[`health_points`]} HP</h3>
        <button>${selected_pokemon[`primary_attack`]}:${selected_pokemon[`primary_attack_power`]}</button>`  
    )
}