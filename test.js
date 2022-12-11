const arr = [1,[2,3],4,5];

const myFlatMap = function(cb,d) {
  let a = [];
    for(let i=0; i<this.length; i++) {
      while(Array.isArray(this[i]===false)) {
        
      }
    }
  return a;
}

Array.prototype.myMap = myMap

const res = arr.myFlatMap((ele) => {
  return ele+1;
});

console.log(res);