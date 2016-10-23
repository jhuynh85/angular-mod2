(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // Controller for items to be purchased
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var ToBuyList = this;
    ToBuyList.items = ShoppingListCheckOffService.getToBuy();

    ToBuyList.buyItem = function(index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  }

  // Controller for items already purchased
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var AlreadyBoughtList = this;
    AlreadyBoughtList.items = ShoppingListCheckOffService.getBought();
  }

  // Service for handling lists of items already purchased/to be purchased
  function ShoppingListCheckOffService() {
    var service = this;

    var toBuy = [ {name: 'bananas', quantity: 10},
                  {name: 'cookies', quantity: 5},
                  {name: 'carrots', quantity: 20},
                  {name: 'cans of soda', quantity: 30},
                  {name: 'steak', quantity: 1}];
    var bought = [];

    // When user clicks the "Bought" button for an item
    service.buyItem = function(index) {
      bought.push(toBuy[index]);
      toBuy.splice(index, 1);
    };

    // Returns array of items to be purchased
    service.getToBuy = function() {
      return toBuy;
    }

    // Returns array of items already purchased
    service.getBought = function() {
      return bought;
    }
  }
})();
