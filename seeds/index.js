const sequelize = require('../config/connection');
const seedCards = require('./cardData');
const mtg = require('mtgsdk');
const seedAll = async () => {
    
    await sequelize.sync({ force: true });

    const cards = await mtg.card.where({setName: 'Limited Edition Alpha', pageSize:10});
    // console.log(cards);
    const cardData = await cards.map(e =>
        {
         var ob = {};
            ob.name = e.name;
            ob.manaCost = e.manaCost;
            ob.cmc = e.cmc;
            ob.imageUrl = e.imageUrl;
 
 
            return ob;
        }
     )
// console.log(cardData);
    await seedCards(cardData)

}

seedAll();