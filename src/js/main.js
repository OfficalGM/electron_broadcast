const electron = require('electron')
const { app } = electron
const { BrowserWindow } = electron
const ipc = electron.ipcMain
const url = require('url');
const path = require('path');
const express=require('express');

let win


ipc.on('start_server', (sys, msg) => {
  console.log(msg)
  const http =express();
  http.use('/',express.static('public'));
  let ip = msg[0]
  let port = msg[1]
  http.get('/', function(req, res) {
    

  });
  http.listen(7070, function () {
    console.log('Example app listening on port 7070!');
  });
  
})


function createWindow() {
  win = new BrowserWindow({
    title: "螢幕廣播",
    width: 1000,
    height: 800,
    fullscreen: false,
    fullscreenable: false,
    minHeight: 600,
    minWidth: 600,
    maxWidth: 600,
    maxHeight: 600,
    webPreferences:{
      nodeIntegration:false,
      preload:__dirname+'/preload.js'
    }

  })

 
  electron.Menu.setApplicationMenu(null);
  win.loadURL(url.format({
    pathname: path.join(process.cwd(), 'dist/index.html'),
    protocol: 'file',
  }));
  // win.webContents.openDevTools()

  win.on('close', () => {
    win = null
  })

}
app.on('ready', createWindow)

app.on('window-all-cloased', () => {
  if (process.platform !== 'drawin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
