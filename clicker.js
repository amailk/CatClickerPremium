$(function() {

  // model
  var data = {
    cats: [
      {
          name: "George",
          clicks: 0,
          image: "images/george.jpg"
      },
      {
        name: "Fred",
        clicks: 0,
        image: "images/fred.jpg"
      }
    ],
    selectedCat: null
  };

  // octopus/controller
  var controller = {

      init: function() {
        console.log("controller.init()");
        view.init();
      },

      getCats: function() {
        return data.cats;
      },

      clickedOn: function(cat) {
        console.log("Clicked on: " + cat);
        var chosenCat = data.cats[cat.id];
        chosenCat.clicks ++;

        view.render();
      },

      catSelected: function(cat) {
            data.selectedCat = cat.id;
            view.render();
      },

      getSelectedCat: function() {
        return data.cats[data.selectedCat];
      },

      getSelectedCatId: function() {
        return data.selectedCat;
      }
  };


  // view
  var view = {
    init: function() {
      console.log("view.init()");
      this.$catList = $('.cat-list');
      this.catTemplate = $('script[data-template="cat"]').html();

      this.$display = $('.cat-display');
      this.displayTemplate = $('script[data-template="display-template"]').html();

      this.$catList.on('click', '.cat-list-item', function(e) {
          var cat = $(this).data();
          controller.catSelected(cat);
          return false;
      });

      this.$display.on('click', 'img', function(e) {
        var $parent = $(this).parent();
        var cat = $parent.data();
        controller.clickedOn(cat);
        return false;
      });

      this.render();
    },

    render: function() {

      // Render the cat list
      var $catList = this.$catList,
        catTemplate = this.catTemplate;
      $catList.html('');
      var i = 0;
      controller.getCats().forEach(function(cat){
          var thisTemplate = catTemplate.replace(/{{name}}/g, cat.name)
                                        .replace(/{{clicks}}/g, cat.clicks)
                                        .replace(/{{id}}/g, i);
          $catList.append(thisTemplate);
          i++;
      });

      // Render the cat display
      var $display = this.$display,
          displayTemplate = this.displayTemplate;

      $display.html('');
      var selectedCat = controller.getSelectedCat();
      if (selectedCat != null) {
        var newHtml = displayTemplate.replace(/{{name}}/g, selectedCat.name)
                                     .replace(/{{clicks}}/g, selectedCat.clicks)
                                     .replace(/{{image}}/g, selectedCat.image)
                                     .replace(/{{id}}/g, controller.getSelectedCatId());
        $display.append(newHtml);
      }

    }
  }

  controller.init();

}());
