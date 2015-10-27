import json
import re

from lxml.html import document_fromstring
from requests import get

non_number = re.compile('\D')

document_html = get('http://item4.net/?layout=countlist').text
document = document_fromstring(document_html)

rows = document.cssselect('table.tablesorter tbody tr')

data = []

for row in rows:
    data.append({
        'status': row[1].text,
        'category': row[2].text,
        'title': row[3].text,
        'series': row[4].text,
        'start': row[5].text,
        'watched': int(non_number.sub('', row[6].text) or -1),
        'total': int(non_number.sub('', row[7].text) or -1),
        'score': int(non_number.sub('', row[8].text) or 0),
        'class': row[9].attrib.get('class', None),
        'commant': row[9].text,
    })

with open('data.json', 'w') as f:
    f.write(json.dumps(data))
