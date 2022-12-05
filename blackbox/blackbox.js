const blackbox = async (data, cap) => {
    let five = []
    let eight = []
    let thirteen = []

    let bought = false
    let bprice = 0
    let bqunatity = 0

    let table = []
    let net_profit = 0

    for (let i = 0; i < data.length; i++) {
        let Close = parseFloat(data[i].Close)
        if (five.length == 5) five.shift();
        five.push(Close);

        if (eight.length == 8) eight.shift();
        eight.push(Close);

        if (thirteen.length == 13) thirteen.shift();
        thirteen.push(Close);

        let green = average(five); //green=5
        let red = average(eight); //red=8
        let blue = average(thirteen); //blue=13

        if (!bought && green > red && red > blue) {
            let quantity = Math.floor(cap / Close)
            table.push({
                signal: "buy",
                date: data[i].Date,
                price: Close,
                quantity: quantity
            })
            bought = true
            bprice = Close
            bqunatity = quantity
            cap -= bqunatity * Close
        }
        else if (bought && (green <= red || red <= blue)) {
            table.push({
                signal: "sell",
                date: data[i].Date,
                price: Close,
                profit: Close - bprice,
                quantity: bqunatity
            })
            net_profit += (Close - bprice) * bqunatity
            bought = false
            bprice = 0
            cap += (Close - bprice) * bqunatity
        }

    }

    let last = data.pop()
    if (bought) {
        table.push({
            signal: "sell",
            date: last.Date,
            price: last.Close,
            profit: last.Close - bprice,
            quantity: bqunatity
        })
        net_profit += (last.Close - bprice) * bqunatity
        bought = false
        bprice = 0
        cap += (last.Close - bprice) * bqunatity
    }

    return { "order_signal": table, "net_profit": net_profit, "rcap": cap }
}

const average = (arr) => {
    let sum = 0;
    for (let index = 0; index < arr.length; index++) {
        sum += arr[index];
    }
    return sum / arr.length;
}

module.exports = blackbox