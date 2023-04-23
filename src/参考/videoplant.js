window.onunload = function () { };

screenW = screen.width;
if (navigator.userAgent.search(/Android 2./) != -1) {
  screenW = screen.width / window.devicePixelRatio;
}

screenH = screen.height;
if (navigator.userAgent.search(/Android 2./) != -1) {
  screenH = screen.height / window.devicePixelRatio;
}

if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) { $('body').on("mousewheel", function () { event.preventDefault(); var wd = event.wheelDelta; var csp = window.pageYOffset; window.scrollTo(0, csp - wd); }); }

//初期設定/////////////////////////////////////////////////
ready_flag = "false";
load_flag = "false";
ready_load_flag = "false";
scroll_flag = "false";

//タッチパネル判定/////////////////////////////////////////////////
var chkTouch = ('ontouchstart' in window);
if (chkTouch) {
  touch_flag = "true";
} else {
  touch_flag = "false";
}

var ua = navigator.userAgent;
var userAgent = window.navigator.userAgent.toLowerCase();
var appVersion = window.navigator.appVersion.toLowerCase();
ie_ver = 100;
if (userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
  if (appVersion.indexOf("msie 6.") != -1) {
    browser_data = "IE";
    ie_ver = 6;
  } else if (appVersion.indexOf("msie 7.") != -1) {
    browser_data = "IE";
    ie_ver = 7;
  } else if (appVersion.indexOf("msie 8.") != -1) {
    browser_data = "IE";
    ie_ver = 8;
  } else if (appVersion.indexOf("msie 9.") != -1) {
    browser_data = "IE";
    ie_ver = 9;
  } else if (appVersion.indexOf("msie 10.") != -1) {
    browser_data = "IE";
    ie_ver = 10;
  } else if (appVersion.indexOf("msie 11.") != -1) {
    browser_data = "IE";
    ie_ver = 11;
  } else {
    browser_data = "IE";
    ie_ver = 0;
  }
} else if (userAgent.indexOf('edge') != -1) {
  browser_data = "Edge";
} else if (userAgent.indexOf('chrome') != -1) {
  browser_data = "Chrome";
} else if (userAgent.indexOf('safari') != -1) {
  browser_data = "Safari";
} else if (userAgent.indexOf('firefox') != -1) {
  browser_data = "Firefox";
} else if (userAgent.indexOf('opera') != -1) {
  browser_data = "Opera";
} else {
  browser_data = "Other";
}

isAndroid = (ua.match(/Android/i));
isiPhone = (ua.match(/iPhone/i));
isiPad = (ua.match(/iPad/i));
isFlashInstalled = function () { if (navigator.plugins["Shockwave Flash"]) { return true; } try { new ActiveXObject("ShockwaveFlash.ShockwaveFlash"); return true; } catch (a) { return false; } }();
if (isAndroid) { android_ver = parseFloat(userAgent.substr(userAgent.indexOf('android') + 8, 3)) };

if (/iPhone/.test(ua)) {
  ua.match(/iPhone OS (\w+){1,3}/g);
  ios_ver = (RegExp.$1.replace(/_/g, '') + '00').slice(0, 3);
} else if (/iPad/.test(ua)) {
  ua.match(/CPU OS (\w+){1,3}/g);
  ios_ver = (RegExp.$1.replace(/_/g, '') + '00').slice(0, 3);
}

if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
  device = "sp";
} else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
  device = "tb";
  $("meta[name='viewport']").attr('content', 'width=1200');
} else {
  device = "pc";
}

//スクロール/////////////////////////////////////////////////
$(window).scroll(function () {
  if (ready_flag == "true") scroll_func_();
});
function scroll_func_() {
  scroll_y = (document.documentElement.scrollTop || document.body.scrollTop);
  scroll_x = (document.documentElement.scrollLeft || document.body.scrollLeft);
  scroll_func();
}

//マウスカーソル位置/////////////////////////////////////////////////
$(window).on('mousemove', function (e) {
  x_mouse = e.clientX;
  y_mouse = e.clientY;
});

//リサイズ/////////////////////////////////////////////////
$(window).resize(function () {
  if (ready_flag == "true") resize_func();
});
function resize_func() {
  resize_func2();
  resize_func2();
}
function resize_func2() {
  resize_common();
  resize_cont();
}
resize_mode = "null";
resize_count = 0;
function resize_common() {
  resize_mode_prv = resize_mode;
  if ($(window).width() > 767) {
    resize_mode = "pc";
  } else {
    resize_mode = "sp";
  }

  winW = $(window).width();
  winH = $(window).height();
  if (device != "pc") winH = window.innerHeight;

  ctrW = winW / 2;
  mdlH = winH / 2;

  if (resize_count == 0) winH_first = winH;
  resize_count++;
}

///////////////////////////////////////////////////

function re_place(_str, _search_str, _replace_str) {
  // _str 検索・置換の対象となる文字列
  // _search_str 検索する文字列
  // _replace_str 置換する文字列
  var strArray = _str.split(_search_str);
  return strArray.join(_replace_str);
}

function numtxt(num) {
  if (num < 10) num = String(num / 100000).substr(5);
  return num;
}

function shuffle(num) {
  shf_base = [];
  shf_save = [];
  shf_data = [];
  for (i = 1; i <= num; i++) {
    shf_base.push(i);

  }

  for (i = 0; i < num; i++) {
    data_all = shf_base.length;
    random_num = Math.floor(Math.random() * data_all);
    shf_data.push(shf_base[random_num]);
    shf_save = [];
    for (j = 0; j < data_all; j++) {
      if (j != random_num) {
        shf_save.push(shf_base[j]);
      }
    }
    shf_base = shf_save;
  }
}

///////////////////////////////////////////////////

