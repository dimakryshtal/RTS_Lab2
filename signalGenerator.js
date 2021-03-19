const n = 6
const w = 2100
const N = 2048



const getSignal = () => { 
    const x = []
    while(x.length != N) {
        x.push({y: 0})
    }

    for(let i = 0; i < n; i++) {
        const omega = w/n * (i + 1);
        const A = Math.random();
        const Fi = Math.random();

        for(let t = 0; t < N; t++) {
            x[t].y += A * Math.sin(omega * t + Fi)
        }
    }
    
    return x
} 

const complexNumber = () => {
    return {real:0, im: 0}
}


const discreteFourier = (signals) => {
    const result = []
    const start = Date.now()
    for (let p = 0; p < N; p++) {
        let num = complexNumber()
        for(let k = 0; k < N; k++) {
            num.real += signals[k].y * Math.cos(2 * Math.PI * p * k / N)
            num.im -= signals[k].y * Math.sin(2 * Math.PI * p * k / N) 
        }
        result.push({y: Math.sqrt(Math.pow(num.im, 2) + Math.pow(num.real, 2))})
    }
    const end = Date.now()
    //console.log(result)
    console.log(`Discrete fourier: ${end - start}`)
    return result
}    

const fastFourier = (signal) => {
    const result = [];
    result.length = N;
    const start = Date.now()
    for(let p = 0; p < N/2; p++) {
        let even = complexNumber()
        let odd = complexNumber()
        for(let k = 0; k < N/2; k++) {
            even.real += signal[2*k].y * Math.cos(2 * Math.PI * p * 2*k / N);
            even.im -= signal[2*k].y * Math.sin(2 * Math.PI * p * 2*k / N);
            odd.real += signal[2*k + 1].y * Math.cos(2 * Math.PI * p * (2*k + 1) / N);
            odd.im -= signal[2*k + 1].y * Math.sin(2 * Math.PI * p * (2*k + 1) / N);
        }
        result[p] = {y: Math.sqrt((even.real + odd.real) ** 2 + (even.im + odd.im) ** 2)};
        result[N/2 + p] = {y: Math.sqrt((even.real - odd.real) ** 2 + (even.im - odd.im) ** 2)};
    }
    const end = Date.now()
    console.log(`Fast Fourier: ${end - start}`)
    console.log(result)
    return result
}

//ADDITIONAL TASK
const discreteFourierTable = (signals) => {
    const result = []
    const start = Date.now()
    let table = []
    for(let i = 0; i < N; i++) {
        table.push({cos: Math.cos(2*Math.PI * i/N), sin: Math.sin(2*Math.PI * i/N)})
    }

    for (let p = 0; p < N; p++) {
        let num = complexNumber()
        for(let k = 0; k < N; k++) {

            num.real += signals[k].y * table[p*k % N].cos
            num.im -= signals[k].y * table[p*k % N].sin 
        }
        result.push({y: Math.sqrt(Math.pow(num.im, 2) + Math.pow(num.real, 2))})
    }
    const end = Date.now()
   console.log(`Discrete fourier table: ${end - start}`)
   //console.log(result)
    return result
}
const signal = getSignal()
discreteFourier(signal)
discreteFourierTable(signal)

