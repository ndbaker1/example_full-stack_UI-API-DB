import requests, re

def add(*numbers):
    if (len(numbers) == 2):
        response = requests.get('http://localhost:3000/math?var1={}&var2={}'.format(numbers[0], numbers[1]))
        if (response.ok):
            print ( response.json()["answer"] )
    else:
        print('ADD ERROR:: wrong number of arguements')
func_dict = {
    "add": add
}

def help_prompt():
    print ('functions:')
    for func in func_dict:
        print('\t{}'.format(func))
    print ('\'q\' to exit')

func_dict['help'] = help_prompt

print('~ api function interpretter live ~')
function = input('> ')
while(function != "q"):
    function = re.split(' +', function)
    args = function[1:]
    function = function[0]
    if (function in func_dict):
        func_dict[function](*args)
    else:
        print ('FUNCTION ERROR:: function not found')
    function = input('> ')