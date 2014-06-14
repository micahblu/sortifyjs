/**
 * Sortify
 *
 * Simple jQuery plugin to sort unordered lists
 *
 * @author micahblu
 * @license GNU General Public License, version 3 (GPL-3.0)
 * @version 0.1.0
 */

(function($){

  var list,
      sortOption,
      listElements,
      listItems = [];

  function init(settings){
    
    list = settings.container;
    sortOption = settings.sortOption;
    listElements =list.getElementsByTagName("li"),
    listItems = [];
    
    sortify();
  }

  function sortify(){
    getItems();

    clearElements();

    sortItems();

    addItems();
  }

  function addItem(item){

    listItems.push(item);

    sortify();
  }

  function addItems(){

    var item;

    for(i = 0, l = listItems.length; i < l; i++){
      item = document.createElement("li");
      item.innerHTML = listItems[i];

      list.appendChild(item);
    }
  }

  function getItems(){
    //console.log(lis);
    for(var i = 0, l = listElements.length; i < l; i++){
      listItems[i] = listElements[i].innerHTML;
    }
  }

  function clearElements(){

    while(list.firstChild){
      list.removeChild(list.firstChild);
    }
  }

  function sortItems() {

    listItems.sort();

    if(sortOption === 'descending'){
      listItems.reverse();
    }
  }

  // The jQuery plugin API
  $.sortify = (function(){
      return {
        add: addItem
      };
  })();

  //
  $.fn.sortify = function( options ) {
    options = options || {};
    return this.each(function(index){
      options.container = this;
      init(options);
    });
  };

}(jQuery));