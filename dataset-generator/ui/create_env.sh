# using this because i'm with a static html file and i want dynamic api_url based on evaluate-service ip
# using hostname doesn't works because docker's name conversion doesn't works on client's machine
# sorry for this
api_url=`getent hosts evaluate-service | awk '{ print $1 }'`

echo "const api_url = \"http://$api_url:3333\"; export default api_url;" > api_url.js