from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# from django.views.decorators.csrf import csrf_exempt
from library.df_response_lib import *

from google.cloud import dialogflow
from google.protobuf.json_format import MessageToJson


def index(request):
    return render(request, 'index.html')

# @csrf_exempt
def response(request):
    project_id  = 'emochatbot-aupx'
    session_id = '704c9faa-a2ba-4f3b-e9c6-a394311753f2' # 별도 저장 필요
    texts = request.GET.get('msg')
    language_code = 'ko'
    return HttpResponse(detect_intent_texts(project_id, session_id, texts, language_code))


# @csrf_exempt
def detect_intent_texts(project_id, session_id, text, language_code):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_id, session_id)

    text_input = dialogflow.TextInput(text=text, language_code=language_code)
    query_input = dialogflow.QueryInput(text=text_input)

    response = session_client.detect_intent(
        request={"session": session, "query_input": query_input}
    )

    print("=" * 50)
    # print("Query result: {}".format(response.query_result))
    userText = response.query_result.query_text
    print("Query text: {}".format(userText))
    print(
        "Detected intent: {} (confidence: {})".format(
            response.query_result.intent.display_name,
            response.query_result.intent_detection_confidence,
        )
    )

    fulfillmentText = response.query_result.fulfillment_text
    fulfillmentMessages = response.query_result.fulfillment_messages

    if fulfillmentText:
        # 인텐트에 데한 리스폰스
        msg = ""
        
        for message in fulfillmentMessages:
            msg += str(message.text.text[0]) + "<br>"
        answer = msg
    else:
        # '그래' 답을 했을 경우 (follow-up Intent)
        msg = ""
        
        for message in fulfillmentMessages:
            ## Type
            # message : <class 'google.cloud.dialogflow_v2.types.intent.Intent.Message'>
            # message.payload : <class 'proto.marshal.collections.maps.MapComposite'>
            # MessageToJson(message._pb.payload['richContent'][0][0]) : <class 'str'>
            # eval(MessageToJson(message._pb.payload['richContent'][0][0])) : <class 'dict'>
            msg += str(eval(MessageToJson(message._pb.payload['richContent'][0][0]))['text']) + "<br>" + str(eval(MessageToJson(message._pb.payload['richContent'][0][0]))['link'])

        answer = msg
    print(f"answer: {answer}")
    # SaveToChatbotDB(userText, answer)
    return answer



# firebase 연동
# def SaveToChatbotDB(user, chatbot):
#     saveData = {
       
#     }
#     return saveData
