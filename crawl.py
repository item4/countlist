import json
import re

from lxml.html import document_fromstring
from requests import get

non_number = re.compile('\D')

document_html = get('http://item4.net/?layout=countlist').text
document = document_fromstring(document_html)

rows = document.cssselect('table.tablesorter tbody tr')

data = []

for index, row in enumerate(rows):
    data.append({
        'id': index,
        'status': row[1].text,
        'category': row[2].text,
        'title': row[3].text,
        'series': row[4].text or row[3].text,
        'start': row[5].text,
        'watched': int(non_number.sub('', row[6].text) or -1),
        'total': int(non_number.sub('', row[7].text) or -1),
        'score': int(non_number.sub('', row[8].text) or 0),
        'r19': 'r19' in row[9].attrib.get('class', '').split(' '),
        'comment': row[9].text,
    })

with open('data.json', 'w') as f:
    f.write(json.dumps(data))
