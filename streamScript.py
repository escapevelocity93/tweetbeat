import tweepy
import json
import sys
from httplib import IncompleteRead

ckey = "KDfNow9K2F0KEHefdkYiXltkk"
csecret = "WIojtsrsPnoao7DuEpuYsZV0pnO9b4ZESr9RyFWZbRXcZLUzBg"
atoken = "805779757845639168-89j3wkrw13UwUJgLeL079jD8vMpWu2p"
asecret = "JKKr9s7s2tR7U5aTEAbrP1eOwEsKSuMYP2ytkihkBhpv1"

OAUTH_KEYS = {'consumer_key': ckey, 'consumer_secret': csecret,
              'access_token_key': atoken, 'access_token_secret': asecret}
auth = tweepy.OAuthHandler(OAUTH_KEYS['consumer_key'], OAUTH_KEYS['consumer_secret'])
api = tweepy.API(auth)


auth.set_access_token(atoken, asecret)
api = tweepy.API(auth)
file = open('today.txt', 'a')

class CustomStreamListener(tweepy.StreamListener):
    def on_status(self, status):
        print status.text

    def on_data(self, data):
        json_data = json.loads(data)
        file.write(str(json_data))

    def on_error(self, status_code):
        print >> sys.stderr, 'Encountered error with status code:', status_code
        return True # Don't kill the stream

    def on_timeout(self):
        print >> sys.stderr, 'Timeout...'
        return True # Don't kill the stream

sapi = tweepy.streaming.Stream(auth, CustomStreamListener())
sapi.filter(track=['christmas'])
