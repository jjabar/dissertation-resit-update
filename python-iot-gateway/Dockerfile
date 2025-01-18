FROM python:3.12.6-alpine3.20

WORKDIR /usr/src/app

# copy requirements.txt into the app directory
COPY requirements.txt .

# upgrade pip
RUN pip install --upgrade pip

# install app dependencies
RUN pip install -r requirements.txt

COPY . .


CMD ["python", "producer.py"]