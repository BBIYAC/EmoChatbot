# EmoChatbot
TEST_LINK : https://emochatbot.herokuapp.com/


## 실행 방법
1. ```git clone [REPO_URL] ```
2. 가상환경 생성 ```python -m venv myvenv```
3. 가상환경 실행(window) ```source myvenv/Scripts/activete```
4. 패키지 설치 ```pip install -r requirements.txt```
5. ```python manage.py makemigrations```
6. ```python manage.py migrate```
7. 실행 ```python manage.py runserver```


## Heroku 배포
#### 1. settings.py
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


#### 2. Heroku 회원가입
https://www.heroku.com

#### 3. 로그인
```heroku login```

#### 4. 저장소 생성
```heroku create 저장소이름```

#### 5. push
```git push heroku main```

#### 6. migrate
```heroku run python manage.py migrate```

#### 7. 배포한 파일 실행
```heroku open```
