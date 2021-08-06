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
        demography = DeepFace.analyze(img_path)
        # including angry, fear, neutral, sad, disgust, happy and surprise
        emotion = demography['dominant_emotion']
        print(f"emotion: {emotion}")
        response_obj = {}
        response_obj['res']=emotion
        return JsonResponse(response_obj)
    return render(request, "index.html")