$(function () {
  ready_flag = "true";
  scroll_y = (document.documentElement.scrollTop || document.body.scrollTop);
  scroll_x = (document.documentElement.scrollLeft || document.body.scrollLeft);

  $('#base').on('touchstart', onTouchStart); //指が触れたか検知
  $('#base').on('touchmove', onTouchMove); //指が動いたか検知
  $('#base').on('touchend', onTouchEnd); //指が離れたか検知

  //スワイプ開始時の横方向の座標を格納
  function onTouchStart(event) {
    resize_common();
  }

  //スワイプの方向（left／right）を取得
  function onTouchMove(event) {
    resize_common();
  }

  function onTouchEnd(event) {
    resize_common();
  }

  if (touch_flag == "true") $("#base").addClass("tch");
  if (touch_flag == "false") $("#base").addClass("no_tch");

  ready_func();
  if (load_flag == "true") ready_load_func_();
});

$(window).on('load', function () {
  load_flag = "true";
  load_func();
  if (ready_flag == "true") ready_load_func_();
});

function ready_load_func_() {
  ready_load_flag = "true";

  if (touch_flag == "false") {
    x_mouse = -100;
    y_mouse = -100;
  } else {
    $("#chase").html("");
    $("#chase").css({ "display": "none" });
  }

  ready_load_func();
}

///////////////////////////////////////////////////

function resize_cont() {
  //header
  if (resize_mode == "pc") {
    $("#base .header .navi .spnv").css({ "width": "auto", "height": "auto" });
  } else {
    $("#base .header .navi .spnv").css({ "width": winW, "height": winH });
  }

  //home
  if (touch_flag == "false") {
    $("#base .home").css({ "height": winH });
  } else {
    $("#base .home").css({ "height": winH_first });
  }
  $("#base .basebg").css({ "height": winH });
  basebg_radius = Math.max(ctrW, mdlH);

  if (resize_mode == "pc") {
    basebg_scale = Math.max((winW * winH) / (1600 * 900), 1.0);
  } else {
    basebg_scale = Math.min((winW * winH) / (1600 * 900) * 3.5, 1.0);
  }

  //solve
  ajst = 0.3 * winH;
  $("#base .solve").css({ "height": winH * 1.5 - ajst });

  radius = Math.sqrt(ctrW * ctrW + mdlH * mdlH) + 5;
  $("#base .solve .ctr_mdl .msk1").css({ "left": -radius, "top": -radius, "width": radius * 2, "height": radius * 2 });

  $("#base .solve .secbg").css({ "height": winH });

  $("#base .solve .secttl").css({ "height": winH });
  $("#base .solve .secttl .sub").css({ "left": -ctrW, "top": -mdlH, "width": winW, "height": winH });
  solve_bp1 = $("#base .solve").position().top - ajst;
  solve_bp2 = $("#base .solve").position().top + mdlH - ajst;

  //work
  if (resize_mode != resize_mode_prv) {
    $("#base .work .subwork ul li .cont .mov .submov .sub .cnvs").attr('width', work_thum_w);
    $("#base .work .subwork ul li .cont .mov .submov .sub .cnvs").attr('height', work_thum_h);
  }
  $("#base .work .subwork ul li .cont .mov .submov").css({ "left": (ctrW - work_thum_w / 2) % work_thum_w - work_thum_w });
  work_thum_num = Math.floor(Math.ceil(winW / work_thum_w) / 2) * 2 + 1;

  $("#base .work .subwork .more .submore").css({ "width": winW });

  //feature
  feature_bp = $("#base .feature").position().top;

  //pdca
  pdca_bg_w = 1504;
  pdca_bg_h = 940;
  if ((winW + 2) / (winH + 2) > pdca_bg_w / pdca_bg_h) {
    pdca_bg_scl = (winW + 2) / pdca_bg_w;
  } else {
    pdca_bg_scl = (winH + 2) / pdca_bg_h;
  }
  $("#base .pdca .bg").css({ "height": winH });
  $("#base .pdca .bg .subg").css({ "transform": "scale(" + pdca_bg_scl + ")" });

  //flow
  $("#base .flow").css({ "height": mdlH + ($("#base .flow .secttl ul li .sub").height() + 120) * 5 + winH });

  $("#base .flow .ctr_mdl .msk1").css({ "left": -radius, "top": -radius, "width": radius * 2, "height": radius * 2 });

  $("#base .flow .secbg").css({ "height": winH });

  if (resize_mode == "pc") {
    $("#base .flow .secttl").css({ "height": winH });
  } else {
    $("#base .flow .secttl").css({ "height": winH });
  }

  flow_bp1 = $("#base .flow").position().top;
  flow_bp2 = $("#base .flow").position().top + mdlH;
  flow_bp3 = $("#base .flow").position().top + mdlH + ($("#base .flow .secttl ul li .sub").height() + 120) * 5;

  //news
  news_bp = $("#base .news").position().top;

  //footer
  $("#base .footer").css({ "height": winH + 1 });
  $("#base .footer .cntct").css({ "height": winH + 1 });

  //modal
  $("#base .modal").css({ "height": winH });
  if (modal_work != "null") resize_modal();

  $("#base .cnt").css({ "height": $("#base .cnt .subcnt").height() });
}

