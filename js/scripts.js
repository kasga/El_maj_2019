var domain;
var isMobile = false;
var geostate = "Øst";
var products = ["V", "F36", "F24", "F12"];
var selected = "";
var sw;
var firstRun = true;

// El
var elVariablePriceEast;
var elVariablePriceWest;
var elFixedPriceEast36;
var elFixedPriceWest36;
var elFixedPriceEast24;
var elFixedPriceWest24;
var elFixedPriceEast12;
var elFixedPriceWest12;
var eltransport;
var elsubscription;

// transport
var transportVariableEast;
var transportVariableWest;
var transportFixedEast;
var transportFixedWest;

// Dates
var elFixedPriceStart;
var elFixedPriceEnd12;
var elFixedPriceEnd24;
var elFixedPriceEnd36;

// Animated price
var shouldAnimate = false;
var priceObj = { value: 0 };
var priceContainer = document.getElementById("o-agreement-product-price");

function initMobileVersion() {}

// Get the prices from the Rich Text field above the orderflow
function getPrices() {
  // El
  elVariablePriceEast = roundTwoDecimals(
    jQuery("#o-privat-el-basisel-oest-inkl-moms").text()
  );
  elVariablePriceWest = roundTwoDecimals(
    jQuery("#o-privat-el-basisel-vest-inkl-moms").text()
  );
  elFixedPriceEast36 = roundTwoDecimals(
    jQuery("#o-privat-el-fastpris-oest-inkl-moms").text()
  );
  elFixedPriceWest36 = roundTwoDecimals(
    jQuery("#o-privat-el-fastpris-vest-inkl-moms").text()
  );
  elFixedPriceEast24 = roundTwoDecimals(
    jQuery("#o-privat-el-fastpris-oest-inkl-moms-24").text()
  );
  elFixedPriceWest24 = roundTwoDecimals(
    jQuery("#o-privat-el-fastpris-vest-inkl-moms-24").text()
  );
  elFixedPriceEast12 = roundTwoDecimals(
    jQuery("#o-privat-el-fastpris-oest-inkl-moms-12").text()
  );
  elFixedPriceWest12 = roundTwoDecimals(
    jQuery("#o-privat-el-fastpris-vest-inkl-moms-12").text()
  );
  eltransport = jQuery("#o-transport-og-afgifter").text();
  elsubscription = jQuery("#o-el-abonnement").text();

  elFixedPriceStart = jQuery("#o-fastpris-start-date").text();
  elFixedPriceEnd12 = jQuery("#o-fastpris-12-end-date").text();
  elFixedPriceEnd24 = jQuery("#o-fastpris-24-end-date").text();
  elFixedPriceEnd36 = jQuery("#o-fastpris-36-end-date").text();

  // Find the cheapes product
  var a = [
    parseFloat(elVariablePriceEast.replace(",", ".")),
    parseFloat(elFixedPriceEast36.replace(",", ".")),
    parseFloat(elFixedPriceEast24.replace(",", ".")),
    parseFloat(elFixedPriceEast12.replace(",", "."))
  ];

  var aMin = Math.min(a[0], a[1], a[2], a[3]);
  selected = products[a.indexOf(aMin)];
  //Removes the splashes that are unessecary
  jQuery.each(products, function(index, value) {
    if (products[index] !== selected) {
      jQuery("[data-id=" + products[index] + "]")
        .find(".o-product-box-cheapest")
        .remove();

      jQuery("[data-id=" + products[index] + "]").removeClass("cheapest");
    }
  });

  // Update the subscription, prices and transport, these are static values
  jQuery("#o-subscription").html(elsubscription);
  jQuery("#o-transport").html(roundTwoDecimals(eltransport));

  jQuery(".o-other-products").addClass("o-o100");

  changePrices();
}

