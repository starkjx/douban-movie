var top250 = {
  init: function(){
    this.$element = $('#top250');
    this.$container = this.$element.find('.container');
    this.$main = this.$element.parents('main');
    this.bind();
    this.start();
    this.isLoading = false;
    this.index = 0;
    this.isFinish = false;
  },
  bind: function(){
    var _this = this;
    this.$element.on('scroll', function(){
      console.log('scrolling');
    });
    // var _this = this;
    // _this.$main.scroll(function(){
    //   if(_this.isToBottom(_this.$container, _this.$main) && !_this.isLoading && !_this.isFinish){
    //     console.log('toBottom');
    //     _this.start();
    //   }
    // });
  },
  start: function(){
    var _this = this;
    this.getData(function(data){
      _this.render(data);
    });
  },
  getData: function(callback){
    var _this = this;
    if(_this.isLoading) return;
    _this.isLoading = true;
    _this.$element.find('.loading').show();
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',
      type: 'GET',
      data: {
        start: _this.index||0,
        count: 20
      },
      dataType: 'jsonp'
    }).done(function(ret){
      // console.log(ret);
      // setData(ret);
      _this.index += 20;
      console.log(_this.index);
      if(_this.index >= ret.total){
        _this.isFinish = true;
      }
      callback&&callback(ret);
    }).fail(function(){
      console.log('error...');
    }).always(function(){
      _this.isLoading = false;
      _this.$element.find('.loading').hide();
    });
  },
  render: function(data){
    var _this = this;
    data.subjects.forEach(function(movie){
      var tpl = 
      `<div class="item">
        <a href="#">
          <div class="cover">
            <img src="" alt="">
          </div>
          <div class="detail">
            <h2></h2>
            <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
            <div class="extra"><span class="year"></span> / <span class="type"></span></div>
            <div class="extra">导演：<span class="director"></span></div>
            <div class="extra">主演：<span class="actor"></span></div>
          </div>
        </a>
      </div>`
      var $node = $(tpl)
      $node.find('a').attr('href',movie.alt);
      $node.find('.cover img').attr('src',movie.images.medium);
      $node.find('.detail h2').text(movie.title);
      $node.find('.score').text(movie.rating.average);
      $node.find('.collect').text(movie.collect_count);
      $node.find('.year').text(movie.year);
      $node.find('.type').text(movie.genres.join(' / '));
      $node.find('.director').text(function(){
        var directorsArr = [];
        movie.directors.forEach(function(item){
          directorsArr.push(item.name);
        });
        return directorsArr.join(' 、');
      });
      $node.find('.actor').text(function(){
        var actorArr = [];
        movie.casts.forEach(function(item){
          actorArr.push(item.name);
        });
        return actorArr.join(' 、');
      });
      _this.$container.append($node);
    });
  },
  isToBottom: function($viewport,$content){
    return $viewport.height() <= Math.ceil($content.height() + $content.scrollTop() + 10);
  }
}

var usBox = {
  init: function(){
    this.$element = $('#beimei');
    this.$container = this.$element.find('.container');
    this.start();
  },
  start: function(){
    var _this = this;
    this.getData(function(data){
      _this.render(data);
    });
  },
  getData: function(callback){
    var _this = this;
    if(_this.isLoading) return;
    _this.isLoading = true;
    _this.$element.find('.loading').show();
    $.ajax({
      url: 'http://api.douban.com/v2/movie/us_box',
      dataType: 'jsonp'
    }).done(function(ret){
      console.log(ret);
      callback&&callback(ret);
    }).fail(function(){
      console.log('error...');
    }).always(function(){
      _this.$element.find('.loading').hide();
    });
  },
  render: function(data){
    var _this = this;
    data.subjects.forEach(function(movie){
      movie = movie.subject;
      var tpl = 
      `<div class="item">
        <a href="#">
          <div class="cover">
            <img src="" alt="">
          </div>
          <div class="detail">
            <h2></h2>
            <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
            <div class="extra"><span class="year"></span> / <span class="type"></span></div>
            <div class="extra">导演：<span class="director"></span></div>
            <div class="extra">主演：<span class="actor"></span></div>
          </div>
        </a>
      </div>`
      var $node = $(tpl)
      $node.find('a').attr('href',movie.alt);
      $node.find('.cover img').attr('src',movie.images.medium);
      $node.find('.detail h2').text(movie.title);
      $node.find('.score').text(movie.rating.average);
      $node.find('.collect').text(movie.collect_count);
      $node.find('.year').text(movie.year);
      $node.find('.type').text(movie.genres.join(' / '));
      $node.find('.director').text(function(){
        var directorsArr = [];
        movie.directors.forEach(function(item){
          directorsArr.push(item.name);
        });
        return directorsArr.join(' 、');
      });
      $node.find('.actor').text(function(){
        var actorArr = [];
        movie.casts.forEach(function(item){
          actorArr.push(item.name);
        });
        return actorArr.join(' 、');
      });
      _this.$container.append($node);
    });
  }
}

