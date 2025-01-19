const inventoryEl = document.getElementById("inventory");
const requestEl = document.getElementById("request");
const inputEl = document.getElementById("input");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");
const responseEl = document.getElementById("response");
const scoreEl = document.getElementById("score");

let inventory = [];
let inventorySize = 5;
const possibleItems = [
    { name: "Ruby", cost: 500 },
    { name: "Wood", cost: 5 },
    { name: "Iron", cost: 20 },
    { name: "Tomato", cost: 1 },
    { name: "Sapphire", cost: 600 },
    { name: "Golden Spade", cost: 250 },
    { name: "Emerald", cost: 400 },
    { name: "Enchanted Rose", cost: 300 },
    { name: "Moonbeam Bulb", cost: 150 },
    { name: "Starflower Seed", cost: 100 },
    { name: "Potion of Growth", cost: 75 },
    { name: "Mystic Herb", cost: 50 },
    { name: "Silver Shears", cost: 80 },
    { name: "Crystalized Dewdrop", cost: 120 },
    { name: "Obsidian Shard", cost: 200 },
    { name: "Amber Gemstone", cost: 350 },
    { name: "Magical Fertilizer", cost: 40 },
    { name: "Dragonfruit", cost: 60 },
    { name: "Elven Bow", cost: 800 },
    { name: "Phoenix Feather", cost: 1000 },
    { name: "Glowing Mushroom", cost: 45 },
    { name: "Giant Pumpkin", cost: 25 },
    { name: "Silver Ore", cost: 70 },
    { name: "Ancient Relic", cost: 1500 },
    { name: "Copper Nugget", cost: 10 },
    { name: "Mystic Vine", cost: 90 },
    { name: "Sunstone", cost: 550 },
    { name: "Dwarven Pickaxe", cost: 300 },
    { name: "Golden Apple", cost: 500 },
    { name: "Shadow Leaf", cost: 250 },
    { name: "Magic Lantern", cost: 120 },
    { name: "Crystal Berry", cost: 30 },
    { name: "Frozen Pear", cost: 55 },
    { name: "Fairy Dust", cost: 400 },
    { name: "Thunder Stone", cost: 220 },
    { name: "Healing Potion", cost: 150 },
    { name: "Cursed Amulet", cost: 800 },
    { name: "Unicorn Horn", cost: 1200 },
    { name: "Silver Bell", cost: 60 },
    { name: "Enchanted Map", cost: 750 },
    { name: "Mystic Key", cost: 300 },
    { name: "Clover Charm", cost: 40 },
    { name: "Wisp Essence", cost: 200 },
    { name: "Spectral Candle", cost: 180 },
    { name: "Glowstone", cost: 90 },
    { name: "Dragon Scale", cost: 850 },
    { name: "Forest Nectar", cost: 35 },
    { name: "Stardust", cost: 700 },
    { name: "Lavender Bundle", cost: 15 },
    { name: "Glass Orb", cost: 100 }
];


let request = {};

let points = 0;

function randomIndex(arr){
    return Math.floor(Math.random() * arr.length);
}

function randomElement(arr){
    return arr.at(randomIndex(arr));
}

function refreshStock(){
    inventory = Array(inventorySize).fill(0).map(() => randomElement(possibleItems))
}

function refreshRequest(){
    const options = ["item", "min", "lt", "sum"]
    let item;
    switch (randomElement(options)){
        case "item":
            item = randomElement(inventory)
            request = {
                answer: inventory.findIndex(i => i===item)+1,
                text: `Find the first ${item.name}`
            };
            break;
        case "min":
            item = inventory.reduce((acc,cur) => cur.cost < acc.cost ? cur : acc, {cost:1e6})
            request = {
                answer: inventory.findIndex(i => i===item)+1,
                text: `Find the least expensive item you have (If there's a tie, find the first one!)`
            }
            break;
        case "lt":
            const cost = Math.floor(Math.random() * 1000);
            item = inventory.find(item => item.cost <= cost)
            request = {
                answer: inventory.findIndex(i => i===item)+1,
                text: `Find the first item less than ${cost} gold`
            }
            break;
        case "sum":
            item = randomElement(inventory)
            request = {
                answer: inventory.filter(el => el.name == item.name).reduce((acc,cur) => cur.cost + acc, 0),
                text: `How much do all the ${item.name} in your inventory cost?`
            }
            break;
    }
    requestEl.textContent = request.text;
    inputEl.value = ""
}

function updateInventory(){
    inventoryEl.innerHTML = "";
    for(const item of inventory){
        const itemEl = document.createElement("li");
        itemEl.textContent = `${item.name} - ${item.cost} gold`;
        inventoryEl.appendChild(itemEl);
    }
}

function updateScore(){
    scoreEl.textContent = points;
}

function checkItem(){
    if (inputEl.value == request.answer){
        responseEl.textContent = "Good job!";
        points += 1
        submitBtn.hidden = true;
    } else {
        responseEl.textContent = "Oops, that wasn't right!";
    }
    nextBtn.hidden = false;
}

function nextCustomer(){
    nextBtn.hidden = true;
    submitBtn.hidden = false;
    inventorySize += 1;
    refreshStock()
    refreshRequest()
}

refreshStock()
refreshRequest()

setInterval(updateScore, 100);
setInterval(updateInventory, 100);