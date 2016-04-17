var kue = require('kue')
var jobs = kue.createQueue({
  redis: {
    host: '159.203.212.134',
    options: {
      socket_keepalive: true,
      retry_strategy: function (options) {
        return 300
      }
    }
  }
}).watchStuckJobs()

global.jobs = jobs
var facebook = require('./facebook.js')
var slideshow = require('./slideshow.js')

var timesMap = {
  "LCD-Soundsystem_Dance-Yourself-Clean.mp4": [626, 600, 597, 640, 600, 600, 762, 759, 920, 640, 600, 601, 639, 600, 599, 642, 598, 602, 598, 639, 600, 600, 641, 601, 599, 643, 599, 601, 636, 601, 599, 601, 640, 600, 601, 639, 600, 601, 639, 600, 599, 601, 640, 601, 599, 639, 600, 600, 641, 600, 600, 642, 599, 600, 600, 638, 600, 600, 640, 601, 600, 639, 600, 600, 641, 599, 601, 599, 640, 599, 601, 639, 600, 600, 641, 601, 600, 639, 600, 600, 600, 1080, 760, 641, 598, 602, 638, 600, 520, 721, 600, 600, 600, 640, 602, 598, 919, 641, 920, 600, 600, 1079, 600, 561, 518, 761, 760, 642, 558, 642, 920, 759, 759, 923, 640, 917, 560, 644, 1239, 598, 639, 1040, 763, 639, 599, 601, 638, 600, 600, 642, 598, 599, 601, 639, 600, 640, 1043, 758, 641, 601, 598, 640, 599, 601, 599, 921, 640, 921, 599, 601, 1238, 601, 642, 1037, 761, 638, 601, 599, 642, 600, 599, 641, 602, 600, 600, 637, 600, 600, 639, 601, 600, 640, 601, 599, 640, 600, 520, 600, 680, 642, 519, 718, 600, 600, 921, 760, 800, 600, 602, 638, 562, 638, 599, 640, 600, 600, 640, 600, 600, 600, 641, 599, 601, 640, 602, 518, 559, 601, 600, 799, 601, 599, 600, 642, 598, 602, 638, 600, 600, 641, 599, 601, 638, 600, 600, 641, 600, 601, 599, 1080, 759, 640, 601, 599, 640, 602, 599, 640, 601, 599, 601, 639, 600, 600, 920, 922, 637, 600, 600, 1241, 600, 600, 639, 603, 597, 640, 601, 603, 599, 640, 597, 603, 637, 600, 601, 640, 1200, 1239, 601, 599, 639, 600, 1241, 601, 599, 920, 599, 961, 1040, 1400, 600, 600, 639, 600, 601, 640, 600, 600, 642, 598, 602, 918, 599, 641, 599, 600, 643, 597, 602, 638, 600, 599, 642, 599, 600, 600, 640, 602, 600, 638, 600, 600, 640, 599, 601, 640, 601, 599, 599, 641, 600, 600, 642, 598, 602, 637, 600, 600, 642, 599, 599, 601, 642, 600, 599, 639, 599, 600, 641, 600, 599, 640, 601, 599, 601, 919, 640, 601, 599, 640, 601, 599, 920, 642, 598, 601, 599, 641, 601, 601, 758, 919, 800, 600, 600, 639, 600, 601, 599, 642, 599, 601, 640, 600, 600, 919, 761, 639, 600, 759, 600, 642, 600, 600, 638, 601, 600, 602, 640, 597, 602, 639, 599, 603, 638, 599, 600, 643, 757, 924, 597, 759, 761, 639, 600, 761, 601, 637, 763, 599, 601, 758, 640, 600, 602, 638, 599, 601, 639, 600, 602, 918, 640, 600, 601, 599, 641, 880, 640, 601, 639, 600, 599, 640, 601, 599, 601, 640, 600, 600, 600, 639, 600, 600, 600, 640, 600, 643, 599, 601, 637, 600, 599, 641, 600, 600, 640, 601, 599, 601, 640, 600, 600, 640, 600, 601, 638, 761, 1038, 641, 600, 601, 641, 600, 598, 639, 600, 600, 640, 600, 600, 640, 921, 879, 641, 599, 601, 642, 597, 761, 919, 601, 640, 759, 600, 600, 921, 639, 600, 600, 761, 638, 762, 599, 639, 601, 599, 600, 641, 600, 601, 759, 919, 641, 599, 602, 640, 598, 601, 759, 641, 601, 600, 638, 601, 599, 600, 641, 599, 603, 638, 599, 601, 761, 639, 601, 598, 640, 602, 598, 640, 602, 758, 601, 1238, 603, 598, 640, 600, 600, 639, 602, 598, 642, 600, 600, 638, 601, 599, 763, 757, 920, 640, 601, 600, 641, 598, 602, 598, 641, 600, 600, 602, 638, 561, 678, 600, 600, 642, 599, 601, 518, 721, 599, 601, 641, 599, 601, 638, 600, 600, 642, 598, 600, 601, 641, 600, 600, 638, 600, 599, 642, 600, 599, 640, 601, 598, 921, 640, 600, 602, 598, 642, 598, 602, 639, 599, 600, 642, 600, 600, 637, 600, 600, 760, 640, 720, 800, 601, 763, 598, 638, 600, 600, 642, 920, 600, 600, 638, 600, 600, 842, 558, 600, 600, 641, 601, 598, 760, 641, 600, 601, 599, 642, 599, 601, 637, 600, 600, 642, 599, 600, 638, 603, 598, 920, 640, 601, 599, 604, 639, 598, 923, 597, 643, 597, 598, 602, 643, 597, 600, 643, 595, 601, 642, 599, 601, 637, 601, 599, 641, 600, 600, 641, 600, 601, 599, 638, 600, 600, 642, 599, 600, 640, 600, 601, 601, 637, 600, 600, 642, 599, 759, 1080, 599, 642, 600, 600, 639, 761, 1040, 639, 600, 600, 641, 759, 761, 759, 600, 639, 601, 601, 759, 639, 561, 639, 602, 598, 640, 600, 641, 600, 1079, 763, 599, 638, 600, 600, 600, 600, 641, 599, 642, 598, 600, 641, 919, 1200, 600, 642, 599, 601, 638, 600, 599, 643, 598, 602, 637, 601, 599, 601, 1840, 1242, 599, 639, 599, 601, 599, 642, 599, 600, 642, 599, 601, 637, 601, 599, 643, 599, 601, 598, 639, 600, 600, 641, 600, 600, 642, 600, 600, 598, 639, 600, 600, 641, 600, 600, 641, 599, 601, 599, 640, 600, 760, 763, 917, 639, 599, 600, 641, 600, 601],
  "Shakey-Graves_Family-and-Genus.mp4": [12763, 7958, 3479, 8482, 1320, 4239, 561, 518, 520, 520, 559, 522, 519, 560, 520, 520, 519, 521, 560, 521, 519, 802, 518, 520, 800, 561, 519, 520, 561, 520, 519, 521, 560, 519, 799, 521, 520, 1080, 520, 1080, 519, 2121, 519, 520, 561, 522, 797, 520, 1320, 800, 521, 559, 801, 800, 519, 800, 520, 800, 801, 1079, 521, 519, 560, 520, 520, 520, 802, 562, 516, 800, 521, 801, 1078, 762, 1078, 519, 1081, 521, 519, 839, 520, 522, 518, 763, 837, 800, 601, 720, 520, 520, 521, 559, 520, 521, 558, 522, 521, 557, 522, 518, 560, 521, 522, 557, 521, 519, 521, 519, 521, 560, 519, 520, 520, 560, 521, 519, 560, 521, 519, 559, 761, 561, 519, 521, 559, 801, 519, 1081, 519, 800, 523, 517, 560, 760, 560, 640, 1482, 519, 800, 800, 518, 520, 560, 520, 521, 561, 518, 1040, 560, 521, 800, 562, 757, 520, 800, 561, 519, 521, 519, 520, 840, 520, 520, 800, 1040, 842, 1039, 561, 520, 1038, 762, 519, 879, 560, 1001, 518, 521, 522, 558, 520, 560, 520, 520, 523, 556, 521, 523, 518, 559, 519, 800, 800, 521, 560, 519, 520, 520, 560, 521, 519, 560, 522, 518, 521, 519, 560, 521, 519, 523, 560, 520, 520, 558, 519, 520, 521, 1080, 523, 556, 761, 560, 759, 560, 800, 1321, 800, 560, 640, 919, 799, 800, 563, 758, 519, 1081, 520, 522, 558, 562, 517, 520, 522, 520, 522, 516, 840, 760, 561, 522, 557, 522, 678, 640, 800, 520, 520, 560, 521, 519, 800, 800, 521, 961, 918, 800, 521, 519, 522, 559, 521, 520, 522, 556, 522, 800, 2400, 517, 801, 639, 682, 800, 800, 519, 560, 521, 519, 521, 559, 802, 758, 559, 522, 520, 521, 1079, 519, 521, 559, 522, 521, 558, 521, 521, 796, 520, 562, 521, 957, 640, 800, 521, 559, 520, 521, 519, 800, 560, 522, 518, 521, 561, 518, 521, 520, 559, 521, 520, 521, 558, 521, 520, 560, 520, 521, 518, 803, 798, 520, 519, 563, 679, 638, 520, 563, 759, 558, 524, 796, 520, 561, 519, 521, 799, 520, 799, 522, 800, 1080, 520, 800, 559, 520, 1040, 802, 2158, 1842, 518, 800, 1279, 1081, 801, 2321, 1879, 8399, 1520, 1039, 13002, 6518, 1840, 560, 2281, 7398],
  "The-Lumineers_Sleep_on_the_Floor.mp4": [7205, 917, 881, 1720, 919, 879, 1761, 919, 881, 1800, 880, 880, 920, 840, 720, 1961, 801, 958, 600, 1241, 1518, 1081, 879, 722, 1039, 959, 880, 881, 760, 1040, 919, 840, 883, 878, 880, 839, 520, 1320, 1320, 1362, 878, 1760, 880, 920, 679, 521, 520, 521, 1320, 918, 840, 761, 1040, 879, 842, 921, 1799, 878, 723, 1077, 881, 679, 562, 559, 879, 882, 838, 680, 1121, 882, 799, 998, 880, 2681, 880, 3361, 2399, 719, 920, 679, 721, 1079, 721, 879, 763, 558, 839, 1040, 560, 681, 799, 802, 2438, 803, 837, 1600, 840, 1200, 602, 640, 1158, 841, 601, 638, 1000, 601, 1000, 599, 842, 758, 1680, 799, 1001, 840, 601, 1200, 839, 602, 597, 802, 1198, 600, 641, 759, 1680, 600, 600, 1200, 840, 603, 599, 601, 600, 799, 639, 599, 800, 1240, 800, 802, 1638, 800, 800, 800, 841, 800, 800, 799, 840, 2400, 960, 639, 923, 757, 1002, 598, 800, 644, 999, 800, 799, 800, 1601, 677, 560, 1200, 841, 799, 801, 1600, 840, 799, 4880, 2122, 1760, 922, 877, 841, 880, 758, 1080, 882, 760, 1038, 639, 1082, 800, 838, 1880, 800, 1082, 878, 1080, 680, 763, 1877, 923]
}

