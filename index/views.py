from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from django.views.decorators.csrf import csrf_exempt
from library.df_response_lib import *
import json, requests

def get_answer(text):
    data_send = { 
        "queryInput":{
        "text":{
            "text": text,
            "languageCode" :"ko"
        }
        }
    }

    MY_AUTH_TOKEN="Bearer ya29.a0ARrdaM_MeKOc2fn0dtDuWt9eMFsc6UYIcNGwS1mZnLBN41fqKyQHYw7Y9MAzYEoJMIWXdQHFevey8qy79Qnhy9FvLI3SQjRdFxRDb4XK3TZyM7nxtq_aaBE7Twgxu_vZQJ05IATyxHOylTxc2qbev-arN7lZxPkyf0GDMWUmoDBHQu3nJ_zCF_e8idB-d584OgjkRXCRvRslpRcc-TZKfA8Qa5u9kmr0drEDhXftuezu-ws"
    
    data_header = {
        'Authorization': MY_AUTH_TOKEN,
        'Content-Type': 'application/json; charset=utf-8'
    }

    dialogflow_url = 'https://dialogflow.clients6.google.com/v2beta1/projects/emochatbot-aupx/locations/global/agent/sessions/704c9faa-a2ba-4f3b-e9c6-a394311753f2:detectIntent'
    res = requests.post(dialogflow_url, data=json.dumps(data_send), headers=data_header)

    if res.status_code != requests.codes.ok:
        return '오류가 발생했습니다.'
    else:
        data_receive = res.json()
        answer = data_receive['queryResult']['fulfillmentText']
        print(f"answer : {answer}")
        return JsonResponse(str(answer), safe=False)


def index(request):
    return render(request, 'index.html')

# @csrf_exempt
# def webhook(request):
#     print('Connected webhook')
#     # build a request object
#     req = json.loads(request.body)
#     print(f"req: {req}")
#     # get action from json
#     action = req.get('queryResult').get('action')
#     # get fulfillment from json
#     fulfillmentText = req.get('queryResult').get('fulfillmentText')
#     fulfillmentMessages = req.get('queryResult').get('fulfillmentMessages')
#     # return a fulfillment message
#     ff_response = fulfillment_response()
#     ff_text = ff_response.fulfillment_text(fulfillmentText)
#     ff_messages = ff_response.fulfillment_messages(fulfillmentMessages)
#     reply = ff_response.main_response(ff_text, ff_messages)
#     print('reply: {0}'.format(reply))
#     # return response
#     return JsonResponse(reply, safe=False)

@csrf_exempt
def webhook(request):
    print(f"request: {request}")
    content = request.GET.get('content')
    print(f"content: {content}")
    result =  get_answer(content)
    print(f"re : {result}")





