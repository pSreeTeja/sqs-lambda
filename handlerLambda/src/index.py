import requests

def handler():
    url = 'https://randomuser.me/api/'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data= response.json()
        print(data['results'][0])
    except requests.exceptions.RequestException as e:
        print("Error: ",e)