function resize_modal() {
  //モーダルムービー
  modal_margin = 100;
  if (winH >= winW / vdo_w * vdo_h + modal_margin * 2) {
    modal_area_w = winW;
    modal_area_h = winH - modal_margin * 2;
  } else {
    modal_area_w = winW - modal_margin * 2;
    modal_area_h = winH - modal_margin * 2;
  }

  if (modal_area_w / modal_area_h >= vdo_w / vdo_h) {
    $("#base .modal .mov").css({ "width": Math.round(modal_area_h / vdo_h * vdo_w) });
    $("#base .modal .mov").css({ "height": modal_area_h });
    $("#base .modal .mov .vdo").css({ "width": Math.round(modal_area_h / vdo_h * vdo_w) });
    $("#base .modal .mov .vdo").css({ "height": modal_area_h });
  } else {
    $("#base .modal .mov").css({ "width": modal_area_w });
    $("#base .modal .mov").css({ "height": Math.round(modal_area_w / vdo_w * vdo_h) });
    $("#base .modal .mov .vdo").css({ "width": modal_area_w });
    $("#base .modal .mov .vdo").css({ "height": Math.round(modal_area_w / vdo_w * vdo_h) });
  }
}

function scroll_func() {
  if (touch_flag == "true" && scroll_flag == "true") {
    scroll_y2 = scroll_y;
    scroll_func2();
  }
}

