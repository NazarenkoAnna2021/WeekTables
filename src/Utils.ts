import { Platform, Dimensions, PixelRatio } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { initialWindowMetrics, Metrics } from 'react-native-safe-area-context';

export class Utils {
    private idealWidth: number = 375;
    private idealHeight: number = 812;
    private initialWindow!: Metrics;
    private _isIOS: boolean = Platform.OS === 'ios';
    private _size: { width: number, height: number } = Dimensions.get('window');
    private _ratio: number = PixelRatio.getFontScale();


    get isIOS() {
        return this._isIOS;
    }

    get size() {
        return { ...this._size };
    }

    get getFrameHeight() {
        const initialWindow = this.getInitialWindowMetrics;
        return initialWindow.frame.height - initialWindow.insets.bottom - initialWindow.insets.top;
    }

    getVersion = () => {
        const version = DeviceInfo.getVersion();
        return version;
    }

    getBuild = () => {
        const build = DeviceInfo.getBuildNumber();
        return build;
    }

    get getInitialWindowMetrics() {
        if (this.initialWindow) {
            return this.initialWindow;
        } else if (initialWindowMetrics) {
            this.initialWindow = initialWindowMetrics;
            return this.initialWindow;
        } else {
            const { width, height } = Dimensions.get('window');
            return { frame: { height, width, x: 0, y: 0 }, insets: { bottom: 0, left: 0, right: 0, top: 0 } };
        }
    }

    declOfNum = (number: number, translates: [string, string, string]): string => {
        const newNumber = number % 10;
        if (number > 10 && number < 20) {
            return translates[2];
        }
        if (newNumber > 1 && newNumber < 5) {
            return translates[1];
        }
        if (newNumber === 1) {
            return translates[0];
        }
        return translates[2];
    };

    /* Scale */

    scaleHorizontal = (inWidth: number = 1): number => {
        const delimiter: number = this.idealWidth / inWidth;
        return this._size.width / delimiter;
    };

    scaleVertical = (inHeight: number = 1) => {
        const delimiter: number = this.idealHeight / inHeight;
        return this._size.height / delimiter;
    };

    scaleFontSize = (fontSize: number = 1): number => {
        const divisionRatio: number = this.idealWidth / (fontSize / this._ratio);
        return this._size.width / divisionRatio;
    };

    scaleLineHeight = (lineHeight: number = 1): number => {
        const divisionRatio: number = this.idealHeight / (lineHeight / this._ratio);
        return this._size.height / divisionRatio;
    };

}

const utils = new Utils();

export const {
    scaleHorizontal,
    scaleVertical,
    scaleFontSize,
    scaleLineHeight,
    size,
    getInitialWindowMetrics,
    isIOS,
 } = utils;