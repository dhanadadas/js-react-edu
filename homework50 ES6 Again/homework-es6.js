let employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

let employersNames = employers
    .filter((item) => {
    if (item.length>0) return item;
})
    .map((item) => item.toLowerCase().trim());

let sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};
const {cash,eu,rus}=sponsors;
function calcCash(cash = 0) {
    return cash.reduce((a,b) => a+b)
}
let money = calcCash(cash);

const makeBusiness = ({cash, emp, owner = 'Sam', director = 'Victor'}) => {
    let sumSponsors = sponsors.eu.concat(sponsors.rus, 'unexpected sponsor');
    console.log(`We have a business. Owner: ${owner}, director: ${director}. Our budget: ${cash}. And our employers: ${emp} 
     And we have a sponsors:
      ${sumSponsors}
    Note. Be careful with ${sponsors.eu[0]}. It's a huge risk.`);
}
makeBusiness({cash: money, emp: employersNames});