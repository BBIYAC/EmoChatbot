from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from django.views.decorators.csrf import csrf_exempt
from library.df_response_lib import *

from google.cloud import dialogflow
from google.protobuf.json_format import MessageToJson


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def detect_intent_texts(project_id, session_id, text, language_code):
    """Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversation."""
    
    session_client = dialogflow.SessionsClient()

    session = session_client.session_path(project_id, session_id)
    print("Session path: {}\n".format(session))

    text_input = dialogflow.TextInput(text=text, language_code=language_code)

    query_input = dialogflow.QueryInput(text=text_input)

    response = session_client.detect_intent(
        request={"session": session, "query_input": query_input}
    )

    print("=" * 20)
    # print("Query result: {}".format(response.query_result))
    print("Query text: {}".format(response.query_result.query_text))
    print(
        "Detected intent: {} (confidence: {})\n".format(
            response.query_result.intent.display_name,
            response.query_result.intent_detection_confidence,
        )
    )
    fulfillmentMessages = response.query_result.fulfillment_messages
    fulfillmentText = response.query_result.fulfillment_text
    print("fulfillmentMessages: {}\n".format(fulfillmentMessages))

    if fulfillmentText:
        # 인텐트에 데한 리스폰스
        msg = ""
        
        for message in fulfillmentMessages:
            # print(f"message: {message.text.text[0]}")
            msg += str(message.text.text[0]) + " "
        answer = msg
        # print(f"answer: {answer}")
    else:
        # '그래' 답을 했을 경우
        msg = ""
        
        # print(f"msg1: {fulfillmentMessages}")
        # msg += str(fulfillmentMessages) + " "

        # json_string = MessageToJson(fulfillmentMessages)
        
        for message in fulfillmentMessages:
            # message type : <class 'google.cloud.dialogflow_v2.types.intent.Intent.Message'>
            # message.payload type : <class 'proto.marshal.collections.maps.MapComposite'>
            # MessageToJson(message._pb.payload['richContent'][0][0]) type : <class 'str'>
            # eval(MessageToJson(message._pb.payload['richContent'][0][0])) type : <class 'dict'>
            print(f"msg2: {eval(MessageToJson(message._pb.payload['richContent'][0][0]))['text']}")
            print(f"msg3: {eval(MessageToJson(message._pb.payload['richContent'][0][0]))['link']}")
            msg += str(eval(MessageToJson(message._pb.payload['richContent'][0][0]))['text']) + "\n" + str(eval(MessageToJson(message._pb.payload['richContent'][0][0]))['link'])

        answer = msg
   
    return answer

@csrf_exempt
def response(request):
    project_id  = 'emochatbot-aupx'
    session_id = '704c9faa-a2ba-4f3b-e9c6-a394311753f2'
    texts = request.GET.get('msg')
    language_code = 'ko'
    return HttpResponse(detect_intent_texts(project_id, session_id, texts, language_code))


