# EmoChatbot
TEST_LINK : https://emochatbot.herokuapp.com/


## Django 실행 방법
1. Repository 가져오기
  ```
  git clone [REPO_URL]
   ```
2. 가상환경 생성 
  ```
  python -m venv myvenv
  ```
3. 가상환경 실행(window) 
  ```
  source myvenv/Scripts/activete
  ```
4. 패키지 설치 
  ```
  pip install -r requirements.txt
  ```
5. makemigrations
  ```
  python manage.py makemigrations
  ```
6. migrate
  ```
  python manage.py migrate
  ```
7. 장고 서버 실행
   ```
   python manage.py runserver
   ```


## 배포 준비
### 1. settings.py
- DEBUG 수정
  ```
  # DEBUG = True 
  DEBUG = bool( os.environ.get('DJANGO_DEBUG', True) )
  ```

- SECRET_KEY 수정
  ```
  import os 
  # SECRET_KEY = '[YOUR_SECRET_KEY]'
  SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', '[YOUR_SECRET_KEY]')
  ```


### 2. Heroku 배포
- 회원가입
  https://www.heroku.com

- 로그인
  ```
  heroku login
  ```  

- 저장소 생성
  ```
  heroku create 저장소이름
  ```

- push
  ```
  git push heroku main
  ```
  
- migrate
  ```
  heroku run python manage.py migrate
  ```

- 배포한 파일 실행
  ```
  heroku open
  ```
