#target photoshop
app.bringToFront();

(function () {
  function safeTimestamp() {
    var d = new Date();
    function pad(n){ return (n<10?'0':'')+n; }
    return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())+'_'+pad(d.getHours())+'-'+pad(d.getMinutes())+'-'+pad(d.getSeconds());
  }

  // UI
  var dlg = new Window('dialog', 'Batch Resize & Center-Crop Export PNGs');
  dlg.alignChildren = 'fill';
  dlg.add('statictext', undefined, 'Source folder:');
  var srcGroup = dlg.add('group'); srcGroup.orientation='row';
  var srcPath = srcGroup.add('edittext', undefined, ''); srcPath.characters = 40;
  var srcBtn = srcGroup.add('button', undefined, 'Browse');
  srcBtn.onClick = function () {
    var f = Folder.selectDialog('Select source folder');
    if (f) srcPath.text = f.fsName;
  };

  dlg.add('statictext', undefined, 'Destination folder:');
  var dstGroup = dlg.add('group'); dstGroup.orientation='row';
  var dstPath = dstGroup.add('edittext', undefined, ''); dstPath.characters = 40;
  var dstBtn = dstGroup.add('button', undefined, 'Browse');
  dstBtn.onClick = function () {
    var f = Folder.selectDialog('Select destination folder');
    if (f) dstPath.text = f.fsName;
  };

  dlg.add('statictext', undefined, 'Sizes (comma separated, WIDTHxHEIGHT) e.g. 800x600,1200x800:');
  var sizesInput = dlg.add('edittext', undefined, '800x600,1200x800'); sizesInput.characters = 40;

  dlg.add('statictext', undefined, 'Filename appendage (e.g. _v2) — will be added before extension:');
  var appendInput = dlg.add('edittext', undefined, '_resized'); appendInput.characters = 20;

  var interlaceCheckbox = dlg.add('checkbox', undefined, 'Interlaced PNG');
  interlaceCheckbox.value = false;

  // progress bar
  dlg.add('statictext', undefined, 'Progress:');
  var progressBar = dlg.add('progressbar', undefined, 0, 100);
  progressBar.preferredSize = [400, 20];

  var statusText = dlg.add('statictext', undefined, '');

  var btnGroup = dlg.add('group'); btnGroup.alignment = 'right';
  var runBtn = btnGroup.add('button', undefined, 'Run');
  btnGroup.add('button', undefined, 'Cancel');

  function parseSizes(sText) {
    var parts = sText.split(',');
    var out = [];
    for (var i=0; i<parts.length; i++) {
      var p = parts[i].replace(/\s+/g,'');
      if (p.length === 0) continue;
      var m = p.match(/^(\d+)x(\d+)$/i);
      if (m) out.push({w: parseInt(m[1],10), h: parseInt(m[2],10)});
    }
    return out;
  }

  function centerCropTo(doc, targetW, targetH) {
    var origW = doc.width.as('px');
    var origH = doc.height.as('px');
    var scale = Math.max(targetW / origW, targetH / origH);
    var newW = Math.round(origW * scale);
    var newH = Math.round(origH * scale);
    doc.resizeImage(UnitValue(newW,'px'), UnitValue(newH,'px'), null, ResampleMethod.BICUBICSHARPER);
    var left = Math.round((newW - targetW) / 2);
    var top = Math.round((newH - targetH) / 2);
    var right = left + targetW;
    var bottom = top + targetH;
    doc.crop([UnitValue(left,'px'), UnitValue(top,'px'), UnitValue(right,'px'), UnitValue(bottom,'px')]);
  }

  function writeLogSafe(dstFolder, lines) {
    var ts = safeTimestamp();
    var names = ['batch-resize-log-' + ts + '.txt', 'batch-resize-log.txt'];
    for (var i=0;i<names.length;i++) {
      try {
        var lf = new File(dstFolder.fsName + '/' + names[i]);
        lf.encoding = 'UTF8';
        if (lf.open('w')) {
          lf.writeln('Batch Resize & Crop Log - ' + new Date());
          for (var li=0; li<lines.length; li++) lf.writeln(lines[li]);
          lf.close();
          return lf.fsName;
        }
      } catch(e) {
        // try next name
      }
    }
    return null;
  }

  runBtn.onClick = function () {
    runBtn.enabled = false;

    var srcFolder = Folder(srcPath.text);
    var dstFolder = Folder(dstPath.text);
    if (!srcFolder || !srcFolder.exists) { alert('Invalid source folder'); runBtn.enabled = true; return; }
    if (!dstFolder || !dstFolder.exists) { alert('Invalid destination folder'); runBtn.enabled = true; return; }

    var sizes = parseSizes(sizesInput.text);
    if (sizes.length === 0) { alert('No valid sizes parsed. Use WIDTHxHEIGHT, comma separated.'); runBtn.enabled = true; return; }

    var append = appendInput.text || '';
    var interlaced = interlaceCheckbox.value;

    var files = srcFolder.getFiles(/\.(png|jpg|jpeg|tif|tiff|psd)$/i);
    if (files.length === 0) { alert('No image files found in source folder'); runBtn.enabled = true; return; }

    var logLines = [];
    function log(msg) { logLines.push(msg); statusText.text = msg; }

    var totalTasks = files.length * sizes.length;
    var doneTasks = 0;
    progressBar.value = 0;

    // quick write-permission test
    try {
      var testFile = new File(dstFolder.fsName + '/.ps_write_test');
      if (testFile.open('w')) { testFile.writeln('test'); testFile.close(); testFile.remove(); }
      else { alert('Cannot write to destination folder. Check permissions.'); runBtn.enabled = true; return; }
    } catch (e) {
      alert('Cannot write to destination folder. Check permissions.'); runBtn.enabled = true; return;
    }

    for (var i=0; i<files.length; i++) {
      var file = files[i];
      try {
        log('Opening: ' + file.name + ' (' + (i+1) + '/' + files.length + ')');
        var doc = open(file);
      } catch (e) {
        log('ERROR opening ' + file.name + ': ' + e);
        doneTasks += sizes.length;
        progressBar.value = Math.round((doneTasks/totalTasks)*100);
        continue;
      }

      try {
        if (doc.mode != DocumentMode.RGB) doc.changeMode(ChangeMode.RGB);
        if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) {
          try { doc.bitsPerChannel = BitsPerChannelType.EIGHT; } catch(e) { log('WARN bits change failed: ' + e); }
        }
        var baseName = doc.name.replace(/\.[^\.]+$/, '');

        for (var s=0; s<sizes.length; s++) {
          var target = sizes[s];
          var working = null;
          try {
            working = doc.duplicate();
            log('Resizing & cropping ' + baseName + ' -> ' + target.w + 'x' + target.h);
            centerCropTo(working, target.w, target.h);

            var pngOpts = new PNGSaveOptions();
            pngOpts.interlaced = interlaced;

            var sizeSuffix = (sizes.length > 1) ? ('_' + (s+1)) : '';
            var outFile = new File(dstFolder.fsName + '/' + baseName + append + sizeSuffix + '.png');

            var finalOut = outFile;
            var count = 1;
            while (finalOut.exists) {
              finalOut = new File(dstFolder.fsName + '/' + baseName + append + sizeSuffix + '_' + count + '.png');
              count++;
            }

            working.saveAs(finalOut, pngOpts, true, Extension.LOWERCASE);
            working.close(SaveOptions.DONOTSAVECHANGES);
            log('Saved: ' + finalOut.name);
          } catch (errSave) {
            log('ERROR processing ' + baseName + ' size ' + target.w + 'x' + target.h + ': ' + errSave);
            try { if (working) working.close(SaveOptions.DONOTSAVECHANGES); } catch(_) {}
          }
          doneTasks++;
          progressBar.value = Math.round((doneTasks/totalTasks)*100);
          dlg.update();
        }
        doc.close(SaveOptions.DONOTSAVECHANGES);
      } catch (e) {
        log('ERROR processing ' + file.name + ': ' + e);
        try { doc.close(SaveOptions.DONOTSAVECHANGES); } catch(_) {}
        doneTasks += sizes.length;
        progressBar.value = Math.round((doneTasks/totalTasks)*100);
        dlg.update();
      }
    }

    var written = writeLogSafe(dstFolder, logLines);
    if (!written) alert('Processing complete but failed to write log file.');
    else alert('Done. ' + files.length + ' files processed. Log written to: ' + written);

    dlg.close();
  };

  if (dlg.show() != 2) { /* closed/cancelled */ }
})();