var search = {
  init: function(){
    this.$element = $('#search');
    this.$container = this.$element.find('.container');
    this.isFinish = false;
    this.isLoading = false;
    this.bind();
  },
  bind: function(){
    var _this = this;
    this.$element.find('.search-area .button').on('click',function(){
      console.log('click');
      _this.getData(function(data){
        console.log(data);
        _this.render(data);
      });
    });
  },
  getData: function(callback){
    var _this = this;
    var keyword = this.$element.find('.search-area input').val();
    console.log(keyword);
    this.isLoading = true;
    _this.$element.find('.loading').show();
    $.ajax({
      url: 'http://api.douban.com/v2/movie/search',
      data: {
        q: keyword
      },
      dataType: 'jsonp'
    }).done(function(ret){
      console.log(ret);
      _this.isLoading = false;
      callback(ret);
    }).fail(function(){
      console.log('error...');
    }).always(function(){
      _this.$element.find('.loading').hide();
    });
  },
  render: function(data){
    var _this = this;
    data.subjects.forEach(function(item){
      var tpl = 
      `<div class="item">
        <a href="#">
          <div class="cover">
            <img src="" alt="">
          </div>
          <div class="detail">
            <h2></h2>
            <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
            <div class="extra"><span class="year"></span> / <span class="type"></span></div>
            <div class="extra">导演：<span class="director"></span></div>
            <div class="extra">主演：<span class="actor"></span></div>
          </div>
        </a>
      </div>`
      var $node = $(tpl)
      $node.find('a').attr('href',item.alt);
      $node.find('.cover img').attr('src',item.images.medium);
      $node.find('.detail h2').text(item.title);
      $node.find('.score').text(item.rating.average);
      $node.find('.collect').text(item.collect_count);
      $node.find('.year').text(item.year);
      $node.find('.type').text(item.genres.join(' / '));
      $node.find('.director').text(function(){
        var directorsArr = [];
        item.directors.forEach(function(item){
          directorsArr.push(item.name);
        });
        return directorsArr.join(' 、');
      });
      $node.find('.actor').text(function(){
        var actorArr = [];
        item.casts.forEach(function(item){
          actorArr.push(item.name);
        });
        return actorArr.join(' 、');
      });
      _this.$container.append($node);
    });
  }
}

var app = {
  init: function(){
    this.$tabs = $('footer>div');
    this.$panels = $('section');
    this.bind();

    top250.init();
    usBox.init();
    search.init();

  },
  bind: function(){
    var _this = this
    this.$tabs.on('click',function(){
      console.log('click');
      $(this).addClass('active').siblings().removeClass('active');
      _this.$panels.eq($(this).index()).fadeIn().siblings().hide();
    });
  }
};

app.init();



/*
$('footer>div').click(function(){
  var index = $(this).index();
  $('section').hide().eq(index).fadeIn();
  $(this).addClass('active').siblings().removeClass('active')
});

var index = 0;
var isLoading = false;
start();

function start(){
  if(isLoading) return;
  isLoading = true;
  $('.loading').show();
  $.ajax({
    url: 'http://api.douban.com/v2/movie/top250',
    type: 'GET',
    data: {
      start: index,
      count: 20
    },
    dataType: 'jsonp'
  }).done(function(ret){
    console.log(ret);
    setData(ret);
    index += 20;
    console.log(index);
  }).fail(function(){
    console.log('error...');
  }).always(function(){
    isLoading = false;
    $('.loading').hide();
  });
}



var clock;
$('main').scroll(function(){
  if(clock){
    clearTimeout(clock);
  }
  clock = setTimeout(function(){
    if($('section').eq(0).height() -10 <= Math.ceil($('main').scrollTop()) + $('main').height()){
      console.log('end');
      start();
    }
  }, 300);
  
});



function setData(data){
  data.subjects.forEach(function(movie){
    var tpl = 
    `<div class="item">
      <a href="#">
        <div class="cover">
          <img src="" alt="">
        </div>
        <div class="detail">
          <h2></h2>
          <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
          <div class="extra"><span class="year"></span> / <span class="type"></span></div>
          <div class="extra">导演：<span class="director"></span></div>
          <div class="extra">主演：<span class="actor"></span></div>
        </div>
      </a>
    </div>`
    var $node = $(tpl)
    $node.find('.cover img').attr('src',movie.images.medium);
    $node.find('.detail h2').text(movie.title);
    $node.find('.score').text(movie.rating.average);
    $node.find('.collect').text(movie.collect_count);
    $node.find('.year').text(movie.year);
    $node.find('.type').text(movie.genres.join(' / '));
    $node.find('.director').text(function(){
      var directorsArr = [];
      movie.directors.forEach(function(item){
        directorsArr.push(item.name);
      });
      return directorsArr.join(' 、');
    });
    $node.find('.actor').text(function(){
      var actorArr = [];
      movie.casts.forEach(function(item){
        actorArr.push(item.name);
      });
      return actorArr.join(' 、');
    });
    $('#top250').eq(0).append($node);
  });
}
*/