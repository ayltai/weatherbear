'use strict';

const { app, ipcMain, nativeImage, nativeTheme, screen, } = require('electron');

const isDev = require('electron-is-dev');
const path  = require('path');

const WINDOW_WIDTH  = 320;
const WINDOW_HEIGHT = isDev ? 830 : 530;

global.IS_DARK_MODE = nativeTheme.shouldUseDarkColors;
global.APP_DIR      = app.getAppPath();

if (isDev) process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

app.commandLine.appendSwitch('disable-web-security');

app.whenReady().then(() => {
    if (isDev) {
        const { default : installExtension, REACT_DEVELOPER_TOOLS, } = require('electron-devtools-installer');

        installExtension(REACT_DEVELOPER_TOOLS).catch(console.error);
    }

    const menubar = require('menubar').menubar({
        index         : isDev ? `http://localhost:${process.env.PORT || 3000}` : require('url').format({
            pathname : path.join(__dirname, 'index.html'),
            protocol : 'file:',
            slashes  : true,
        }),
        icon          : path.join(__dirname, 'img', 'menubarTemplate.png'),
        showDockIcon  : false,
        preloadWindow : true,
        browserWindow : {
            width          : WINDOW_WIDTH,
            height         : WINDOW_HEIGHT,
            resizable      : false,
            webPreferences : {
                allowRunningInsecureContent : true,
                enableRemoteModule          : true,
                nodeIntegration             : true,
                webSecurity                 : false,
            }
        },
    });

    if (isDev) menubar.on('ready', () => menubar.window.webContents.toggleDevTools());

    ipcMain.on('refresh', (event, data) => {
        const icon = path.join(app.getPath('temp'), Math.max(...screen.getAllDisplays().map(display => display.scaleFactor)) > 1 ? 'icon@2x.png' : 'icon.png');

        require('fs').writeFile(icon, nativeImage.createFromDataURL(data.icon).toPNG(), 'binary', error => {
            if (error) {
                console.error(error);
            } else {
                menubar.tray.setImage(nativeImage.createFromPath(icon));
            }
        });

        if (process.platform === 'darwin') menubar.tray.setTitle(data.temperature);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
