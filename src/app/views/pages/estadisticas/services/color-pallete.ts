export class ColorPalette {
    constructor(private nroColores: number) { }
    ultimoIndice = -1;
    colors = [
        '#1c84c6',
        '#1ab394',
        '#23c6c8',
        '#ed5565',
        '#f6db5f',
        '#FCB5B5',
        '#f8ac59',
        '#087E8B',
        '#ECB0E1',
        '#C9DDFF',
        '#C0C781',
        '#DEB986',
        '#F7B05B',
    ];
    proximoColor() {
        this.ultimoIndice = (this.ultimoIndice > this.nroColores - 1) ? 0 : this.ultimoIndice + 1;
        return this.colors[this.ultimoIndice];
    }
}