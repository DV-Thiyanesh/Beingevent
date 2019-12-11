  $(document).ready(function() {
      $(".owl-demo").owlCarousel({
        navigation : true, // Show next and prev buttons
      slideSpeed : 500,
        paginationSpeed : 1500,
        rewindSpeed : 1000,
      singleItem:true,
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
       

        navigation : false,
		pagination : false,
        navigationText : false,
        rewindNav : true,
        scrollPerPage : false,
 		autoPlay : true,
        stopOnHover : false,
        autoHeight : false
      });
    });
 
 
 /*******************demo2******************/
 
  $(document).ready(function() {
      $(".owl-demo2").owlCarousel({
       
		navigation : true, // Show next and prev buttons
      	slideSpeed : 800,
        paginationSpeed : 800,
        rewindSpeed : 1000,
	  
		items : 2,
        itemsCustom : false,
        itemsDesktop : [1280, 2],
        itemsDesktopSmall : [980, 2],
        itemsTablet : [767, 2],
		itemsDesktopSmall : [640, 2],
		itemsTablet : [640, 2],
		itemsTablet : [480, 1],
        itemsTabletSmall : false,

        itemsMobile : [480, 1],
		itemsMobile : [360, 1],
        singleItem : false,
        itemsScaleUp : false,

       

        navigation : true,
		pagination : false,
        navigationText : false,
        rewindNav : true,
        scrollPerPage : false,
 		autoPlay : false,
        stopOnHover : false,
        autoHeight : false
      });
    });

 
 
 /**********************************/
 
 
 
