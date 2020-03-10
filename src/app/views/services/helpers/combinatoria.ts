export class Combinatoria {
    combinatoria;
    constructor(
        ...elemsParaLaCombinatoria: { data: (string | number)[], nombre: string; }[]
    ) {
        const [head, ...tail] = elemsParaLaCombinatoria.map(this.toArrayDeObjectos);
        this.combinatoria = tail.reduce((arrayFinal, elemActual) => {
            return arrayFinal.map(elem =>
                elemActual.map(otroElem => ({ ...elem, ...otroElem }))
            ).flat();
        }, head);
    }

    private toArrayDeObjectos({ data, nombre }): object[] {
        // transforma cada elemento de la combinatoria en un array de objectos con el nombre correcspondiente
        return data.map(e => ({ [nombre]: e }));
    }

    agregarPropiedades(propiedades: { [key: string]: (string | number); }) {
        this.combinatoria = this.combinatoria.map(comb => ({ ...comb, ...propiedades }));
    }

    mergeBy(identificadores: string[], data: any[]) {
        this.combinatoria = this.combinatoria.map(comb => {
            const elemRepetido = data.find(d => identificadores.every(i => d[i] === comb[i]));
            return elemRepetido ? elemRepetido : comb;
        });
    }
}