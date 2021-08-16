import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import datetime

now = datetime.datetime.now()
nowTime = now.strftime('%H:%M') # 00:00



def send_email(userEmail):
    # 세션생성, 로그인
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    s.starttls()
    s.login('kiy7833@gmail.com', 'fokueienpaaiyknl')

    # 제목, 본문 작성
    msg = MIMEMultipart()
    msg['Subject'] = 'Emo Chatbot'
    msg.attach(MIMEText('EmoChatbot을 확인해주세요! \nhttps://bit.ly/3CJmddc', 'plain'))

    # 파일첨부 (파일 미첨부시 생략가능)
    # attachment = open('파일명', 'rb')
    # part = MIMEBase('application', 'octet-stream')
    # part.set_payload((attachment).read())
    # encoders.encode_base64(part)
    # part.add_header('Content-Disposition', "attachment; filename= " + filename)
    # msg.attach(part)

    # 메일 전송
    s.sendmail("kiy7833@gmail.com", userEmail, msg.as_string())
    s.quit()



# DB에서 현재 시간과 사용자가 지정한 알림 시간이 같으면 사용자의 Email 가져오기
def check_send_time():
    # userTime
    userTime = "23:00" # DB에서 가져오기
    # userEmail
    userEmail = "dlsdud1757@naver.com" # DB에서 가져오기

    if nowTime == userTime:
        send_email(userEmail)

# 크론탭 실행
check_send_time()

