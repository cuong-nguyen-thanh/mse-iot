
(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

$(document).ready(function() {

  //TODO check LED status by call api

  $('.login').submit(function( event ) {
    event.preventDefault();
    $.post('/login', $(this).serializeFormJSON(), function(res){
      $('#message').html('');
      if (!res.success) {
        $('#message').html(res.message);
      } else {
	$('#message').html('Login Success!');      
      }
    })
  });

  $('.led-on-off').click(function() {
    var turnOn = $('#led-on').css('display') == 'none';
    if (turnOn) {
      $('.main-led').addClass('active');
    } else {
      $('.main-led').removeClass('active');
    }

		$('#led-on, #led-off').toggle();
  });


  //chart
  var ctx = document.getElementById("tempChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["1h", "2h", "3h", "4h", "5h", "6h"],
          datasets: [
            {
              label: '#1',
              data: [12, 19, 3, 5, 2, 3],
              lineTension: 0,
              fill: false,
              borderWidth: 1,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointStyle: 'rectRot'
            },
            {
              label: '#2',
              data: [5, 10, 13, 2, 16, 20],
              lineTension: 0,
              fill: false,
              borderWidth: 1,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              pointStyle: 'rectRot'
            },
          ]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      }
  });
});