function scroll_func2() {
  if (touch_flag == "false") $("#base .cnt .subcnt").css({ "top": -Math.round(scroll_y2) });

  //header
  if (10 >= scroll_y2) {
    if (!$("#base .header .logo").hasClass("fls")) {
      $("#base .header .logo").addClass("fls");
    }
  } else {
    if ($("#base .header .logo").hasClass("fls")) {
      $("#base .header .logo").removeClass("fls");
    }
  }

  //solve
  // スクロール量に応じて、円形のマスクの大きさを変化させる。
  // solve_crclは、現在の円形マスクの大きさをパーセンテージで表す変数。
  // スクロール量が特定のポイント(solve_bp1)よりも小さい場合は、マスクの大きさは0%になる。
  // スクロール量が特定のポイント(solve_bp1)を超える場合は、マスクの大きさは100%になる。
  // その後、$("#base .solve .ctr_mdl .msk1 .msk2")に対して、マスクの幅と高さを変更する。
  solve_crcl = Math.min(Math.max(scroll_y2 - solve_bp1, 0) / mdlH, 1) * 100;
  $("#base .solve .ctr_mdl .msk1 .msk2").css({ "width": solve_crcl + "%", "height": solve_crcl + "%" });

  // スクロール量が特定のポイント(solve_bp2)よりも大きい場合は、
  // ページ上部のヘッダーやフッターのクラスにflsを追加する。
  // それ以外の場合は、flsを削除する。
  if (solve_crcl == 100) {
    if (!$("#base .basebg").hasClass("fls")) {
      $("#base .basebg").addClass("fls");
    }
    if (!$("#base .header").hasClass("fls")) {
      $("#base .header").addClass("fls");
      $("#base .home .cntct").addClass("fls");
      $("#base .home .scrl").addClass("fls");
    }
  } else {
    if ($("#base .basebg").hasClass("fls")) {
      $("#base .basebg").removeClass("fls");
    }
    if ($("#base .header").hasClass("fls")) {
      $("#base .header").removeClass("fls");
      $("#base .home .cntct").removeClass("fls");
      $("#base .home .scrl").removeClass("fls");
    }
  }

  // スクロール量が特定のポイント(solve_bp2)よりも大きい場合は、
  // ".solve .secttl"要素にabsクラスを追加する。
  // それ以外の場合は、absクラスを削除する。
  if (solve_bp2 <= scroll_y2) {
    if (!$("#base .solve .secttl").hasClass("abs")) {
      $("#base .solve .secttl").addClass("abs");
    }
  } else {
    if ($("#base .solve .secttl").hasClass("abs")) {
      $("#base .solve .secttl").removeClass("abs");
    }
  }

  // スクロール量に応じて、".solve .secbg"要素の透明度を変更する。
  // solve_perは、現在の透明度をパーセンテージで表す変数。
  // スクロール量が特定のポイント(feature_bp)よりも小さい場合は、透明度は0%になる。
  // スクロール量が特定のポイント(feature_bp)を超える場合は、透明度は100%になる。

  solve_per = 100 - Math.min(Math.max(scroll_y2 - feature_bp, 0) / (winH * 0.3), 1) * 100;
  $("#base .solve .secbg").css({ "opacity": solve_per / 100 });

  // コードは主に、スクロール量に応じて、ページの様々な要素を変更するために使用されます。
  // 上のコードは、現在のスクロール位置(scroll_y2)を計算し、それに基づいてページの外観を調整します。
  // たとえば、解決セクションのタイトルを固定したり、透明度を調整したり、円形マスクを変更したりすることができます。
  // これらの変更は、ユーザーがページをスクロールするたびに自動的に行われます。

  // ただし、このコードを使用する前に、いくつかの変数（scroll_y2、solve_bp1、mdlH、solve_bp2、feature_bp、winH）が定義されている必要があります。
  // これらの変数は、スクロール量や要素の配置などのページの外観を調整するために使用されます。

  //work
  for (i = 0; i < $("#base .work .hdr").length; i++) {
    //HEADER

    if ($("#base .work").position().top + $("#base .work .hdr:eq(" + i + ")").position().top - winH * 0.65 <= scroll_y2) {
      if (!$("#base .work .hdr:eq(" + i + ")").hasClass("vw")) {
        $("#base .work .hdr:eq(" + i + ")").addClass("vw");
      }
    } else if ($("#base .work").position().top + $("#base .work .hdr:eq(" + i + ")").position().top - winH > scroll_y2) {
      if ($("#base .work .hdr:eq(" + i + ")").hasClass("vw")) {
        $("#base .work .hdr:eq(" + i + ")").removeClass("vw");
        //$("#base .work .subwork:eq("+i+") ul li").removeClass("vw");
      }
    }
  }

  for (j = 0; j < $("#base .work .subwork").length; j++) {
    //VIEW

    //for(i=0; i<$("#base .work .subwork:eq("+j+") ul li").length; i++){
    for (i = 0; i < 3; i++) {
      if ($("#base .work").position().top + $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").position().top - winH * 0.65 <= scroll_y2) {
        //if(!$("#base .work .subwork:eq("+j+") ul li:eq("+i+")").hasClass("vw") && $("#base .work .subwork:eq("+j+") ul li:eq("+i+")").parent().parent().hasClass("op")){
        if (!$("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").hasClass("vw")) {
          $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").addClass("vw");
        }
      } else if ($("#base .work").position().top + $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").position().top - winH > scroll_y2) {
        if ($("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").hasClass("vw")) {
          $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").removeClass("vw");
        }
      }
    }
  }

  for (j = 0; j < $("#base .work .subwork").length; j++) {
    //MOVIE ANIMATION

    for (i = 0; i < $("#base .work .subwork:eq(" + j + ") ul li").length; i++) {
      if ($("#base .work").position().top + $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").position().top - winH <= scroll_y2 && $("#base .work").position().top + $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").position().top + $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ") .cont .mov").height() >= scroll_y2) {
        if (!$("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").hasClass("act")) {
          $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").addClass("act");
          $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ") .vdo").get(0).play();
        }
      } else {
        if ($("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").hasClass("act")) {
          $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ")").removeClass("act");
          $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ") .vdo").get(0).pause();
        }
      }
    }
  }

  for (i = 0; i < $("#base .work .subwork").length; i++) {
    //MORE 

    if ($("#base .work").position().top + $("#base .work .subwork:eq(" + i + ") .more").position().top - winH * 0.65 <= scroll_y2) {
      if (!$("#base .work .subwork:eq(" + i + ") .more").hasClass("vw")) {
        $("#base .work .subwork:eq(" + i + ") .more").addClass("vw");
      }
    }

    if ($("#base .work .subwork:eq(" + i + ")").hasClass("op")) {
      if ($("#base .work").position().top + $("#base .work .subwork:eq(" + i + ") ul li:eq(3)").position().top - winH > scroll_y2) {
        if ($("#base .work .subwork:eq(" + i + ") .more").hasClass("vw")) {
          $("#base .work .subwork:eq(" + i + ") .more").removeClass("vw");
          $("#base .work .subwork:eq(" + i + ")").removeClass("op");
          for (j = 3; j < $("#base .work .subwork:eq(" + i + ") ul li").length; j++) {
            $("#base .work .subwork:eq(" + i + ") ul li:eq(" + j + ")").removeClass("vw");
          }
          resize_func();
        }
      }
    }
  }

  //feature
  if ($("#base .feature").position().top + $("#base .feature .hdr").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .feature .hdr").hasClass("vw")) {
      $("#base .feature .hdr").addClass("vw");
    }
  } else if ($("#base .feature").position().top + $("#base .feature .hdr").position().top - winH > scroll_y2) {
    if ($("#base .feature .hdr").hasClass("vw")) {
      $("#base .feature .hdr").removeClass("vw");
    }
  }
  if ($("#base .feature").position().top + $("#base .feature ul").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .feature ul").hasClass("vw")) {
      $("#base .feature ul").addClass("vw");
    }
  } else if ($("#base .feature").position().top + $("#base .feature ul").position().top - winH > scroll_y2) {
    if ($("#base .feature ul").hasClass("vw")) {
      $("#base .feature ul").removeClass("vw");
    }
  }

  //pdca
  if ($("#base .pdca").position().top - winH <= scroll_y2 && $("#base .pdca").position().top + $("#base .pdca").height() >= scroll_y2) {
    if (!$("#base .pdca").hasClass("vw")) {
      $("#base .pdca").addClass("vw");
    }
  } else {
    if ($("#base .pdca").hasClass("vw")) {
      $("#base .pdca").removeClass("vw");
    }
  }
  if ($("#base .pdca").position().top + $("#base .pdca .txt .subtxt p.pc_only").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .pdca .txt .subtxt p.pc_only").hasClass("vw")) {
      $("#base .pdca .txt .subtxt p.pc_only").addClass("vw");
    }
  } else if ($("#base .pdca").position().top + $("#base .pdca .txt .subtxt p.pc_only").position().top - winH > scroll_y2) {
    if ($("#base .pdca .txt .subtxt p.pc_only").hasClass("vw")) {
      $("#base .pdca .txt .subtxt p.pc_only").removeClass("vw");
    }
  }
  if ($("#base .pdca").position().top + $("#base .pdca .txt .subtxt .sp_only").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .pdca .txt .subtxt .sp_only").hasClass("vw")) {
      $("#base .pdca .txt .subtxt .sp_only").addClass("vw");
    }
  } else if ($("#base .pdca").position().top + $("#base .pdca .txt .subtxt .sp_only").position().top - winH > scroll_y2) {
    if ($("#base .pdca .txt .subtxt .sp_only").hasClass("vw")) {
      $("#base .pdca .txt .subtxt .sp_only").removeClass("vw");
    }
  }

  //clients
  if ($("#base .clients").position().top + $("#base .clients .hdr").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .clients .hdr").hasClass("vw")) {
      $("#base .clients .hdr").addClass("vw");
    }
  } else if ($("#base .clients").position().top + $("#base .clients .hdr").position().top - winH > scroll_y2) {
    if ($("#base .clients .hdr").hasClass("vw")) {
      $("#base .clients .hdr").removeClass("vw");
    }
  }

  if ($("#base .clients").position().top + $("#base .clients ul li:eq(0) img").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .clients ul").hasClass("vw")) {
      $("#base .clients ul").addClass("vw");
    }
  } else if ($("#base .clients").position().top + $("#base .clients ul li:eq(0) img").position().top - winH > scroll_y2) {
    if ($("#base .clients ul").hasClass("vw")) {
      $("#base .clients ul").removeClass("vw");
    }
  }

  //flow
  flow_crcl = Math.min(Math.max(scroll_y2 - flow_bp1, 0) / mdlH, 1) * 100;
  $("#base .flow .ctr_mdl .msk1 .msk2").css({ "width": flow_crcl + "%", "height": flow_crcl + "%" });

  flow_slide = Math.min(Math.max(scroll_y2 - flow_bp2, 0), flow_bp3 - flow_bp2);
  if (resize_mode == "pc") {
    $("#base .flow .secttl .cont").css({ "left": flow_slide * -1 });
  } else {
    $("#base .flow .secttl .cont").css({ "left": 0 });
  }

  if (flow_crcl >= 100) {
    if (!$("#base .flow .secttl").hasClass("vw")) {
      $("#base .flow .secttl").addClass("vw");
    }
  } else if (flow_crcl <= 0) {
    if ($("#base .flow .secttl").hasClass("vw")) {
      $("#base .flow .secttl").removeClass("vw");
    }
  }

  if (flow_bp3 <= scroll_y2) {
    if (!$("#base .flow .secttl").hasClass("abs")) {
      $("#base .flow .secttl").addClass("abs");
    }
  } else {
    if ($("#base .flow .secttl").hasClass("abs")) {
      $("#base .flow .secttl").removeClass("abs");
    }
  }

  if (flow_crcl >= 100) {
    if (!$("#base .flow").hasClass("sp_abs")) {
      $("#base .flow").addClass("sp_abs");
    }
  } else {
    if ($("#base .flow").hasClass("sp_abs")) {
      $("#base .flow").removeClass("sp_abs");
    }
  }

  flow_per = 100 - Math.min(Math.max(scroll_y2 - news_bp + mdlH, 0) / (winH * 0.3), 1) * 100;
  $("#base .flow .secbg").css({ "opacity": flow_per / 100 });

  if (flow_crcl <= 0 || flow_per <= 0) {
    if ($("#base .flow .secbg").hasClass("vw")) {
      $("#base .flow .secbg").removeClass("vw");
      $("#base .flow .secttl").removeClass("vw2");
    }
  } else {
    if (!$("#base .flow .secbg").hasClass("vw")) {
      $("#base .flow .secbg").addClass("vw");
      $("#base .flow .secttl").addClass("vw2");
    }
  }

  //news
  if ($("#base .news").position().top + $("#base .news .subsec .subsubsec").position().top + $("#base .news .subsec .subsubsec .hdr").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .news .subsec .subsubsec .hdr").hasClass("vw")) {
      $("#base .news .subsec .subsubsec .hdr").addClass("vw");
    }
  } else if ($("#base .news").position().top + $("#base .news .subsec .subsubsec").position().top + $("#base .news .subsec .subsubsec .hdr").position().top - winH > scroll_y2) {
    if ($("#base .news .subsec .subsubsec .hdr").hasClass("vw")) {
      $("#base .news .subsec .subsubsec .hdr").removeClass("vw");
    }
  }

  if ($("#base .news").position().top + $("#base .news .subsec .subsubsec").position().top + $("#base .news .subsec .subsubsec ul").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .news .subsec .subsubsec ul").hasClass("vw")) {
      $("#base .news .subsec .subsubsec ul").addClass("vw");
    }
  } else if ($("#base .news").position().top + $("#base .news .subsec .subsubsec").position().top + $("#base .news .subsec .subsubsec ul").position().top - winH > scroll_y2) {
    if ($("#base .news .subsec .subsubsec ul").hasClass("vw")) {
      $("#base .news .subsec .subsubsec ul").removeClass("vw");
    }
  }

  //footer
  if ($("#base .footer").position().top - 100 <= scroll_y2) {
    if (!$("#base .header").hasClass("wht")) {
      $("#base .header").addClass("wht");
    }
  } else {
    if ($("#base .header").hasClass("wht")) {
      $("#base .header").removeClass("wht");
    }
  }

  if ($("#base .footer").position().top - winH <= scroll_y2) {
    if (!$("#base .basebg").hasClass("blk")) {
      $("#base .basebg").addClass("blk");
    }
  } else {
    if ($("#base .basebg").hasClass("blk")) {
      $("#base .basebg").removeClass("blk");
    }
  }

  if ($("#base .footer").position().top + $("#base .footer .cntct .txt").position().top - winH * 0.65 <= scroll_y2) {
    if (!$("#base .footer .cntct").hasClass("vw")) {
      $("#base .footer .cntct").addClass("vw");
    }
  } else if ($("#base .footer").position().top + $("#base .footer .cntct .txt").position().top - winH > scroll_y2) {
    if ($("#base .footer .cntct").hasClass("vw")) {
      $("#base .footer .cntct").removeClass("vw");
    }
  }
}