var tempPath = 'temp'
var imagesPath = 'images'

var commandLineArguments = process.argv.slice(2);
commandLineArguments.forEach(function (arg) {
  var args = arg.split("=")
  if (args.length > 1) {
    switch (args[0]) {
      case "-tempPath":
        tempPath = args[1]
        break;
      case "-imagesPath":
        imagesPath = args[1]
        break;
    }
  }
})

console.log("starting reading from queue")
var errors
jobs.process('slideshows', function (job, done) {
  errors = {}
  var urls = job.data.urls
  var token = job.data.token
  var songPath = job.data.songPath
  console.log("processing token " + job.data.token)
  facebook.getPhotos({token: token, imagesPath: imagesPath}).then(function () {
    console.log("get photos complete")
    return slideshow.create({
      track: "./audio/" + songPath,
      times: timesMap[songPath],
      imagesPath: imagesPath,
      tempPath: tempPath
    }).then(function () {
      console.log("slideshow complete")
      return facebook.uploadVideo({
        outputFile: tempPath + '/output.mp4',
        token: job.data.token
      }).then(function (data) {
        console.log("SUCCESS", data.id)
        console.log("NON_FATAL_ERRORS", errors)
        return done()
      })
    })
  }).fail(function(err) {
    console.log("SLIDESHOW_ERROR", err)
    return done(err)
  })
})

jobs.on('error', function (err) { // listening to error is required to ignore them
  if (isNaN(errors[err])) {
    errors[err] = 1
  } else {
    errors[err]++
  }
})