function chooseProduct() {
  var selectedProd = jQuery("[data-id=" + selected + "]");
  var agreementSplash = jQuery("#o-product-box-cheapest");
  var agreementProdTitle = jQuery("#o-agreement-product-title");
  var agreementProdCheck1 = jQuery("#o-agreement-product-check-1");
  var agreementProdCheck2 = jQuery("#o-agreement-product-check-2");
  var agreementProdPrice = jQuery("#o-agreement-product-price");

  // Show only the relevant Binding link in the Details pop-up
  if (selected === "F12")
    jQuery(".o-period-link").attr(
      "data-target",
      "#orderflow-el-fastpris-binding-12"
    );
  else if (selected === "F24")
    jQuery(".o-period-link").attr(
      "data-target",
      "#orderflow-el-fastpris-binding-24"
    );
  else if (selected === "F36")
    jQuery(".o-period-link").attr(
      "data-target",
      "#orderflow-el-fastpris-binding-36"
    );

  firstRun = false;
}

function changePrices() {
  if (geostate == "Øst") {
    jQuery("[data-id='V'] .o-agreement-product-price").text(
      elVariablePriceEast
    );
    jQuery("[data-id='F36'] .o-agreement-product-price").text(
      elFixedPriceEast36
    );
    jQuery("[data-id='F24'] .o-agreement-product-price").text(
      elFixedPriceEast24
    );
    jQuery("[data-id='F12'] .o-agreement-product-price").text(
      elFixedPriceEast12
    );
  } else {
    jQuery("[data-id='V'] .o-agreement-product-price").text(
      elVariablePriceWest
    );
    jQuery("[data-id='F36'] .o-agreement-product-price").text(
      elFixedPriceWest36
    );
    jQuery("[data-id='F24'] .o-agreement-product-price").text(
      elFixedPriceWest24
    );
    jQuery("[data-id='F12'] .o-agreement-product-price").text(
      elFixedPriceWest12
    );
  }

  if (!firstRun) shouldAnimate = true;

  chooseProduct();
}

function handleSlider() {
  if (geostate == "Øst") {
    jQuery(".o-geo-knot").addClass("left");
    jQuery(".o-geo-west").addClass("o-bold");
    jQuery(".o-geo-east").removeClass("o-bold");
    geostate = "Vest";
  } else {
    jQuery(".o-geo-knot").removeClass("left");
    jQuery(".o-geo-west").removeClass("o-bold");
    jQuery(".o-geo-east").addClass("o-bold");
    geostate = "Øst";
  }

  changePrices();
}

function initOverlay() {
  jQuery("#o-overlay").appendTo("#main");
}

function initGestures() {
  //CHOOSE A PRODUCT
  var formOffset = 0;

  if (isMobile) {
    var formOffset = 0;
  }

  // OVERLAY
  jQuery("#o-overlay .o-close, .o-overlay-bg").on("click", function() {
    jQuery("#o-overlay").addClass("o-hide");
  });

  jQuery("#o-overlay a").on("click", function() {
    jQuery("#o-overlay").addClass("o-hide");
  });

  jQuery(".o-details-trigger").on("click", function(e) {
    var p = jQuery(this)
      .parent()
      .data("id");

    updateOverlay(p);

    jQuery("#o-overlay").removeClass("o-hide");
    e.preventDefault();
  });

  jQuery(".o-other-products .o-cta-blue").on("click", function(e) {
    // Transform the height
    jQuery(".o-product").removeClass("active");
    jQuery(this)
      .parent()
      .parent();
    // .addClass("active");

    // Change the text on the button
    jQuery(".o-product .o-cta").html("Vælg aftale");
    jQuery(this).html("Valgt");

    // Change design of button
    jQuery(".o-other-products .o-cta")
      .addClass("o-cta-blue")
      .removeClass("o-cta-border");
    jQuery(this)
      .removeClass("o-cta-blue")
      .addClass("o-cta-border");

    // Set the active product
    var p = jQuery(this)
      .parent()
      .parent()
      .data("id");
    selected = p;
    updateOverlay(p);

    handleForms();

    var form;

    if (selected === "V") form = jQuery("#block-form-acf-3").offset().top;
    else if (selected === "F36")
      form = jQuery("#block-form-acf-5").offset().top;
    else if (selected === "F24")
      form = jQuery("#block-form-acf-7").offset().top;
    else if (selected === "F12")
      form = jQuery("#block-form-acf-9").offset().top;

    ///Scrolls the window up to the Agreement area
    jQuery("html, body")
      .delay(500)
      .animate(
        {
          scrollTop: form - formOffset
        },
        400
      );

    e.preventDefault();
  });

  // GEO SLIDER
  var myVarElement = document.getElementById("o-geo-slide-containter");
  var mcVar = new Hammer(myVarElement);

  mcVar.on("swipeleft swiperight tap press", function(ev) {
    handleSlider();
  });
}