function intro_func() {
  setInterval_func();
  scroll_flag = "true";

  $("#itr").delay(0.1 * 1000).fadeOut({ duration: 0.9 * 1000, easing: "easeInOutQuart", complete: function () { } });

  setTimeout(function () { $("#base .home").addClass("vw"); }, 1.1 * 1000);
  setTimeout(function () { $("#base .header").addClass("vw"); }, (1.1 + 1.25) * 1000);
  setTimeout(function () {
    $("#base .home .cntct").addClass("vw");
    $("#base .cnt").addClass("true");
  }, (1.1 + 1.25 + 0.4) * 1000);
  setTimeout(function () {
    work_more_load();
  }, (1.1 + 1.25 + 0.5) * 1000);
}

function ready_func() {
  if (touch_flag == "true") $("#base").addClass("tch");
  if (touch_flag == "false") $("#base").addClass("no_tch");

  $("#base a").mouseenter(function () {
    if (touch_flag == "false") {
      if ($(this).hasClass("hvr_s")) {
        $("#chase").addClass("ov_s");
      } else if ($(this).hasClass("hvr_c")) {
        $("#chase").addClass("del");
        $("#chase_contact").addClass("ov");
      } else if ($(this).hasClass("hvr_d")) {
        $("#chase").addClass("del");
      } else {
        $("#chase").addClass("ov");
      }
    }
  }).mouseleave(function () {
    if (touch_flag == "false") {
      if ($(this).hasClass("hvr_s")) {
        $("#chase").removeClass("ov_s");
      } else if ($(this).hasClass("hvr_c")) {
        $("#chase").removeClass("del");
        $("#chase_contact").removeClass("ov");
      } else if ($(this).hasClass("hvr_d")) {
        $("#chase").removeClass("del");
      } else {
        $("#chase").removeClass("ov");
      }
    }
  });

  $("#base span.hvr_s").mouseenter(function () {
    if (touch_flag == "false") {
      $("#chase").addClass("ov_s");
    }
  }).mouseleave(function () {
    if (touch_flag == "false") {
      $("#chase").removeClass("ov_s");
    }
  });

  $("#base .hvr").mouseenter(function () {
    if (touch_flag == "false") $("#chase").addClass("ov");
  }).mouseleave(function () {
    if (touch_flag == "false") $("#chase").removeClass("ov");
  });

  $("#base .header .logo").click(function () {
    ancr(0);
  });

  $("#base .header .navi .spnv .sub .main li").click(function () {
    ancr($("#base .header .navi .spnv .sub .main li").index(this) + 1);
  });

  $("#base .header .navi .icn").click(function () {
    if ($("#base").hasClass("nvop")) {
      scroll_flag = "true";
      $("#base").removeClass("nvop");
      $("#base").css({ "position": "static", "top": 0 });
      $("html,body").scrollTop(scroll_y_save);
      scroll_y2 = scroll_y = scroll_y_save;
    } else {
      scroll_flag = "false";
      scroll_y_save = scroll_y = scroll_y2;
      $("#base").addClass("nvop");
      $("#base").css({ "position": "fixed", "top": scroll_y_save * -1 });
    }
  });

  //work
  work_thum_w = 448;
  work_thum_h = 252;

  for (i = 0; i < $("#base .work .subwork").length; i++) {
    if ($("#base .work .subwork:eq(" + i + ") ul li").length <= 3) $("#base .work .subwork:eq(" + i + ")").addClass("less");
  }

  if (device != "sp") {
    for (j = 0; j < $("#base .work .subwork").length; j++) {
      for (i = 0; i < $("#base .work .subwork:eq(" + j + ") ul li").length; i++) {
        url = $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ") .cont .mov .submov .sub:eq(8)").html();
        $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ") .cont .mov .submov .sub:eq(8)").html('<video class="vdo" src="' + url + '" playsinline loop muted></video>');
        if (i == 2) i += 99999;
      }
    }
  }

  vdo_url = [];
  for (i = 0; i < $("#base .work .subwork ul li").length; i++) {
    vdo_url.push($("#base .work .subwork ul li:eq(" + i + ") .cont .mov .submov .sub:eq(9)").html());
    $("#base .work .subwork ul li:eq(" + i + ") .cont .mov .submov .sub:eq(9)").remove();
  }

  modal_work = "null";
  $("#base .work .subwork ul li .cont").click(function () {
    modal_work = $("#base .work .subwork ul li .cont").index(this);
    movie_func();
  }).mouseenter(function () {
    if (touch_flag == "false") {
      $(this).addClass("act");
    }
  }).mouseleave(function () {
    if (touch_flag == "false") {
      $(this).removeClass("act");
    }
  });

  $("#base .work .subwork .more").click(function () {
    j = $("#base .work .subwork .more").index(this);
    $("#base .work .subwork:eq(" + j + ")").addClass("op");
    resize_func();

    for (i = 3; i < $("#base .work .subwork:eq(" + j + ") ul li").length; i++) {
      work_more_click(j, i);
    }
  });

  //pdca
  pdca_txt = $("#base .pdca .txt .subtxt p.pc_only").html();
  pdca_txt_re = "";
  pdca_txt_num = pdca_txt.length;
  for (i = 0; i < pdca_txt_num; i++) {
    pdca_txt_re += "<span>" + pdca_txt.charAt(i) + "</span>";
  }
  $("#base .pdca .txt .subtxt p.pc_only").html(pdca_txt_re);
  for (i = 0; i < pdca_txt_num; i++) {
    $("#base .pdca .txt .subtxt p.pc_only span:eq(" + i + ")").css({
      "-webkit-transition-delay": (0.025 * i) + "s",
      "-o-transition-delay": (0.025 * i) + "s",
      "transition-delay": (0.025 * i) + "s"
    });
  }

  //news
  $("#base .news .subsec .subsubsec ul li:eq(0)").prepend('<div class="bdr"></div>');
  for (i = 0; i < $("#base .news .subsec .subsubsec ul li .bdr").length; i++) {
    $("#base .news .subsec .subsubsec ul li .bdr:eq(" + i + ")").addClass("bdr" + i);
  }

  for (i = 0; i < $("#base .news .subsec .subsubsec ul li a").length; i++) {
    if ($("#base .news .subsec .subsubsec ul li a:eq(" + i + ")").attr("href") == "") {
      $("#base .news .subsec .subsubsec ul li a:eq(" + i + ")").addClass("fls");
    }
  }

  //modal
  $("#base .modal .bg").click(function () {
    movie_del();
  });

  $("#base .modal .close").click(function () {
    movie_del();
  });

  $("#base .modal .mov .vdo").get(0).addEventListener('loadedmetadata', function () {
    vdo_w = $("#base .modal .mov .vdo").get(0).videoWidth;
    vdo_h = $("#base .modal .mov .vdo").get(0).videoHeight;

    resize_modal();
    $("#base .modal .mov .vdo").addClass("vw");
  });

  resize_func();
}

