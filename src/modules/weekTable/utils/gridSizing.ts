import { scaleHorizontal, size } from "../../../Utils";


interface IGrid {
    width: number;
    height: number;
}

export class Grid implements IGrid {
    private _diff = scaleHorizontal(13);
    private _offset = scaleHorizontal(5);
    private _wight!: number;
    private _height!: number;
    private _hours = ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "Noon", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"];

    constructor(screenWidth: number) {
        this._wight = (screenWidth / 8) - this._offset;
        this._height = (screenWidth / 8) + this._diff - this._offset;
    }

    get width() {
        return this._wight;
    }

    get height() {
        return this._height;
    }
    get hours() {
        return this._hours;
    }

};

export const grid = new Grid(size.width);