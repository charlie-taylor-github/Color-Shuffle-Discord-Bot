const config = require('./config');

class TimeoutMap {
  #map;

  constructor() {
    this.#map = new Map();
  }

  get(guild, member) {
    const key = `${guild.id}-${member.id}`;
    return this.#map.get(key);
  }

  set(guild, member, timeoutId) {
    const key = `${guild.id}-${member.id}`;
    this.#map.set(key, timeoutId);
  }

  remove(guild, member) {
    const key = `${guild.id}-${member.id}`;
    this.#map.delete(key);
  }
}

timeouts = new TimeoutMap();

const getColorRoles = async (guild) => {
  const roleDetails = config.roles;
  const roles = await Promise.all(roleDetails.map(async ({ name, color }) => {
    const role = guild.roles.cache.find(r => r.name === name);
    if (role) return role;
    return guild.roles.create({ name, color });
  }));

  return roles;
}

const start = async (guild, member) => {
  const colorRoles = await getColorRoles(guild);

  const shuffle = async (i, initial = false) => {
    try {
      const role = colorRoles[i];
      await member.roles.add(role);
      const rolesToRemove = colorRoles.filter((_, ii) => ii !== i);
      await Promise.all(rolesToRemove.map(r => member.roles.remove(r)));
      if (!timeouts.get(guild, member) && !initial) return;
      const timeoutId = setTimeout(
        () => shuffle((i + 1) % colorRoles.length),
        config.shuffleInterval
      );
      timeouts.set(guild, member, timeoutId);

    } catch (e) {
      console.error(e);
    }
  }

  shuffle(0, true);
}

const stop = async (guild, member) => {
  clearTimeout(timeouts.get(guild, member));
  timeouts.remove(guild, member);
  const colorRoles = await getColorRoles(guild);
  await Promise.all(colorRoles.map(r => member.roles.remove(r)));
}


module.exports = { start, stop };
