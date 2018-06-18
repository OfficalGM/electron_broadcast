const electron = require('electron')
const desktopCapturer = electron.desktopCapturer
const electronScreen = electron.screen
const ipc = electron.ipcRenderer;
const fs = require('fs')
const os = require('os')
const path = require('path')


function click_on() {
    let time = document.getElementById("time").value;
    let ip = document.getElementById("ip").value;
    let port = document.getElementById("port").value;
    console.log('index.html', time);
    ipc.send('start_server', [ip, port, time])
    setInterval(capture_desktop,250)
}
function capture_desktop() {
    const thumbSize = determineScreenShotSize()
    let options = { types: ['screen'], thumbnailSize: thumbSize }
    // console.log(thumbSize,options)
    desktopCapturer.getSources(options, function (error, sources) {
        if (error) return console.log(error)
        sources.forEach(function (source) {
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
                const screenshotPath = path.join(process.cwd(), 'public/screenshot.png')
                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), function (error) {
                    if (error) return console.log(error)
                
                })
            }

        })
    })
}
function determineScreenShotSize() {
    const screenSize = electronScreen.getPrimaryDisplay().workAreaSize
    const maxDimension = Math.max(screenSize.width, screenSize.height)
    return {
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio
    }
}

