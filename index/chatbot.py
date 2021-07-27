# -*- encoding: utf-8 -*-

import requests
import json

def get_answer(text, user_key):

    data_send = { 
        'query': text,
        'sessionId': user_key,
        'lang': 'ko',
    }

    data_header = {
        'Authorization': 'Bearer c781ff2d85b68b6ce7f04770ad5d894a97ee635f',
        'Content-Type': 'application/json; charset=utf-8'
    }


    dialogflow_url = 'https://api.dialogflow.com/v1/query?v=20150910'

    res = requests.post(dialogflow_url, data=json.dumps(data_send), headers=data_header)


    if res.status_code != requests.codes.ok:
        return '오류가 발생했습니다.'


    data_receive = res.json()
    answer = data_receive['result']['fulfillment']['speech'] 

    return answer


def webhook():
    content = request.args.get('content')
    userid = request.args.get('userid')
    return get_answer(content, userid)

