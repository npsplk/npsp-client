## How to seperate entities to config/ and operation/ routes 

1. import classes to config.tsx or operation.tsx.
2. copy paste generated routes from index.tsx.
3. search & replace '/entity/' with '/config/' or '/operation/' for each entity to fix url links.
4. search & replace '/app/operation/' with 'app/config' to restore config file imports. 
5. update shared/layout/header/menus/*.tsx menu items and replace urls.
