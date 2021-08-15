import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import datetime

# now = datetime.datetime.now()
# nowTime = now.strftime('%H:%M') # 12:11


def notice_with_email():
    # 세션생성, 로그인
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.ehlo()
    s.starttls()
    s.login('kiy7833@gmail.com', 'fokueienpaaiyknl')

    # 제목, 본문 작성
    msg = MIMEMultipart()
    msg['Subject'] = 'Send Test'
    msg.attach(MIMEText('파이썬으로 이메일 보내기 테스트', 'plain'))

    # 파일첨부 (파일 미첨부시 생략가능)
    # attachment = open('파일명', 'rb')
    # part = MIMEBase('application', 'octet-stream')
    # part.set_payload((attachment).read())
    # encoders.encode_base64(part)
    # part.add_header('Content-Disposition', "attachment; filename= " + filename)
    # msg.attach(part)

    # 메일 전송
    s.sendmail("kiy7833@gmail.com", "dlsdud1757@naver.com", msg.as_string())
    s.quit()

# if nowTime == "20:09":
#     notice_with_email()


def reply():
    print("This is cron test")