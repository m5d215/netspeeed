FROM python:alpine

RUN pip install speedtest-cli && \
    apk --no-cache add curl

COPY entrypoint.sh /bin/entrypoint.sh

ENV NETSPEEED_USER=
ENV CRON="30 * * * *"
ENV API_URL=

ENTRYPOINT ["/bin/entrypoint.sh"]
