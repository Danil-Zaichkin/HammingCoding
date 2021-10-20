function isDegreeOfTwo(n) {
    while (n % 2 === 0) {
        n /= 2
    }
    return n === 1;

}

function calcCodeBits(data, countCodeBits) {
    let masOfCodeBits = new Array(countCodeBits)

    for (let i = 0; i < masOfCodeBits.length; i++) {
        masOfCodeBits[i] = 0
    }

    let masOfIndex = new Array(data.length)

    for (let i = 0; i < masOfIndex.length; i++) {
        masOfIndex[i] = i + 1
    }
    let codeBit = 0
    for (let i = 0; i < masOfCodeBits.length; i++) {
        for (let j = 0; j < masOfIndex.length; j++){
            codeBit += (masOfIndex[j] % 2) * data[j]
            masOfIndex[j] = Math.floor(masOfIndex[j] / 2)
        }
        masOfCodeBits[i] = codeBit % 2
        codeBit = 0
    }
    return masOfCodeBits
}

function code() {
    let message = document.getElementById('inputData').value
    let inputData = message.split('')
    for (let i = 0; i < inputData.length; i++) {
        inputData[i] = inputData[i] * 1
    }

    let countCodeBits = 0
    while (Math.pow(2, countCodeBits) < inputData.length + countCodeBits + 1) {
        countCodeBits++
    }

    let codedData = new Array(inputData.length + countCodeBits)
    let counter = 0

    for (let i = 0; i < codedData.length; i++) {
        if (isDegreeOfTwo(i+1)) {
            codedData[i] = 0
        } else {
            codedData[i] = inputData[counter]
            counter++
        }
    }
    let masOfCodedBits = calcCodeBits(codedData, countCodeBits)

    counter = 0
    for (let i = 0; i < codedData.length; i++) {
        if (isDegreeOfTwo(i+1)) {
            codedData[i] = masOfCodedBits[counter]
            counter++
        }
    }

    document.getElementById('codedData').value = codedData.join('')

}

function decode() {
    let codedData = document.getElementById('codedData').value
    let countCodeBits = 0
    while (Math.pow(2, countCodeBits) < codedData.length + 1) {
        countCodeBits++
    }
    let positionOfErr = calcCodeBits(codedData, countCodeBits)
    let tmp = ''

    for (let i = positionOfErr.length - 1; i > -1; i--) {
        tmp += positionOfErr[i].toString()
    }
    tmp = parseInt(tmp, 2)
    let tmpData = document.getElementById('codedData').value.split('')
    for (let i = 0; i < tmpData.length; i++) {
        tmpData[i] = tmpData[i] * 1
    }
    tmpData[tmp-1] = (tmpData[tmp-1] + 1) % 2

    let decodedData = new Array()

    for (let i = 0; i < tmpData.length; i++) {
        if (!isDegreeOfTwo(i+1))
            decodedData.push(tmpData[i])
    }

    document.getElementById('decodedData').value = decodedData.join('')
    if (tmp !== 0) {
        alert('Error found in position ' + tmp.toString())
    } else {
        alert('Error not found')
    }
}