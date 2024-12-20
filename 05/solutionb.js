var fs = require("fs"); // imports fs

let updates, rankingMap;

let total = 0;

function IsUpdateValid(update)
{
  for (let i = 1; i < update.length; i++)
  {
    for (let j = i - 1; j >= 0; j--)
    {
      if (rankingMap.has(update[i]) && rankingMap.get(update[i]).includes(update[j]))
      {
        return false;
      }
    }
  }
  return true;
}

function DefineRankingMap(rules)
{
  let map = new Map();
  for (let rule = 0; rule < rules.length; rule++)
  {
    let [key, value] = rules[rule];
    if (!map.has(key)) map.set(key, [value]);
    else map.get(key).push(value);
  }
  return map;
}

function SortUpdate(update)
{
  for (let i = 1; i < update.length - 1; i++)
  {
    for (let j = 0; j < update.length - i; j++)
    {
      if (rankingMap.has(update[j + 1]) && rankingMap.get(update[j + 1]).includes(update[j]))
      {
        [update[j], update[j + 1]] = [update[j + 1], update[j]];
      }
    }
  }
  return update;
}

function Solution()
{
  let [rulesInput, updatesInput] = fs.readFileSync("05/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n\n");

  let rules = rulesInput.split("\n")
    .map(i => i.split("|").map(j => parseInt(j)));

  rankingMap = DefineRankingMap(rules);
  
  updates = updatesInput.split("\n")
    .map(i => i.split(",").map(j => parseInt(j)));

  for (let update = 0; update < updates.length; update++)
  {
    if(!IsUpdateValid(updates[update]))
    {
      let sortedUpdate = SortUpdate(updates[update]);

      total += sortedUpdate[Math.floor((sortedUpdate.length / 2))];
    }
  }

  console.log(total);
}

Solution();