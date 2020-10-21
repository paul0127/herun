//FB SDK載入
window.fbAsyncInit = function () {
  FB.init({
    appId: '310984486334688',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.1',
  })
  FB.AppEvents.logPageView()
}
;(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = '//connect.facebook.net/zh_TW/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')

/*手機版menu*/
document.addEventListener('DOMContentLoaded', () => {
  new Mmenu('#mobile_menu', {
    extensions: ['pagedim-black', 'theme-dark'],
    setSelected: true,
    counters: true,
    navbar: {
      title: "主選單"
    },
    navbars: [
      {
        type: 'tabs',
        content: [
          '<a href="#panel_menu"> <span>主選單</span></a>',
          '<a href="#panel_cart"> <span>購物車</span></a>',
        ],
      },
      {
        content: ['prev', 'breadcrumbs', 'close'],
      },
    ],
  })
})

$(document).ready(function () {
  /*產生選單、搜尋開啟遮幕*/
  let close = `<div class="mobile_menu_close" onclick="javascript:menu_close()"></div>`
  $('body').prepend(close)

  /*向上滑到頂*/
  let goTop = `<div class="go_top" onclick="javascript:go_top()"></div>`
  $('body').prepend(goTop)

  /*首頁banner輪播*/
  if ($('.banner_slider').length) {
    $('.banner_slider').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      autoplay: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    })
  }

  /*首頁最新消息輪播*/
  if ($('.news_slider').length) {
    $('.news_slider').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    })
  }
})

/*更換網址 query */
function changeURLArg(url, arg, arg_val) {
  var pattern = arg + '=([^&]*)'
  var replaceText = arg + '=' + arg_val
  if (url.match(pattern)) {
    var tmp = '/(' + arg + '=)([^&]*)/gi'
    tmp = url.replace(eval(tmp), replaceText)
    return tmp
  } else {
    if (url.match('[?]')) {
      return url + '&' + replaceText
    } else {
      return url + '?' + replaceText
    }
  }
  return url + '\n' + arg + '\n' + arg_val
}

/*切換頁數*/
function pageSet(c) {
  var url = location.href
  window.location.href = changeURLArg(url, 'p', c)
}

/*偵測向上滑動按鈕 超過輪播區塊 才會出現*/
$(window).scroll(function () {
  let win_h = $(document).scrollTop()
  let header_h, overhead_h
  if ($('.slider_block').length) {
    header_h = $('.slider_block').offset().top
    overhead_h = $('.slider_block').height()
  } else {
    header_h = 300
    overhead_h = 0
  }

  if (win_h > header_h + overhead_h - 5) {
    $('.go_top').addClass('active')
  } else {
    $('.go_top').removeClass('active')
  }
})

/*卷軸置頂*/
/*$(document).on('click', '.go_top', function () {
  $('html,body').animate({ scrollTop: 0 }, 900)
})*/
function go_top() {
  $('html,body').animate({ scrollTop: 0 }, 900)
}

/*手機選單開啟關閉*/
/*$(document).on('click', '.mobile_nav', function () {
  $('.mobile_nav').toggleClass('active')
  $('.mobile_menu').toggleClass('active')
  $('.search_bar').removeClass('active')

  menu_close_toggle()
})*/

/*pc版會員、購物車選單開啟關閉*/
$(document).on('click', '.toolbar li.sub a', function () {
  let t = $(this.parentNode).hasClass('active')

  $('.toolbar li.sub').removeClass('active')
  $('.search_bar').removeClass('active')
  if (!t) {
    $(this.parentNode).addClass('active')
  }

  menu_close_toggle()
})

/*搜尋bar開啟關閉*/
$(document).on('click', '.search_btn', function () {
  $('.toolbar li.sub').removeClass('active')
  $('.search_bar').toggleClass('active')
  $('.mobile_nav').removeClass('active')
  $('.mobile_menu').removeClass('active')

  menu_close_toggle()
})

/*判斷遮幕開或關*/
function menu_close_toggle() {
  if (
    $('.search_bar').hasClass('active') ||
    $('.mobile_menu').hasClass('active') ||
    $('.cart_btn.sub').hasClass('active') ||
    $('.user_btn.sub').hasClass('active')
  ) {
    $('.mobile_menu_close').addClass('active')
  } else {
    $('.mobile_menu_close').removeClass('active')
  }
}

/*點擊遮幕關閉選單及搜尋*/
/*$(document).on('click', '.mobile_menu_close', function () {
  $('.mobile_nav').removeClass('active')
  $('.mobile_menu').removeClass('active')
  $('.mobile_menu_close').removeClass('active')
  $('.search_bar').removeClass('active')
})*/
function menu_close() {
  $('.mobile_nav').removeClass('active')
  $('.mobile_menu').removeClass('active')
  $('.mobile_menu_close').removeClass('active')
  $('.search_bar').removeClass('active')
  $('.toolbar li.sub').removeClass('active')
}

/*次選單開啟關閉*/
$(document).on('click', '.side_menu_toggle', function () {
  $('.side_menu').toggleClass('active')
})

/*產品內頁 更換圖片 */
$(document).on('click', '.small_pic li', function () {
  $('.small_pic li').removeClass('active')
  $(this).addClass('active')

  let pic = $(this).data('img')
  $('.product_pic .main_pic')[0].setAttribute('src', pic)
})

/*產品內頁 圖片切換*/
$(document).on('click', '.small_pic_nav div', function () {
  let c = this.className
  let x
  console.log(c)
  if (c !== 'next') {
    x = document.querySelector('.small_pic li.active').previousElementSibling
  } else {
    x = document.querySelector('.small_pic li.active').nextElementSibling
  }
  if (x) {
    $('.small_pic li').removeClass('active')
    $(x).addClass('active')

    let pic = $(x).data('img')
    $('.product_pic .main_pic')[0].setAttribute('src', pic)
  }
})

/*產品內頁 數量增加或減少 n為true=>增加 n為false=>減少*/
function product_qty(n) {
  console.log(this)
  let q = Number($('#qty').val())
  if (n && q < 10) {
    q = q + 1
  } else if (!n && q > 1) {
    q = q - 1
  }
  $('#qty').val(q)
}

/*產品內頁 判斷數量是否為數字 或超出該範圍*/
function check_number(input) {
  var number_input = input.value

  if (!$.isNumeric(number_input)) {
    $('#qty').val(1)
    return
  }

  if (Number(number_input) <= 0) {
    $('#qty').val(1)
    return
  }

  if (Number(number_input) > 100) {
    $('#qty').val(100)
    return
  }
}

/*產品內頁 商品描述tab切換*/
$(document).on('click', '.tab_nav li', function () {
  $('.tab_nav li').removeClass('active')
  $(this).addClass('active')

  $('.tab_panel').removeClass('active')
  let t = '#' + $(this).data('tab')
  $(t).addClass('active')
})

//產品內頁 fb分享
$(document).on('click', '#fbshare', function () {
  FB.ui(
    {
      method: 'share',
      mobile_iframe: true,
      href:
        'https://www.i7fresh.tw/Product/ProductDetail/fd183c95-839c-4df8-be5c-633562227ee6',
    },
    function (response) {
      if (response && !response.error_message) {
        //alert('Posting completed.');
        alert('分享成功')
      } else {
        //alert('Error while posting.');
        //alert('發生錯誤');
      }
    }
  )
})
