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
        view.init();
      },

      getCats: function() {
        return data.cats;
      },

      clickedOn: function() {
        var selectedCat = data.cats[data.selectedCat];
        selectedCat.clicks ++;

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
      // Get the cat list, and the list item templates
      this.$catList = $('.cat-list');
      this.itemTemplate = $('script[data-template="item-template"]').html();


      // Add a click listener to select a cat
      this.$catList.on('click', '.cat-list-item', function(e) {
          var cat = $(this).data();
          controller.catSelected(cat);
          return false;
      });
      this.$display = $('.cat-display');
      this.displayTemplate = $('script[data-template="display-template"]').html();

      this.$display.on('click', 'img', function(e) {
        controller.clickedOn();
        return false;
      });

      this.render();
    },

    render: function() {

      // Render the cat list
      var $catList = this.$catList,
        itemTemplate = this.itemTemplate;

      // Clear out the cat list
      $catList.html('');
      // Add all the cats back to the list with updated values
      var i = 0;
      controller.getCats().forEach(function(cat){
          var newHtml = itemTemplate.replace(/{{name}}/g, cat.name)
                                        .replace(/{{id}}/g, i);
          $catList.append(newHtml);
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
                                     .replace(/{{image}}/g, selectedCat.image);
        $display.append(newHtml);
      }

    }
  }

  controller.init();
}());
