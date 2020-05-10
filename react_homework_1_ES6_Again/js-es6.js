// filter
let name = ['Ivan', 'Annastasia', 'Days', 'Joni', 'Dmitry'];
let shortNames = name.filter( (name) => {
	return name.length < 5;
});
console.log(shortNames);

// map
let ansers = ['IvAn', 'AnnAstasia', 'DAys', 'JonI', 'DmiTry'];
ansers = ansers.map( (item) => item.toLowerCase() );
console.log(ansers);

// интерполяция
function min(a,b,...numbers) { // только один Rest оператор допустим и в только конце.
	console.log(numbers);
}
min(2,5,6,23,5,23,5,365);

// разворот
const  arr1 = [34,23,1323],
	arr2 = [23,42,23,35];

const res = Math.max(1, ...arr1, 300, ...arr2);
console.log(res);

// объекты
const user = {
	name: 'default',
		pass: 'qwerty',
		rigths: 'user'
};
const admin = {
	name: 'admin',
	pass: 'root'
};
const res2 = Object.assign(user, admin);// es6
const res3 = Object.assign({}, user, admin);// es6
const res4 = {...user, ...admin};// es8
console.log(res4);

// интересные моменты про объекты в новом стандарте
const x= 25, y = 10;
const coords = {
	x,//x:x,
	y//y:y
};// работает только тогда, когда название свойства объекта совпадает с названием переменной
// теперь перепишем в одну строку
const coords2 = {x,y};
console.log(coords);
console.log(coords2);

// сокращенные методы
const coords3 = {
	name,
	getName() {//getName: function () {}
		console.log(name);
	}
};
coords3.getName();
// раньше:
const coords4 = {
	name: name,
	getName: function () {
		console.log(name);
	}
};
coords4.getName();

//по аналогии
const avatar = 'Photo';
const res5 = {...user, ...admin, avatar};// es8
console.log(res5);

// Деструктуризация
const user0 = {
	name0: 'default',
	pass0: 'qwerty',
	rigths0: 'user'
};
console.log(user0.name0);
const userName = user0.name0;
const passName = user0.pass0;
const rigthsName = user0.rigths0;
// а вот пример деструкт.
const {name0,pass0,rigths0} = user0;
console.log(name0);
console.log(pass0);
console.log(rigths0);

//более сложный пример
const user1 = {
	name1: {
		first:'Tom',
		second:'Smith'
	},
	pass1: 'qwerty',
	rigths1: 'user'
};
const {name1:{first,second},pass1,rigths1} = user1;
console.log(first+' '+second);

// важный паттерн
//function connect(options) {
function connect({
	host   = 'localhost',
	port = 3000,
	user   = 'default'

} = {}) {// = {} в случае connect(); Аналог connect({});
	console.log(`Host: ${host}, port: ${port}, user: ${user}`);
}
connect({
	host: 'localhost',
	port: 8080,
	user: 'default'
});
connect({
	host: '192.168.1.1'
});
connect();

// дестр. для массивов
const numbers = [3,4,5,7,8];
const [, , c] = numbers;
console.log(c);

// дестктур. для многомерного массива
const numbers0 = [[3,4],55,[7,8]];
const [[a,b], g, [d, f]] = numbers0;
console.log(b);
console.log(d);
console.log(g);

// еще один пример из реального объекта
const country = {
	name: "Englang",
	pop: 2000000,
	gender: {
		male: ['13%', '55%'],
		famale: ['15%', '30%']
	}
};
// обычный вывод:
//country.gender.male[0];
// дестр.:
const {gender:{male:[maleUnder18, maleAdult],famale:[femaleUnder18, femaleAdult]}} = country;
console.log(maleUnder18);
console.log(femaleAdult);