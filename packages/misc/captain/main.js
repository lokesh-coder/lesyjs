const { app, BrowserWindow } = require('electron')
const fixPath = require('fix-path');
const pilot = require('./index')

fixPath();
process.env.FORCE_COLOR = '3';

let splash;

function createWindow () {
     listener=pilot();
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        titleBarStyle: 'hidden',
        show: false,
        webPreferences: {
            devTools:true,
            webSecurity:false,
            nodeIntegration:true,
            contextIsolation:false,
        }
    })
    splash = new BrowserWindow({width: 250, height: 250, transparent: true, frame: false, alwaysOnTop: true, center:true});
    splash.loadFile(`${__dirname}/public/flashscreen.html`)

   setTimeout(()=>{
       splash.destroy();
       win.show();
       win.loadURL('http://localhost:8888/');
       win.focus()
   },3000)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();

    }
})


app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
    app.quit();
})