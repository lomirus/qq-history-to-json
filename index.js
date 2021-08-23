const decoder = new TextDecoder()
const encoder = new TextEncoder()

const data = await Deno.readFile("history.txt");
const text = decoder.decode(data);


const arr = text.split("\n")
const result = [];
let i = 0;

while (i < arr.length) {
    // ================================================================
    i++; // 消息分组:0xFFFF
    const group = arr[i].replace(/^消息分组:(.*)/, "$1")
    i++; // ================================================================
    i++; // 消息对象:Lomirus
    const username = arr[i].replace(/^消息对象:(.*)/, "$1")
    i++ // ================================================================
    i++ //
    i++ // 2020-02-02 11:45:15 USERNAME
    const chatHistory = [];
    while (i < arr.length) {
        let username1 = "";
        let time = "";
        const message = []
        // 2020-02-02 11:45:15 USERNAME
        if (/^20\d\d-\d\d-\d\d \d{1,2}:\d\d:\d\d .*/.test(arr[i])) {
            time = arr[i].replace(/^(20\d\d-\d\d-\d\d \d{1,2}:\d\d:\d\d) .*/, "$1")
            username1 = arr[i].replace(/^20\d\d-\d\d-\d\d \d{1,2}:\d\d:\d\d (.*)/, "$1")
        }
        i++; // MESSAGE
        // 考虑到消息可能存在多行，这里需要进行遍历
        while (i < arr.length) {
            if (
                arr[i] === "" && (
                    /^20\d\d-\d\d-\d\d \d{1,2}:\d\d:\d\d /.test(arr[i + 1]) ||
                    arr[i + 1] === "================================================================"
                )
            ) {
                i++;
                break;
            } else {
                message.push(arr[i]);
                i++;
            }
        }
        chatHistory.push({
            username: username1,
            time: time,
            message: message.join("\n")
        })
        if (arr[i] === "================================================================") {
            break;
        }
    }
    result.push({
        group: group,
        username: username,
        history: chatHistory
    })
}

Deno.writeFile("history.json", encoder.encode(JSON.stringify(result, null, 4)))