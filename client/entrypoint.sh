#!/bin/sh

set -e
set -u

# requires
[ -n "$CRON" ]
[ -n "$API_URL" ]
[ -n "$NETSPEEED_USER" ]

echo "$CRON speedtest-cli --json | curl -X POST $API_URL/users/$NETSPEEED_USER/netspeeed -d @-" >/var/spool/cron/crontabs/root
exec crond -f -d 8
