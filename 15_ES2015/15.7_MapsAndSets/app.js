/*
Quick Question #1
What does the following code return?

new Set([1,1,2,2,3,4]) // [1,2,3,4]
*/

/*
Quick Question #2
What does the following code return?

[...new Set("referee")].join("") // "ref"
*/

/*
Quick Questions #3
What does the Map m look like after running the following code?

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);  //{ [1,2,3]: true, [1,2,3]: false] }
*/

///////////////////////////////////////////////////////////
/*
hasDuplicate
Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate

hasDuplicate([1,3,2,1]) // true
hasDuplicate([1,5,-1,4]) // false
*/

const hasDuplicate = arr => ([...new Set(arr)].length === arr.length ? false : true);

///////////////////////////////////////////////////////////
/*
vowelCount
Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
vowelCount('Colt') // Map { 'o' => 1 }
*/

/*
const vowelCount = str => {
    const strArr = [...str.toLowerCase()]
    const myObj = {};
    return strArr.reduce((curr,val)=>{
            if (val === "a" || val === "e" || val === "i" || val === "o" || val === "u"){
                if (curr[val] !== undefined) { curr[val]++;}
                else { curr[val] = 1; }
            }
            return curr
        }, myObj)
}
*/

const vowelCount = str => {
    const strArr = [...str.toLowerCase()]
    const myMap = new Map();
    return strArr.reduce((curr,val)=> {
            if ("aeiou".includes(val)) {
                if (curr.has(val) === true) {curr.set(val, curr.get(val)+1);}
                else { curr.set(val,1); }
            }
            return curr;
        }, myMap)
}

