
/* ======= Model ======= */

var model = {
    currentCat: null,
    adminSelect: false,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
        adminView.hide();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
        adminView.render();
    },

    // cat clicker premium pro
    adminDisplay: function() {
        if (model.adminSelect === false) {
            model.adminSelect = true;
            adminView.show();
        } else if (model.adminSelect === true) {
            model.adminSelect = false;
            adminView.hide();
        }
    },

    adminCancel: function() {
        adminView.hide();
    },

    adminSave: function() {
        model.currentCat.name = adminCatName.value;
        model.currentCat.imgSrc = adminCatURL.value;
        model.currentCat.clickCount = adminCatClicks.value;
        catView.render();
        catListView.render();
        adminView.hide();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    adminView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

var adminView = {
    init: function() {
        this.adminCatName = document.getElementById('adminCatName');
        this.adminCatURL = document.getElementById('adminCatURL');
        this.adminCatClicks = document.getElementById('adminCatClicks');

        this.adminBtn = document.getElementById('admin');
        this.adminCancelBtn = document.getElementById('adminCancelBtn');
        this.adminSaveBtn = document.getElementById('adminSaveBtn')

        this.adminBtn.addEventListener('click', function() {
            octopus.adminDisplay();
        });

        this.adminCancelBtn.addEventListener('click', function() {
            octopus.adminCancel();
        });

        this.adminSaveBtn.addEventListener('click', function() {
            octopus.adminSave();
        });

        this.render();
    },

    render: function() {
        var theCurrentCat = octopus.getCurrentCat();
        this.adminCatName.value = theCurrentCat.name;
        this.adminCatURL.value = theCurrentCat.imgSrc;
        this.adminCatClicks.value = theCurrentCat.clickCount;
    },

    show: function() {
        var catForm = document.getElementById('cat-form');
        catForm.style.display = 'block';
    },

    hide: function() {
        var catForm = document.getElementById('cat-form');
        catForm.style.display = 'none';
    }
};

// make it go!
octopus.init();
