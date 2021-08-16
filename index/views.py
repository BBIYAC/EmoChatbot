from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from django.views.decorators.csrf import csrf_exempt
from library.df_response_lib import *

from google.cloud import dialogflow
from google.protobuf.json_format import MessageToJson
from google.api_core.exceptions import InvalidArgument
import ast

from deepface import DeepFace
import os


@csrf_exempt
def index(request):
    if(request.method == "POST"):
        msgText = ast.literal_eval(request.body.decode('UTF-8'))
        response_obj = {}
        response_obj['res'] = webAPI(msgText['msgText']).detect_intent_text()
        return JsonResponse(response_obj)
    return render(request, 'index.html')
    

class webAPI:
    def __init__(self, msgText):
        self.project_id  = 'emochatbot-aupx'
        self.session_id = '704c9faa-a2ba-4f3b-e9c6-a394311753f2' # 별도 저장 필요
        self.text = msgText
        self.language_code = 'ko-KR'


    def detect_intent_text(self):
        session_client = dialogflow.SessionsClient()
        session = session_client.session_path(self.project_id, self.session_id)
        text_input = dialogflow.TextInput(text=self.text, language_code=self.language_code)
        query_input = dialogflow.QueryInput(text=text_input)

        try:    
            response = session_client.detect_intent(
            request={"session": session, "query_input": query_input}
            )
        except InvalidArgument:
            raise
        
        print("=" * 50)
        userText = response.query_result.query_text
        print("Query text: {}".format(userText))

        fulfillmentText = response.query_result.fulfillment_text
        fulfillmentMessages = response.query_result.fulfillment_messages

        if fulfillmentText:
            # 인텐트에 데한 리스폰스
            msg = ""
            
            for message in fulfillmentMessages:
                msg += str(message.text.text[0]) + "<br>"
            answer = msg
        else:
            # 리스폰스가 Text가 아닐 경우(링크)
            msg = ""
            
            for message in fulfillmentMessages:
                ## Type
                # message : <class 'google.cloud.dialogflow_v2.types.intent.Intent.Message'>
                # message.payload : <class 'proto.marshal.collections.maps.MapComposite'>
                # MessageToJson(message._pb.payload['richContent'][0][0]) : <class 'str'>
                # eval(MessageToJson(message._pb.payload['richContent'][0][0])) : <class 'dict'>
                msg += str(eval(MessageToJson(message._pb.payload['richContent'][0][0]))['text']) + "<br>" + str(eval(MessageToJson(message._pb.payload['richContent'][0][0]))['link'])

            answer = msg
        print(f"Response: {answer}")
        print(
            "Detected intent: {} (confidence: {})".format(
                response.query_result.intent.display_name,
                response.query_result.intent_detection_confidence,
            )
        )
        return answer


@csrf_exempt
def emotion_analysis(request):
    if(request.method == "POST"):
        msgImg = request.body.decode('utf-8')
        img_path = msgImg
        demography = DeepFace.analyze('data:image/jpeg;base64,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')
        # including angry, fear, neutral, sad, disgust, happy and surprise
        emotion = demography['dominant_emotion']
        response_obj = {}
        response_obj['res']=emotion
        return JsonResponse(response_obj)
    return render(request, "index.html")