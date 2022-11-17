const form  = document.getElementById('weapon-maker');

form.addEventListener('submit', (event) => {
    var name = getValue(form.elements["name"], true, "name");
    
    // Nicht Fertig!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});

function getValue(input, required, name) {
    var value = input.value.trim();
    if (value === undefined && required) {
        document.getElementById("err-" + name).innerHTML = "Please enter a value!";
        input.setClass = "error";
        return "";
    }
    else if (required) {
        document.getElementById("err-" + name).innerHTML = "";
        input.setClass = "success";
        return value;
    }
    else if (value === undefined) {
        input.setClass = "normal";
        return "";
    }
    else {
        input.setClass = "normal";
        return value;
    }
}

function generate(name, item, dmg, spd, cmd, form) {
    document.getElementById("result").innerHTML = "give @p " + item + "{display:{Name:" + genName(name) + ",Lore:" + genLore(dmg, spd) + "},HideFlags:6,Unbreakable:1b," + genCmd(cmd, form) + "AttributeModifiers:[" + genDmg(dmg) + "," + genSpd(spd) + "]} 1";
}

function uuid() {
    return "[I;" + (Math.random()*2**32|0).toString() + "," + (Math.random()*2**32|0).toString() + "," + (Math.random()*2**32|0).toString() + "," + (Math.random()*2**32|0).toString() + "]";
}

function genName(name) {
    if(name.substring(0, 2) === "{\"" || name.substring(0, 3) === "[{\"") {
        return "'" + name + "'";
    }
    else {
        return "'{\"text\":\"" + name + "\",\"italic\":false}'";
    }
}

function genLore(dmg, spd) {
    return "['{\"text\":\" \"}','{\"text\":\"When in Main Hand:\",\"color\":\"gray\",\"italic\":false}','{\"text\":\" " + dmg.toString().replace(",", ".") + " Attack Damage\",\"color\":\"dark_green\",\"italic\":false}','{\"text\":\" " + spd.toString().replace(",", ".") + " Attack Speed\",\"color\":\"dark_green\",\"italic\":false}']";
}

function genCmd(cmd, form) {
    if(cmd !== "") {
        form["cmd"].setClass = "success";
        return "CustomModelData:" + cmd.toString() + ",";
    }
    else {
        return "";
    }
}

function genDmg(dmg) {
    return "{AttributeName:\"generic.attack_damage\",Name:\"generic.attack_damage\",Amount:" + (dmg - 1).toString().replace(",", ".") + ",Operation:0,UUID:" + uuid() + ",Slot:\"mainhand\"}";
}

function genSpd(spd) {
    return "{AttributeName:\"generic.attack_speed\",Name:\"generic.attack_damage\",Amount:" + (spd - 4).toString().replace(",", ".") + ",Operation:0,UUID:" + uuid() + ",Slot:\"mainhand\"}";
}