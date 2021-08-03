from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
#import df_library
from library.df_response_lib import *
from google.api_core.exceptions import InvalidArgument
import os
import ast
import dialogflow

class webAPI:
    def __init__(self,saying):
        self.DIALOGFLOW_PROJECT_ID = 'chatbot-testo-dqoh'
        self.DIALOGFLOW_LANGUAGE_CODE = 'ko-KR'
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./static/chatbot-testo-dqoh-0dd0110b9946.json"
        self.SESSION_ID = 'shinjuno123@gmail.com'
        self.text_to_be_analyzed = saying

    def SendQuestionsAndGetAnswerFromChatBot(self):
        session_client = dialogflow.SessionsClient()
        session = session_client.session_path(self.DIALOGFLOW_PROJECT_ID, self.SESSION_ID)
        text_input = dialogflow.types.TextInput(text=self.text_to_be_analyzed, language_code=self.DIALOGFLOW_LANGUAGE_CODE)
        query_input = dialogflow.types.QueryInput(text=text_input)
        try:    
            response = session_client.detect_intent(session=session, query_input=query_input)
        except InvalidArgument:
            raise
        # print("Query text:", response.query_result.query_text)
        # print("Detected intent:", response.query_result.intent.display_name)
        # print("Detected intent confidence:", response.query_result.intent_detection_confidence)
        print("Fulfillment text:", response.query_result.fulfillment_text)
        return response.query_result.fulfillment_text

    






@csrf_exempt
def index(request):
    if(request.method == "POST"):
        # print(type(ast.literal_eval(request.body.decode('UTF-8'))))
        saying = ast.literal_eval(request.body.decode('UTF-8'))
        response_obj = {}
        response_obj['res'] = webAPI(saying['saying']).SendQuestionsAndGetAnswerFromChatBot()
        return JsonResponse(response_obj)
    return render(request, 'index.html')





'''
      intent="WELCOME"
      chat-title="EmoChatbot"
      agent-id="828613f6-4761-4d79-9ba9-920f4d5f2c6e"
      language-code="ko"
'''
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


