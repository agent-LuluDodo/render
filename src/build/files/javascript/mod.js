let mcversion = "1.19.2";
let mcloader = "fabric";

let links = document.getElementsByName("mod");

for (let i = 0; i < links.length; i++) {
    mod(links[i]);
}

async function mod(link) {
    let href = link.href;
    href = href.substring(href.lastIndexOf('/'));
    let id = href.substring(0, href.indexOf(':'));
    let modid = href.substring(href.indexOf(':') + 1);
    console.log("Mod: " + id + " | " + modid);
    switch (id) {
        case 'modrinth':
            modrinth(modid, link);
            break;
        case 'curseforge':
            curseforge(modid, link);
    }
}

async function curseforge(modid, link) {
    link.href = 'https://www.curseforge.com/minecraft/mc-mods/' + modid + '/files/all';
}

async function modrinth(modid, link) {
    let response = await getJson('https://api.modrinth.com/v2/project/' + modid + '/version');
    for (let i = 0; i < Object.keys(response).length; i++) {
        let file = response[i];
        if (contains(file['game_versions'], mcversion) && contains(file['loaders'], mcloader)) {
            link.href = getPrimary(file['files']);
        }
    }
}

async function getJson(url) {
    try {
        let response = await fetch(url);
        console.log(response);
        let json = await response.json()
        if (json === undefined) {
            console.log("undefined");
        } else {
            console.log(json);
        }
        return json;
    } catch (error) {
        console.log(error);
    }
}

function contains(array, value) {
    for (let i = 0; i < Object.keys(array).length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

function getPrimary(array) {
    for (let i = 0; i < Object.keys(array).length; i++) {
        if (array[i]['primary'] === true) {
            return array[i]['url'];
        }
    }
    return "";
}