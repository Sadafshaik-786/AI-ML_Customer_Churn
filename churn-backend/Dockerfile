FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
ENV ALLOWED_ORIGINS="*"
EXPOSE 8000

CMD ["bash", "start.sh"]
