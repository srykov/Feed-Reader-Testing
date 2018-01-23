/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite to test all the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('urls are not empty', function() {
            allFeeds.forEach(function(element){
                expect(element.url).toBeDefined();
                expect(element.url.length).not.toBe(0);
            });
         });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
          it('names are not empty', function() {
            allFeeds.forEach(function(element){
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBe(0);
            });
         });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when clicked', function() {
            const bodyElement = $('body');
            const menuIcon = $('.menu-icon-link');

            //click the menu icon once to open the menu, menu should be displayed
            menuIcon.trigger('click');
            expect(bodyElement.hasClass('menu-hidden')).not.toBe(true);

            //click the menu icon again to close the menu, menu should be hidden
            menuIcon.trigger('click');
            expect(bodyElement.hasClass('menu-hidden')).toBe(true);
        });
     });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('contains at least a single entry', function(done) {
            const feedContainer = $('.feed');
            const entries = feedContainer.children('.entry-link');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        const firstEntries = [];

        beforeEach(function(done){
            //load the first feed, and grab the title of the first entry
            loadFeed(0,function(){
                const feedContainer = $('.feed');
                const entries = feedContainer.children('.entry-link');
                firstEntries[0] = entries[0].innerText;
            });

            //load the second feed, and grab the title of the first entry
            loadFeed(1, function(){
                const feedContainer = $('.feed');
                const entries = feedContainer.children('.entry-link');
                firstEntries[1] = entries[0].innerText;
                done();
            });

        });

        afterEach(function(done){
            //load the first feed, and grab the title of the first entry
            loadFeed(0,function(){
                done();
            });

        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('causes content to change', function(done) {
            expect(firstEntries[0]).not.toEqual(firstEntries[1]);
            done();
        });
    });

}());
