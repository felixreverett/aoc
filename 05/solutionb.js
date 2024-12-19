var fs = require("fs"); // imports fs

let updates, rankingMap;

let total = 0;

function IsUpdateValid(update)
{
  for (let i = 0; i < update.length - 1; i++)
  {
    if (rankingMap[update[i]] < rankingMap[update[i + 1]])
    {
      console.log(`update is invalid because ${update[i + 1]} comes after ${update[i]}`);
      return false;
    }
  }
  return true;
}

function GenerateRankingMap(rules)
{
  let map = new Map();
  for (let rule = 0; rule < rules.length; rule++)
  {
    let [key, value] = rules[rule];
    if (!map.has(key))
    {
      map.set(key, [value]);
    }
    else
    {
      map.get(key).push(value);
    }
  }
  console.log(map); //debug

  let rankingMap = {};
  let rank = 1;

  function rankKey(key)
  {
    if (rankingMap[key] !== undefined) return; // Already ranked
    
    if (map.has(key))
    {
      for (let value of map.get(key))
      {
        rankKey(value);
      }
    }

    rankingMap[key] = rank++;
  }

  for (let [key] of map.entries())
  {
    rankKey(key);
  }

  console.log(rankingMap); //debug
  return rankingMap;
}

function SortUpdate(update)
{
  console.log("Sorting update");
  return update.sort((a, b) => (rankingMap[a] || Infinity) - (rankingMap[b] || Infinity));
}

function Solution()
{
  let [rulesInput, updatesInput] = fs.readFileSync("05/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n\n");

  let rules = rulesInput.split("\n")
    .map(i => i.split("|").map(j => parseInt(j)));
  rankingMap = GenerateRankingMap(rules);
  
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