function updateOverlay(p) {
  selected = p;
  chooseProduct();

  // Starts by showing the right overlay. Either fixed og variable
  jQuery(".o-overlay-content").addClass("o-hide");
  if (p === "V") {
    jQuery(".o-overlay-content.o-variable-price").removeClass("o-hide");
  } else {
    jQuery(".o-overlay-content.o-fixed-price").removeClass("o-hide");
    if (p === "F36") jQuery(".o-overlay-range").text("36");
    else if (p === "F24") jQuery(".o-overlay-range").text("24");
    else jQuery(".o-overlay-range").text("12");
  }

  // Updates the subscription, transport, kwh price
  jQuery(".o-overlay-subscription").text(elsubscription);
  jQuery(".o-overlay-transport").text(roundTwoDecimals(eltransport));
  var price = jQuery('[data-id="' + p + '"]')
    .find(".o-agreement-product-price")
    .text();
  jQuery(".o-overlay-kwh").text(price);

  // Calculates the total price
  var eltransportAsNum = parseFloat(eltransport.replace(",", "."));
  var total = calculateTransport(price, eltransportAsNum);
  jQuery(".o-overlay-total").text(total);

  // Sets the start date
  jQuery(".o-overlay-start-date").text(elFixedPriceStart);
  if (p === "F36") jQuery(".o-overlay-end-date").text(elFixedPriceEnd36);
  else if (p === "F24") jQuery(".o-overlay-end-date").text(elFixedPriceEnd24);
  else if (p === "F12") jQuery(".o-overlay-end-date").text(elFixedPriceEnd12);
}

// Forms
function initForms() {}

function handleForms() {
  //Hides all the forms, and shows the active one
  jQuery("#block-form-acf-3").removeClass("o-show");
  jQuery("#block-form-acf-5").removeClass("o-show");
  jQuery("#block-form-acf-7").removeClass("o-show");
  jQuery("#block-form-acf-9").removeClass("o-show");

  if (selected === "V") {
    jQuery("#block-form-acf-3").addClass("o-show");
  } else if (selected === "F36") {
    jQuery("#block-form-acf-5").addClass("o-show");
  } else if (selected === "F24") {
    jQuery("#block-form-acf-7").addClass("o-show");
  } else if (selected === "F12") {
    jQuery("#block-form-acf-9").addClass("o-show");
  }
}

function getHeader() {
  var headerH = jQuery(".headerClassic").outerHeight();
  return headerH;
}

function calculateTransport(product, transport) {
  var asNum = parseFloat(product.replace(",", ".")) + transport;
  var asRound = asNum.toFixed(2);
  var asString = asRound.replace(".", ",");
  return asString;
}

function roundTwoDecimals(str) {
  var asString = parseFloat(str.replace(",", "."));
  var asNum = String(asString.toFixed(2));
  var roundStr = asNum.replace(".", ",");

  return roundStr;
}

function returnNumberWithTwoDecimals(str) {
  var asString = parseFloat(str.replace(",", "."));
  var asNum = String(asString.toFixed(2));

  return asNum;
}

function returnStringWithTwoDecimals(num) {
  var num = parseFloat(num);
  var asNum = String(num.toFixed(2));
  var asString = asNum.replace(".", ",");

  return asString;
}

function mobileCheck(a) {
  (jQuery.browser = jQuery.browser || {}).mobile =
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    );
}

var init = setInterval(function() {
  if (typeof jQuery != "undefined" && typeof jQuery != undefined) {
    clearInterval(init);

    jQuery(window).on("load", function() {
      mobileCheck(navigator.userAgent || navigator.vendor || window.opera);

      isMobile = jQuery.browser.mobile;
      domain = window.location.hostname;

      getPrices();

      initGestures();

      initForms();

      initOverlay();

      if (isMobile) {
        initMobileVersion();
      }
    });
  }
}, 50);
