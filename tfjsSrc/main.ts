
import * as tf from "@tensorflow/tfjs";

// 训练一个简单模型:
// const model = tf.sequential();
// model.add(tf.layers.dense({units: 100, activation: 'relu', inputShape: [10]}));
// model.add(tf.layers.dense({units: 1, activation: 'linear'}));
// model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

// const xs = tf.randomNormal([100, 10]);
// const ys = tf.randomNormal([100, 1]);

// model.fit(xs, ys, {
//   epochs: 100,
//   callbacks: {
//     onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
//   }
// });

(async () =>
{
    // 创建模型 1维输入1维输出
    let model = tf.sequential();

    model.add(tf.layers.dense({inputShape: [1], units: 1}));
    model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
    model.add(tf.layers.dense({units: 1}));

    // 训练数据
    let trainData = []
    for(let i = 0; i != 100; ++i)
    {
        let horsepower = /* Math.round(Math.random() * 100) */ i
        let dataOne = {
            "horsepower":horsepower,
            "mpg":3 * horsepower + 3,
        }
        trainData.push(dataOne)
    }

    console.log(trainData);
    tf.util.shuffle(trainData);

    const inputs = trainData.map(d => d.horsepower)
    const labels = trainData.map(d => d.mpg)
    // console.log(inputs);
    // console.log(labels);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();  
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();

    const normalizedInputs = inputTensor.div(100);
    const normalizedLabels = labelTensor.div(100);

    let ttdata = {
        inputs: normalizedInputs,
        labels: normalizedLabels,
        inputMax,
        inputMin,
        labelMax,
        labelMin,
    }

    // 准备模型
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ['mse'],
    });

    const batchSize = 32;
    const epochs = 1000;

    normalizedInputs.print()
    normalizedLabels.print()
    
    await model.fit(normalizedInputs, normalizedLabels, {
        batchSize: batchSize,
        epochs: epochs,
        callbacks: {
            // onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
        }
    });
    let xs = tf.tensor1d([99,0,9,50,88])
    let xss = xs.reshape([5, 1]);
    let xsss = xss.div(100)
    const preds = <tf.Tensor>model.predict(xsss);
    const unNormPreds = preds.mul(100);
    let xList = xss.dataSync()
    let pList = unNormPreds.dataSync()
    for(let i in xList)
    {
        console.log(xList[i], pList[i]);
    }
})()