function load_func() {
}

function ready_load_func() {
  resize_func();
  intro_func();
}

function setInterval_func() {
  resize_func();
  scroll_y2 = scroll_y;

  st_count = 0;

  //背景アニメーション
  degrees = 0;
  point = [];
  for (i = 0; i < $("#base .basebg ul li").length; i++) {
    point[i] = [];
  }
  katamuki = 0;

  cntscr_settimer = setInterval(function () {
    $("#tst").html($(window).height() + "+" + winH_first + "+" + window.innerHeight);

    // 慣性スクロール
    if (touch_flag == "false") { // タッチ操作が行われていない場合に実行する
      if (scroll_flag == "true") { // スクロールが発生している場合に実行する
        trg = scroll_y; // 目標位置を現在のスクロール位置とする
        scroll_y2 = scroll_y2 + (trg - scroll_y2) / 5; // 目標位置に向かってスクロール位置を徐々に移動する

        if (Math.abs(trg - scroll_y2) < 0.5) { // 移動量が一定値以下になった場合は、スクロール位置を目標位置に設定する
          scroll_y2 = trg;
        }

        scroll_func2(); // スクロール位置の移動が完了したら、scroll_func2()を呼び出す
      }
    }


    //追跡カーソル
    if (touch_flag == "false") {
      x_mouse2 = x_mouse - 4;
      y_mouse2 = y_mouse - 4;

      chase_mov_x = (x_mouse2 - $("#chase .sub1").position().left) / 4.0;
      chase_mov_y = (y_mouse2 - $("#chase .sub1").position().top) / 4.0;

      chase_mov_x_aj = Math.abs(chase_mov_x);
      if (chase_mov_x_aj < 0.1) {
        chase_mov_x_aj = 0;
      } else {
        chase_mov_x_aj *= Math.abs(chase_mov_x) / chase_mov_x;
      }

      chase_mov_y_aj = Math.abs(chase_mov_y);
      if (chase_mov_y_aj < 0.1) {
        chase_mov_y_aj = 0;
      } else {
        chase_mov_y_aj *= Math.abs(chase_mov_y) / chase_mov_y;
      }

      $("#chase .sub1").css({
        "left": $("#chase .sub1").position().left + chase_mov_x_aj,
        "top": $("#chase .sub1").position().top + chase_mov_y_aj
      });

      chase_mov_x = (x_mouse2 - $("#chase .sub2").position().left) / 1.5;
      chase_mov_y = (y_mouse2 - $("#chase .sub2").position().top) / 1.5;

      chase_mov_x_aj = Math.abs(chase_mov_x);
      if (chase_mov_x_aj < 0.1) {
        chase_mov_x_aj = 0;
      } else {
        chase_mov_x_aj *= Math.abs(chase_mov_x) / chase_mov_x;
      }

      chase_mov_y_aj = Math.abs(chase_mov_y);
      if (chase_mov_y_aj < 0.1) {
        chase_mov_y_aj = 0;
      } else {
        chase_mov_y_aj *= Math.abs(chase_mov_y) / chase_mov_y;
      }

      $("#chase .sub2").css({
        "left": $("#chase .sub2").position().left + chase_mov_x_aj,
        "top": $("#chase .sub2").position().top + chase_mov_y_aj
      });

      $("#chase_contact .sub1").css({
        "left": $("#chase .sub1").position().left - 5,
        "top": $("#chase .sub1").position().top - 10
      });
    }

    //背景アニメーション
    if (!$("#base .basebg").hasClass("fls") || $("#base .basebg").hasClass("blk")) {
      shiten = [0, 0, basebg_radius * 2.75];

      point[0][0] = basebg_radius * 1.5; //回転半径
      point[0][1] = 0; //初期回転角度
      point[0][3] = mdlH * 0.14; //縦位置

      point[1][0] = basebg_radius * 0.9; //回転半径
      point[1][1] = 45; //初期回転角度
      point[1][3] = mdlH * 0.70; //縦位置

      point[2][0] = basebg_radius * 1.2; //回転半径
      point[2][1] = 90; //初期回転角度
      point[2][3] = mdlH * -0.42; //縦位置

      point[3][0] = basebg_radius * 1.6; //回転半径
      point[3][1] = 135; //初期回転角度
      point[3][3] = mdlH * 0.98; //縦位置

      point[4][0] = basebg_radius * 0.6; //回転半径
      point[4][1] = 180; //初期回転角度
      point[4][3] = mdlH * -0.70; //縦位置

      point[5][0] = basebg_radius * 1.0; //回転半径
      point[5][1] = 225; //初期回転角度
      point[5][3] = mdlH * 0.42; //縦位置

      point[6][0] = basebg_radius * 1.4; //回転半径
      point[6][1] = 270; //初期回転角度
      point[6][3] = mdlH * -0.14; //縦位置

      point[7][0] = basebg_radius * 0.7; //回転半径
      point[7][1] = 315; //初期回転角度
      point[7][3] = mdlH * -0.98; //縦位置

      for (i = 0; i < $("#base .basebg ul li").length; i++) {
        point[i][2] = Math.sin(Math.PI * dgr_clt(degrees + point[i][1]) / 180) * point[i][0]; //横位置
        point[i][4] = Math.cos(Math.PI * dgr_clt(degrees + point[i][1]) / 180) * point[i][0]; //奥位置
        point[i][5] = dst_clt(point[i][2], point[i][3], point[i][4]); //視点との距離
        point[i][6] = shiten[2] / point[i][5] * basebg_scale; //スケール

        $("#base .basebg ul li:eq(" + i + ")").css({
          "left": point[i][2],
          "top": point[i][3],
          "z-index": Math.round(point[i][4]),
          "transform": "scale(" + point[i][6] + ")"
        });
      }

      //傾き
      if (touch_flag == "false") {
        ajst = Math.min(st_count / 500, 1);
        trg = (y_mouse - mdlH) / mdlH * (x_mouse - ctrW) / ctrW * 30 * ajst;
        katamuki = katamuki + (trg - katamuki) / 10;

        if (Math.abs(trg - katamuki) < 0.1) {
          katamuki = trg;
        }

        $("#base .basebg ul").css({
          "transform": "rotate(" + (katamuki) + "deg)"
        });
      }

      degrees = dgr_clt(degrees + 0.4);
    }

    //WORK
    if (resize_mode == "pc" && !$("#base").hasClass("modal_vw")) {
      for (j = 0; j < $("#base .work .subwork ul li.act").length; j++) {
        for (i = 0; i < work_thum_num; i++) {
          if (device != "sp") {
            $("#base .work .subwork ul li.act:eq(" + j + ") .cont .mov .submov .sub:eq(" + i + ") .cnvs").get(0).getContext("2d").drawImage($("#base .work .subwork ul li.act:eq(" + j + ") .cont .mov .submov .sub .vdo").get(0), 0, 0, work_thum_w, work_thum_h);
          } else {
            $("#base .work .subwork ul li.act:eq(" + j + ") .cont .mov .submov .sub:eq(" + i + ") .cnvs").get(0).getContext("2d").drawImage($("#base .work .subwork ul li.act:eq(" + j + ") .cont .mov .submov .sub img").get(0), 0, 0, work_thum_w, work_thum_h);
          }
        }
      }
    }

    st_count++;
  }, 1000 / 30);
}

