import random
import string
from datetime import datetime

""" user_ids = list(range(1, 101))
recipient_ids = list(range(1, 101)) """

points = [[50.150874, 14.563832], [50.104217, 14.4757], [49.966785, 14.370114], [50.073802, 14.402783], [49.944036, 14.44569], [49.959517, 14.391878], [49.988219, 14.544117], [50.066673, 14.613868], [49.94696, 14.462611], [50.129684, 14.334411], [50.08892, 14.303301], [50.066749, 14.417668], [50.075101, 14.53634], [50.064396, 14.263388], [50.055027, 14.38642], [50.160055, 14.584758], [50.040627, 14.283248], [50.042484, 14.638717], [50.138972, 14.309488], [50.151947, 14.469412], [50.000437, 14.406288], [50.177643, 14.467332], [50.083176, 14.569287], [50.029644, 14.412903], [50.155166, 14.480961], [49.954799, 14.554184], [50.042168, 14.223561], [50.151349, 14.565225], [50.07656, 14.663827], [50.110211, 14.261647], [49.98352, 14.341426], [50.13142, 14.555974], [50.007052, 14.598136], [50.105399, 14.488696], [50.096282, 14.626482], [50.113605, 14.626768], [49.952213, 14.53148], [50.058545, 14.458349], [50.016023, 14.508792], [50.071948, 14.589867], [50.106051, 14.360603], [50.020599, 14.425797], [50.064876, 14.572056], [50.118254, 14.556321], [50.065982, 14.232], [50.045452, 14.217889], [50.135366, 14.335496], [50.120126, 14.633857], [50.16258, 14.41], [49.949706, 14.433877], [49.992574, 14.299198], [49.999167, 14.509118], [49.967147, 14.458644], [50.157903, 14.462958], [50.029415, 14.378698], [50.063549, 14.357676], [50.006606, 14.244327], [50.164178, 14.452357], [49.97892, 14.3269], [50.149529, 14.3472], [50.168217, 14.436196], [50.128047, 14.313571], [50.098681, 14.489209], [50.07064, 14.516238], [50.016935, 14.612858], [50.040573, 14.546343], [49.996446, 14.615458], [50.063094, 14.561846], [50.013674, 14.38807], [50.120068, 14.568918], [50.002958, 14.606296], [50.171301, 14.521588], [50.11462, 14.644043], [50.134498, 14.391158], [50.115566, 14.507894]]

temperatures = [37, 37.1, 37.2, 37.3, 37.4, 37.5, 37.6, 37.7, 37.8,  37.9, 38, 38.1, 38.2, 38.3, 38.4, 38.5, 38.6, 38.8, 38.8,  38.9, 39,  39.1, 39.2, 39.3, 39.4, 39.5, 39.6, 39.9, 39.9,  39.9, 40]

heartbeat = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]

""" def generate_message() -> dict: 
    random_user_id  = random.choice(user_ids)
    random_location = random.choice(points)
    # copy the recipients array
    recipient_ids_copy = recipient_ids.copy()
    
    # user can't send message to himself
    recipient_ids_copy.remove(random_user_id)
    random_recipient_id = random.choice(recipient_ids_copy)

    # generate random message
    message = ''.join(random.choice(string.ascii_letters) for i in range(32))

    return {
        'user_id': random_user_id,
        'recipient_id': random_recipient_id,
        'message': message
    } """

def generate_message() -> dict: 
    
    

    # generate random message
    message = ''.join(random.choice(string.ascii_letters) for i in range(32))

    return [ 
        {
            "sensorTag": "sensor0001",
            'slug': message,
            "longitude":  random.choice(points)[1],
            "latitude":  random.choice(points)[0],
            "temperature": random.choice(temperatures),
            "heartbeat": random.choice(heartbeat),
            "timestamp": str(datetime.now())
        },
        {
            "sensorTag": "sensor0002",
            'slug': message,
            "longitude":  random.choice(points)[1],
            "latitude":  random.choice(points)[0],
            "temperature": random.choice(temperatures),
            "heartbeat": random.choice(heartbeat),
            "timestamp": str(datetime.now())
        },
        {
            "sensorTag": "sensor0003",
            'slug': message,
            "longitude":  random.choice(points)[1],
            "latitude":  random.choice(points)[0],
            "temperature": random.choice(temperatures),
            "heartbeat": random.choice(heartbeat),
            "timestamp": str(datetime.now())
        },
        {
            "sensorTag": "sensor0004",
            'slug': message,
            "longitude":  random.choice(points)[1],
            "latitude":  random.choice(points)[0],
            "temperature": random.choice(temperatures),
            "heartbeat": random.choice(heartbeat),
            "timestamp": str(datetime.now())
        },
        {
            "sensorTag": "sensor0005",
            'slug': message,
            "longitude":  random.choice(points)[1],
            "latitude":  random.choice(points)[0],
            "temperature": random.choice(temperatures),
            "heartbeat": random.choice(heartbeat),
            "timestamp": str(datetime.now())
        },
        
    ]

 # Testing
""" if __name__ == '__main__':
    print(generate_message())   """