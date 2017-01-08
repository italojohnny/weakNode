
test-post:
	curl -H "Content-Type: application/json" -d '{"name":"Death Star"}' http://127.0.0.1:3000/weapons

test-get:
	curl -H "Content-Type: application/json" http://127.0.0.1:3000/quotes
	curl -H "Content-Type: application/json" http://127.0.0.1:3000/Y1RkfbjU0xY9Uwk0MxQxODpW2RJbKM

test-put:
	curl -H "Content-Type: application/json" -H "X-HTTP-Method-Override: PUT" -d '{"phrase": "May the Force be with you."}' http://127.0.0.1:3000/quotes/Y1RkfbjU0xY9Uwk0MxQxODpW2RJbKM

test-delete:
	curl -H "Content-Type: application/json" -H "X-HTTP-Method-Override: DELETE" -d '{"phrase": "May the Force be with you."}' http://127.0.0.1:3000/clones/Y1RkfbjU0xY9Uwk0MxQxODpW2RJbKM
	
