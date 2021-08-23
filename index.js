import { parse } from "https://deno.land/std@0.104.0/flags/mod.ts";

const args = parse(Deno.args)

if (!args.f) Deno.exit()

const decoder = new TextDecoder()
const encoder = new TextEncoder()

const file = await Deno.readFile(args.f);
const lines = decoder
    .decode(file)
    .split("\r\n")

const result = [];

for (let i = 2; i < lines.length;) {
    // ================================================================
    i++; // 消息分组:0xFFFF
    const group = lines[i].replace(/^消息分组:(.*)/, "$1")
    i++; // ================================================================
    i++; // 消息对象:Lomirus
    const username = lines[i].replace(/^消息对象:(.*)/, "$1")
    i++ // ================================================================
    i++ //
    i++ // 2020-02-02 11:45:15 USERNAME
    const chatHistory = [];
    while (i < lines.length) {
        let username1 = "";
        let time = "";
        const message = []
        // 2020-02-02 11:45:15 USERNAME
        if (/^20\d\d-\d\d-\d\d \d{1,2}:\d\d:\d\d .*/.test(lines[i])) {
            time = lines[i].replace(/^(20\d\d-\d\d-\d\d \d{1,2}:\d\d:\d\d) .*/, "$1")
            username1 = lines[i].replace(/^20\d\d-\d\d-\d\d \d{1,2}:\d\d:\d\d (.*)/, "$1")
        }
        i++; // MESSAGE
        // 考虑到消息可能存在多行，这里需要进行遍历
        while (i < lines.length) {
            if (
                lines[i] === "" && (
                    /^20\d\d-\d\d-\d\d \d{1,2}:\d\d:\d\d /.test(lines[i + 1]) ||
                    lines[i + 1] === "================================================================"
                )
            ) {
                i++;
                break;
            } else {
                message.push(lines[i]);
                i++;
            }
        }
        chatHistory.push({
            username: username1,
            time: time,
            message: message.join("\n")
        })
        if (lines[i] === "================================================================") {
            break;
        }
    }
    result.push({
        group: group,
        username: username,
        history: chatHistory
    })
}

Deno.writeFile(`${args.f}.json`, encoder.encode(JSON.stringify(result, null, 4)))