function dgr_clt(num) {
  return num % 360;
}

function dst_clt(num1, num2, num3) {
  dst1 = Math.sqrt(num1 * num1 + num2 * num2);
  dst2 = num3 - shiten[2];
  dst = Math.sqrt(dst1 * dst1 + dst2 * dst2);
  return dst;
}

function work_more_click(num1, num2) {
  setTimeout(function () { $("#base .work .subwork:eq(" + num1 + ") ul li:eq(" + num2 + ")").addClass("vw"); }, 0.3 * 1000 * (num2 - 3));
}

function work_more_load() {
  for (j = 0; j < $("#base .work .subwork").length; j++) {
    for (i = 3; i < $("#base .work .subwork:eq(" + j + ") ul li").length; i++) {
      url = $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ") .cont .mov .submov .sub:eq(8)").html();
      $("#base .work .subwork:eq(" + j + ") ul li:eq(" + i + ") .cont .mov .submov .sub:eq(8)").html('<video class="vdo" src="' + url + '" playsinline loop muted></video>');
    }
  }
}

function movie_func() {
  $("#base").addClass("modal_vw");
  scroll_flag = "false";
  scroll_y_save = scroll_y = scroll_y2;
  $("#base").css({ "position": "fixed", "top": scroll_y_save * -1 });

  $("#base .modal .mov .vdo").get(0).src = vdo_url[modal_work];
  $("#base .modal .mov .vdo").get(0).load();

  if (touch_flag == "false") {
    $("#chase").addClass("del");

    for (i = 0; i < $("#base .work .subwork ul li.act").length; i++) {
      $("#base .work .subwork ul li.act:eq(" + i + ") .vdo").get(0).pause();
    }
  }

  $("#base .modal").fadeIn({
    duration: 0.6 * 1000, easing: "linear", complete: function () {
      $("#base .modal .mov .vdo").get(0).play();
    }
  });
}

