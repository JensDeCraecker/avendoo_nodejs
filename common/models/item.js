'use strict';

module.exports = (Item) => {
  Item.remoteMethod(
    'items',
    {
      http: { verb: 'delete' },
      returns: { arg: 'items', type: 'Array' },
    });
};
