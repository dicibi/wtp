import youtube_dl
import os
from dotenv import load_dotenv
from flask import (
  Flask,
  jsonify,
  request
)

load_dotenv()

app = Flask(__name__)
yt = youtube_dl.YoutubeDL()
KEY = os.getenv('KEY')


# extract data youtube
class ExtractData:
  """
    filter data youtube to only get necessary data
  """

  def filter_formats(self, formats):
    res = []
    try:
      for i in formats:
        res.append({
          "id": i["format"],
          "url": i["fragment_base_url"] if i.get("fragment_base_url") else i["url"],
          "size": i["filesize"],
          "ext": i["ext"]
        })
    except Exception as e:
      print(e)
    return res

  def filter_data(self, data):
    try:
      return {
        "formats": self.filter_formats(data["formats"]),
        "thumbnail": data["thumbnail"],
        "title": data["title"],
        "uploader": data["uploader"]
      }
    except Exception as e:
      print(e)
      return "error filter data\n"


@app.route("/convertPdf")
def downloadYt():
  try:
    data = request.args
    
    return data
    key = data.get('key', '')
    linkyt = data.get('q', '').replace('"','').replace('\\','')
    if key != KEY:  
      return 'Not Allowed\n'
    else:  
      data = yt.extract_info(linkyt, download=False)
      return ExtractData().filter_data(data)
  except Exception as e:
    os.system(f"{e}")
    return "Error extract data\n"  #str(e)
  
  
# POST ERROR IN WINDOWS
# @app.route("/youtube", methods=['POST','GET'])
# def downloadYt():
#   if request.method == 'POST':
#     try:
#       data = request.form.to_dict()
#       key = data['key']
#       linkyt = data['q'].replace('"','').replace('\\','')
#       os.system(f"echo key: {key}, q: {linkyt}")
#       if key != KEY:  
#         return 'Not Allowed\n'
#       else:  
#         data = yt.extract_info(linkyt, download=False)
#         return ExtractData().filter_data(data)
#     except Exception as e:
#       os.system(f"{e}")
#       return "Error extract data\n"  #str(e)
#   else:
#     return "only accept post data\n"


if __name__ == "__main__":
  app()