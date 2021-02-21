// // var isValid = function(s) {
// //     let map = {
// //         '{': '}',
// //         '(': ')',
// //         '[': ']'
// //     }
// //     let stack = []
// //     for(let i = 0; i < s.length ; i++) {
// //         if(map[s[i]]) {
// //             stack.push(s[i])
// //         } else if(s[i] !== map[stack.pop()]){
// //             return false
// //         } else {
// //             console.log(3)
// //         }
// //     }
// //     return stack.length === 0
// // };

// const { type } = require("os")

// // console.log(isValid('[[{}])'))


// // var searchInsert = function(nums, target) {
// //     if(nums.indexOf(target) > -1){
// //         return nums.indexOf(target)
// //     } else if(target > nums[nums.length - 1]) {
// //         return nums.length
// //     } else if(target < nums[0]) {
// //         return 0
// //     }else  {
// //         for(let i=0; i<nums.length;i++){
// //             if(nums[i]<target  && target<nums[i+1]){
// //                 console.log(nums[i])
// //                 console.log(target)
// //                 console.log(nums[i+1])
// //                 return i+1
// //             }
// //         }
// //     }
// // };

// // console.log(searchInsert([1,3,5],4))


// // var romanToInt = function(s) {
// //     let map = {
// //         "I": 1,
// //         "V": 5,
// //         "X": 10,
// //         "L": 50,
// //         "C": 100,
// //         "D": 500,
// //         "M": 1000,
// //     }
// //     let num = 0
// //     for(let i=0; i<s.length;i++){
// //         let item = map[s[i]]
// //         if(i<s.length - 1 && item < map[s[i+1]]) {
// //             num -= item
// //         } else {
// //             num += item
// //         }
// //     }
// //     return num
// // };
// // console.log(romanToInt("MCMXCIV"))


// // var removeElement = function(nums, val) {
// //     let num = nums.indexOf(val) 
// //     if( num > -1 ){
// //         nums.splice(num, 1)
// //         removeElement(nums, val)
// //     }
// //     return nums.length
// // };
// // console.log(removeElement([0,1,3,0,4], 2))

let industry_list = [
    {
    "parent_ind" : "女装",
    "name" : "连衣裙"
    },
    {
    "name": "女装"
    },
    {
    "parent_ind" : "女装",
    "name" : "半身裙"
    },
    {
    "parent_ind" : "女装",
    "name" : "A字裙"
    },
    {
    "name": "数码"
    },
    {
    "parent_ind" : "数码",
    "name": "电脑配件"
    },
    {
    "parent_ind" : "电脑配件",
    "name": "内存"
    },
]

function convert_format(data, pid){
    let temp = {}
    data.forEach((item)=>{
        if(item.parent_ind === pid){
            temp[item.name] = convert_format(data, item.name)
        }
    })
    return temp
}
console.log(convert_format(industry_list))
// function getTreeData(data, parentId) {
//     let tree = [];
//     let temp;
//     data.forEach((item, index) => {
//       if (data[index].pid == parentId) {
//         let obj = data[index];
//         temp = getTreeData(data, data[index].id);
//         if (temp.length > 0) {
//           obj.children = temp;
//         }
//         tree.push(obj);
//       }
//     })
//     return tree;
// }
//   // console.log(getTreeData(data.result, 0))


//   let arr = [1,2,3,5,8]
//   let target = 13

// function sum(nums, target) {
//     let newMap = new Map()
//     console.log(newMap)
//     for(let i=0; i<nums.length;i++){
//         let key = target - nums[i]
//         if(newMap.has(key)){
//             return [newMap.get(key), i]
//         }
//         newMap.set(nums[i], i)
//     }
// };

//   console.log(sum(arr, target))


// function add(...args){
//   return (function inner(...innerArgs){
//     return [...args].concat([...innerArgs]).reduce((a,b)=>{
//       return a+b
//     })
//   })()
// }

// console.log(add(1)); 			// 1
// add(1)(2);  	// 3
// // add(1)(2)(3) // 6
// // add(1)(2, 3); // 6
// // add(1, 2)(3); // 6
// // add(1, 2, 3); // 6

