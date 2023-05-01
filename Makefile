deploy:
	yarn build
	rsync -avz --delete ./dist/ magnetic.slack.it:~/magnetic/dist
	rsync -avz --delete ./server/ magnetic.slack.it:~/magnetic/server
	rsync -avz ./package.json magnetic.slack.it:~/magnetic/package.json
	rsync -avz ./yarn.lock magnetic.slack.it:~/magnetic/yarn.lock
	rsync -avz ./Makefile magnetic.slack.it:~/magnetic/Makefile

ready:
	supervisorctl stop magnetic
	rm -rf node_modules
	yarn install --prod
	supervisorctl start magnetic

.PHONY: deploy ready
