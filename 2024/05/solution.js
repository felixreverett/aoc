var fs = require("fs"); // imports fs

let rulesInput, updatesInput;

let total = 0;

function Solution()
{
  [rulesInput, updatesInput] = fs.readFileSync("05/input.txt", "utf-8")
    .replace(/\r/gm, "")
    .split("\n\n");

  let rules = rulesInput.split("\n")
    .map(i => i.split("|").map(j => parseInt(j)));
  
  let updates = updatesInput.split("\n")
    .map(i => i.split(",").map(j => parseInt(j)));

  for (let update = 0; update < updates.length; update++)
  {
    let updateIsValid = true;

    for (let i = 1; i < updates[update].length; i++)
    {
      let intToMatch = updates[update][i];

      let ruleMustNotOccurBefore = rules.filter(i => i[0] === intToMatch)
        .map(i => i[1]);

      for (let j = i; j >= 0; j--)
      {
        if (ruleMustNotOccurBefore.includes(updates[update][j]))
        {
          updateIsValid = false;
        }
      }
    }

    if (updateIsValid)
    {
      total += updates[update][Math.floor((updates[update].length / 2))];
    }
  }

  console.log(total);
}

Solution();