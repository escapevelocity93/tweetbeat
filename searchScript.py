import tweepy
import sys

arg1 = sys.argv[1] #search criteria
arg2 = sys.argv[2] #emotional criteria
arg3 = sys.argv[3] #extras like media filters
arg4 = sys.argv[4] #radius of map search
arg5 = sys.argv[5] #lat of map search
arg6 = sys.argv[6] #lng of map search

ckey = "KDfNow9K2F0KEHefdkYiXltkk"
csecret = "WIojtsrsPnoao7DuEpuYsZV0pnO9b4ZESr9RyFWZbRXcZLUzBg"
atoken = "805779757845639168-89j3wkrw13UwUJgLeL079jD8vMpWu2p"
asecret = "JKKr9s7s2tR7U5aTEAbrP1eOwEsKSuMYP2ytkihkBhpv1"

OAUTH_KEYS = {'consumer_key':ckey, 'consumer_secret':csecret,
 'access_token_key':atoken, 'access_token_secret':asecret}
auth = tweepy.OAuthHandler(OAUTH_KEYS['consumer_key'], OAUTH_KEYS['consumer_secret'])
api = tweepy.API(auth)

for emotion in arg2:
    arg1+=arg2

for extra in arg3:
    arg1+=arg3

geo = ""+arg5+","+arg6+","+arg4+"km"

print geo

cricTweet = tweepy.Cursor(api.search, q=arg1, geocode=geo).items(2)
# trendsTweet = tweepy.Cursor(api.trends_place, id=44544)


for tweet in cricTweet:
   print (tweet.created_at, tweet.text, tweet.lang)

# for tweet in trendsTweet:
#    print (tweet)
