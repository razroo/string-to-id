# String To Id Open Source Repo

Some open source vector libraries like qdrant, are limited in the sense that an ID must be an (unsigned) integer or UUID. 

This makes it very difficult to upsert to the respective vector, without first filtering for it. This method converts words deterministically via letters to numbers, so that can upsert deterministically in a setting where ID can be numbers only.

## Example
```
@import {stringToId} from '@razroo/string-to-id';
const orgId = 'abc; // a === 1, b === 2, c === 3
const workspaceId = 'xyz' // x === 24, y === 25, z === 26
const itemNumber = 123; // does not change as a number already

const resultId = stringToId([orgId, workspaceId, itemNumber]);
// space between letters is 0
// space between words is 00
// result = 10203002402502600123
// So now you would be able to do something like 
client.upsert('org-data', {
      points: [{
        id: resultId,
//...
```
## How to install
```
npm install @razroo/string-to-id --save;
```

