## Usage

```bash
deno run -A index.js -f history.txt
```

The output file will be named as `history.txt.json`, located at the same directory of input file.

## Example

Input:

```
消息记录（此消息记录为文本格式，不支持重新导入）

================================================================
消息分组:Homo
================================================================
消息对象:野獣先輩
================================================================

2019-08-10 11:45:14 野獣先輩
[图片]

2020-02-02 11:45:14 野獣先輩
[图片]
良い世、来いよ

================================================================
消息分组:Master
================================================================
消息对象:飞翔的企鹅
================================================================

2020-09-12 21:49:19 飞翔的企鹅
你好

2020-09-12 21:49:54 沃兹基
你好

2020-09-12 21:50:23 飞翔的企鹅
再见

2020-09-12 21:51:07 沃兹基
再见

```

Output:

```json
[
    {
        "group": "Homo",
        "username": "野獣先輩",
        "history": [
            {
                "username": "野獣先輩",
                "time": "2019-08-10 11:45:14",
                "message": "[图片]"
            },
            {
                "username": "野獣先輩",
                "time": "2020-02-02 11:45:14",
                "message": "[图片]\n良い世、来いよ"
            }
        ]
    },
    {
        "group": "Master",
        "username": "飞翔的企鹅",
        "history": [
            {
                "username": "飞翔的企鹅",
                "time": "2020-09-12 21:49:19",
                "message": "你好"
            },
            {
                "username": "沃兹基",
                "time": "2020-09-12 21:49:54",
                "message": "你好"
            },
            {
                "username": "飞翔的企鹅",
                "time": "2020-09-12 21:50:23",
                "message": "再见"
            },
            {
                "username": "沃兹基",
                "time": "2020-09-12 21:51:07",
                "message": "再见\n"
            }
        ]
    }
]
```