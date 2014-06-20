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
      listItems = [],
      listType;

  function init(settings){

    sortOption = settings.sortOption;
    
    listType = settings.container.tagName;

    if(listType === 'UL'){
      //listElements = $(list).find('li');
      list = settings.container;

      listElements = list.getElementsByTagName('li');
    }else if(listType === 'TABLE'){
      //listElements = $(list).find("tbody tr");
      list = settings.container.getElementsByTagName('tbody')[0];

      listElements = list.getElementsByTagName('tr');
    }else{
      console.log('Error, sortify only works on tables and unordered lists');
      return;
    }
    console.log(list);
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
      
      if(list.tagName === 'UL'){
        item = '<li>' + listItems[i] + '</li>';
      }else if(listType === 'TABLE'){
        item = '<tr>' + listItems[i] + '</tr>';
      }

      $(list).append(item);
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
      console.log(list.firstChild);
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