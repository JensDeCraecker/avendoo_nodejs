'use strict';
module.exports = (Item) => {
  Item.reseed = async () => {
    try {
      console.log('🚚 gaan vertrekken om de automaten te vullen met 🍞')
      await Item.destroyAll({})
      const items = require('./seed.json').models.itemsSeed
      await Item.create(items)
      console.log('🍞🍞🍞 Aanvullen');
      console.log('Alle automaten zijn voorzien van 🍞')
      await Item.count({})
      return 200
    }
    catch (e) {
      console.log(e)
    }
  }
  Item.remoteMethod(
    'reseed', {
      http: {
        path: '/reseed',
        verb: 'get'
      },
      description: 'Wis alle oude records, en zet ze proper terug',
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  );
}

