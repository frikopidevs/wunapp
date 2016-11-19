(function() {
  'use strict';
    app.service('userService', function(){

    var userdetails = [];
    this.adduserdetails = function(data){
      userdetails = data;
    }

    this.returnuserdetailsId = function(){
      return userdetails.id;
    }

  });
})();
