HTMLElement.prototype.addClass = function(className){
  var name = " "+className;
  this.className += name;
}
HTMLElement.prototype.closest = function(selector){
  var el = this;
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}
HTMLElement.prototype.isHidden = function(){
  return (this.style.display === "none");
}
