var maxWidth = 400

$(function(){
  var canvas = new fabric.Canvas('canvas');
  var $download = $('#download');
  var $text = $('#text');
  var $strokeColor=  $('#stroke-color');
  var $fillColor=  $('#fill-color');
  var lgtmText = null;

  $('input[type=file]').on('change', function(e){
    if(!e.target.files[0]) { return; }

    var imageReader = new FileReader;

    imageReader.onload = function(e){
      var image = new Image;

      image.onload = function(){
        var fabricImage = new fabric.Image(image);
        var aspect = fabricImage.width / fabricImage.height;
        var width = Math.min(image.width, maxWidth)

        fabricImage.set({
          selectable: false,
          width:  width,
          height: width / aspect
        });

        canvas.setWidth(fabricImage.width);
        canvas.setHeight(fabricImage.height);

        lgtmText = new fabric.Text($text.val());
        lgtmText.set({
          fontSize: 64,
          fontFamily: 'Impact',
          stroke: '#000',
          strokeWidth: 2,
          fill: '#fff',
          left: (fabricImage.width - lgtmText.width) / 2,
          top:  (fabricImage.height - lgtmText.height) / 2,
          cornerSize: 6,
          cornerColor: '#6699ff',
          transparentCorners: false
        });

        canvas.clear()
        canvas.add(fabricImage);
        canvas.add(lgtmText);
      };
      image.src = e.target.result;
    };

    imageReader.readAsDataURL(e.target.files[0]);

    $download.attr('download', 'LGTM-' + e.target.files[0].name);
  });

  $download.on('click', function(){
    canvas.deactivateAll().renderAll()
    $download.attr('href', canvas.getElement().toDataURL());
  });

  $text.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setText($text.val());
    canvas.renderAll();
  });

  $strokeColor.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setStroke($strokeColor.val());
    canvas.renderAll();
  });

  $fillColor.on('change', function(){
    if(!lgtmText) { return; }

    lgtmText.setFill($fillColor.val());
    canvas.renderAll();
  });
});
