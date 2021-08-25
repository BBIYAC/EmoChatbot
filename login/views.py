from django.shortcuts import render

# Create your views here.
def loginView(requests):
    return render(request=requests,template_name='login.html')




def signupView(requests):
    return render(request=requests,template_name="signup.html")