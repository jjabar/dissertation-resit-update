import time
import json
from datetime import datetime
from data_generator import generate_message
from kafka import KafkaProducer


#message will be serialized as JSON
def serializer(message):
    return json.dumps(message).encode("utf-8")

# Kafka producer for running outside docker
producer = KafkaProducer(
    bootstrap_servers=[ "localhost:9092"],
    value_serializer = serializer
) 

    
if __name__ == '__main__':
    # infinite loop --runs until you kill the program
    while True:
        # generate a message
        dummy_message = generate_message()
        # send it to our "messages"  topic
        print(f'producing message @ {datetime.now()} | Message = {str(dummy_message)}')
        producer.send('messages', dummy_message)
       

        #sleep for a random number of seconds
        time_to_sleep = 60
        time.sleep(time_to_sleep)