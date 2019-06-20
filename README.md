# netspeeed

## Installation

**WIP**

### API

```sh
git clone https://github.com/m5d215/netspeeed.git
cd netspeeed
sls deploy
```

### Client

```sh
git clone https://github.com/m5d215/netspeeed.git
cd netspeeed/client
docker image build -t m5d215/netspeeed:client .
docker container run \
    -d \
    --name netspeeed-client \
    -e NETSPEEED_USER=xxxxxx \
    -e CRON='30 * * * *' \
    -e API_URL='https://xxx.amazonaws.com/dev' \
    m5d215/netspeeed:client
```