function movie_del() {
  $("#base .modal").fadeOut({
    duration: 0.3 * 1000, easing: "linear", complete: function () {
      $("#base").removeClass("modal_vw");
      scroll_flag = "true";
      $("#base").css({ "position": "static", "top": 0 });
      $("html,body").scrollTop(scroll_y_save);
      scroll_y2 = scroll_y = scroll_y_save;

      modal_work = "null";
      $("#base .modal .mov .vdo").removeClass("vw");
      if (touch_flag == "false") {
        $("#chase").removeClass("del");
        for (i = 0; i < $("#base .work .subwork ul li.act").length; i++) {
          $("#base .work .subwork ul li.act:eq(" + i + ") .vdo").get(0).play();
        }
      }

      $("#base .modal .mov .vdo").get(0).pause();
      $("#base .modal .mov .vdo").get(0).src = "";
      $("#base .modal .mov .vdo").get(0).load();
    }
  });
}

function ancr(num) {
  if ($("#base").hasClass("nvop")) {
    scroll_flag = "true";
    $("#base").removeClass("nvop");
    $("#base").css({ "position": "static", "top": 0 });
    $("html,body").scrollTop(scroll_y_save);
  }

  if (num == 0) { trg_t = 0; }
  else if (num == 1) { trg_t = $("#base .work").position().top - Math.round(winW * 0.05); }
  else if (num == 2) { trg_t = $("#base .feature").position().top + $("#base .feature .hdr").position().top - Math.round(winW * 0.05); }
  else if (num == 3) { trg_t = $("#base .clients").position().top + $("#base .clients .hdr").position().top - Math.round(winW * 0.05); }
  else if (num == 4) { trg_t = $("#base .flow").position().top + mdlH; }
  else if (num == 5) { trg_t = $("#base .news").position().top + $("#base .news .subsec .subsubsec").position().top - Math.round(winW * 0.05); }

  dst = Math.abs(scroll_y - trg_t);
  $("html,body").animate({ scrollTop: trg_t }, { duration: 0.5 * (dst * 0.4 + 1000 * 0.6), easing: "easeOutQuart" });

}