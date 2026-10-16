import glob

OLD = 'style="height:50px;width:50px;max-width:50px;object-fit:contain;flex-shrink:0;"'
NEW = 'style="height:58px;width:58px;max-width:58px;object-fit:contain;flex-shrink:0;"'

for f in glob.glob('*.html'):
    content = open(f, encoding='utf-8').read()
    if OLD in content:
        content = content.replace(OLD, NEW)
        open(f, 'w', encoding='utf-8').write(content)
print('Done.')
