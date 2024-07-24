const numbers = [1, 2, 3, 4]

// 인덱스: 색인 (특정 자리에 값을 그 자리에 새겨놓고 꺼내서 사용하는 행위)

// const b = numbers[0] 인덱싱
// const c = numbers[1]
// const d = numbers[2]

// 배열 구조 분해 할당
//    [1, 2, 3, 4]
const [b, c, d] = numbers

console.log(b) // 1
console.log(c) // 2
console.log(d) // 3

// 객채 구조 분해 할당
const users = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
}

const { name } = users
console.log(name) // 'John Doe

const { address = 'Jeju' } = users
console.log(address) // 'John Doe

const { age: userAge } = users
const age = 999
console.log(userAge)