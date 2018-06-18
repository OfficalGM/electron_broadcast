const electron = require('electron')
const { app } = electron
const { BrowserWindow } = electron
const ipc = electron.ipcMain
const url = require('url');
const path = require('path');
const express=require('express');
const http =express();
let win
http.use('/',express.static('public'));
ipc.on('start_server', (sys, msg) => {
  console.log(msg)
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
    title: "廣播",
    width: 600,
    height: 600,
    fullscreen: false,
    fullscreenable: false,
    minHeight: 600,
    minWidth: 600,
    maxWidth: 600,
    maxHeight: 600,

  })


  electron.Menu.setApplicationMenu(null);
  win.loadURL(url.format({
    pathname: path.join(process.cwd(), 'index.html'),
    protocol: 'file',
  }));
  win.webContents.openDevTools()

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
