from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
#import df_library
from library.df_response_lib import *
import json

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def webhook(request):
    print('Connected webhook')
    # build a request object
    req = json.loads(request.body)
    # get action from json
    action = req.get('queryResult').get('action')
    # get answer from json
    fulfillmentText = req.get('queryResult').get('fulfillmentText')
    fulfillmentMessages = req.get('queryResult').get('fulfillmentMessages')
    # return a fulfillment message
    # ff_response = fulfillment_response()
    # ff_text = ff_response.fulfillment_text(fulfillmentText)
    # ff_messages = ff_response.fulfillment_messages(fulfillmentMessages)
    # reply = ff_response.main_response(ff_text, ff_messages)
    print('fulfillmentText: {0}'.format(fulfillmentText))
    # return response
    return JsonResponse(fulfillmentText, safe=False)


'''
@csrf_exempt
def webhook(request):
    # build a request object
    req = json.loads(request.body)
    # get action from json
    action = req.get('queryResult').get('action')
    answer = req.get('queryResult').get('fulfillmentText')
    # prepare response for suggestion chips
    if action == 'get_text':
        # set fulfillment text
        fulfillmentText = answer
        aog = actions_on_google_response()
        aog_sr = aog.simple_response([
            [fulfillmentText, fulfillmentText, False]
        ])
        #create suggestion chips
        aog_sc = aog.suggestion_chips(["suggestion1", "suggestion2"])
        ff_response = fulfillment_response()
        ff_text = ff_response.fulfillment_text(fulfillmentText)
        ff_messages = ff_response.fulfillment_messages([aog_sr, aog_sc])
        reply = ff_response.main_response(ff_text, ff_messages)
        print('reply: {0}'.format(reply))
    # return response
    return JsonResponse(reply, safe=False)
'''


