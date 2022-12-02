let mods = document.links;
mods.foreach(setHref);

function setHref(mod) {
    if (mod.host === "modrinth") {
        mod.href = getHref(mod);
    }
}

function getHref(mod) {
    fetch('https://api.modrinth.com/v2/project/' + mod.modid + '/version')
        .then((response) => response.json())
        .then((data) => console.log(data));
    let returnLink = 'https://modrinth.com/mod/' + mod.modid;
    for (let versionid = 0; versionid < response.lenght; versionid++) {
        let version = response[versionid];
        let loaders = version['loaders'];
        let rightLoader = false;
        for (let loaderId = 0; loaderId < loaders.lenght; loaderId++) {
            if (loader[loaderId] == mod.loader) {
                rightLoader = true;
            }
        }
        let rightGameVersion = false;
        for (let gameVersionId = 0; gameVersionId < loaders.lenght; gameVersionId++) {
            if (loader[gameVersionId] == mod.version) {
                rightGameVersion = true;
            }
        }
        if (rightLoader && rightGameVersion && (version['version_type'] !== 'alpha' || mod.alpha === true)) {
            returnLink = version['files']['0']['url'];
        }
    }
    return returnLink;
}