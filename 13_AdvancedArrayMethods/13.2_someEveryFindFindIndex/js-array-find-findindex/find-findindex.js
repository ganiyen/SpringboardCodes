/* 
Write a function called `findUserByUsername` which accepts an array of objects, each with a key of username, and a string. The function should return the first object with the key of username that matches the string passed to the function. If the object is not found, return undefined. 

const users = [
  {username: 'mlewis'},
  {username: 'akagen'},
  {username: 'msmith'}
];

findUserByUsername(users, 'mlewis') // {username: 'mlewis'}
findUserByUsername(users, 'taco') // undefined
*/


function findUserByUsername(usersArray, username) {
  const output = usersArray.find(function(val){
    if (val.username === username){return true}
  })
  return output
}

/*
Write a function called `removeUser` which accepts an array of objects, each with a key of username, and a string. The function should remove the object from the array. If the object is not found, return undefined. 

const users = [
  {username: 'mlewis'},
  {username: 'akagen'},
  {username: 'msmith'}
];

removeUser(users, 'akagen') // {username: 'akagen'}
removeUser(users, 'akagen') // undefined
*/

function removeUser(usersArray, username) {
  const userToRemove = usersArray.find(function(val,index,arr){
    if (val.username === username) {return true}
  });

  const removeIndex = usersArray.findIndex(function(val,index,arr){
    if (val.username === username) {return true}
  });
  
  if (removeIndex !== -1) {usersArray.splice(removeIndex,1);}
  
  return userToRemove;
}